"""Align a before/after photo pair for the gallery slider.

The slider shows the left part of the "before" photo and the right part of the "after" photo at the
same time, so both photos must show the same spot from the same angle. This tool lines up the "after"
photo with the "before" photo (scale, rotation, shift; no perspective warp, so nothing looks
distorted), crops both to the area they share, and writes the WebP sizes the page uses.

Requirements: Python 3, opencv-python, numpy, Pillow.

Usage (from the repository root):
    python tools/align_pairs.py BEFORE.jpg AFTER.jpg NAME [--sizes 480x600 720x900] [--out images/gallery]

Writes:
    <out>/NAME-before-<w>.webp and <out>/NAME-after-<w>.webp for every size
    <out>/NAME-split-preview.jpg  (how the slider looks at 50 %, for checking; do not commit)

Portrait tiles use 4:5 (480x600, 720x900); wide sliders use 16:9 (480x270, 800x450, 1280x720).
Check the preview: if the two halves do not continue each other (two seats, two wheels), the photos
were taken from different spots and must be re-shot; alignment cannot fix a different viewpoint.
History: used on 2026-10-18 for the eight pairs on the site (see docs/gallery.md).
"""
import argparse
import math
import os
import sys

import cv2
import numpy as np
from PIL import Image, ImageDraw


def load(path):
    return cv2.cvtColor(np.array(Image.open(path).convert('RGB')), cv2.COLOR_RGB2BGR)


def estimate(before, after):
    """Similarity transform mapping AFTER onto BEFORE (SIFT + ratio test + RANSAC)."""
    sift = cv2.SIFT_create(nfeatures=6000)
    kb, db = sift.detectAndCompute(cv2.cvtColor(before, cv2.COLOR_BGR2GRAY), None)
    ka, da = sift.detectAndCompute(cv2.cvtColor(after, cv2.COLOR_BGR2GRAY), None)
    if db is None or da is None:
        sys.exit('no features found')
    pairs = cv2.BFMatcher(cv2.NORM_L2).knnMatch(da, db, k=2)
    good = [m for m, n in (p for p in pairs if len(p) == 2) if m.distance < 0.75 * n.distance]
    if len(good) < 12:
        sys.exit(f'only {len(good)} matching points: the photos show different spots, re-shoot them')
    pa = np.float32([ka[m.queryIdx].pt for m in good])
    pb = np.float32([kb[m.trainIdx].pt for m in good])
    M, inl = cv2.estimateAffinePartial2D(pa, pb, method=cv2.RANSAC, ransacReprojThreshold=4.0, maxIters=10000, confidence=0.999)
    if M is None:
        sys.exit('no transform found')
    scale = math.hypot(M[0, 0], M[1, 0])
    rot = math.degrees(math.atan2(M[1, 0], M[0, 0]))
    n_in = int(inl.sum())
    print(f'matches {len(good)}, inliers {n_in}, scale {scale:.3f}, rotation {rot:.2f} deg, shift ({M[0, 2]:.1f}, {M[1, 2]:.1f})')
    if not (0.6 <= scale <= 1.7) or abs(rot) > 12 or n_in < 6:
        sys.exit('implausible transform: the photos show different spots, re-shoot them')
    if n_in < 15:
        print('warning: few inliers, check the preview carefully')
    return M


def largest_rect(poly, aspect):
    """Largest axis-aligned rectangle with width/height == aspect inside a convex polygon."""
    poly = poly.astype(np.float32).reshape(-1, 1, 2)
    xs, ys = poly[:, 0, 0], poly[:, 0, 1]
    best = None
    for cx in np.linspace(xs.min(), xs.max(), 61):
        for cy in np.linspace(ys.min(), ys.max(), 61):
            if cv2.pointPolygonTest(poly, (float(cx), float(cy)), False) < 0:
                continue
            lo, hi = 0.0, float(ys.max() - ys.min())
            for _ in range(28):
                hh = (lo + hi) / 2
                hw = hh * aspect
                corners = [(cx - hw, cy - hh), (cx + hw, cy - hh), (cx - hw, cy + hh), (cx + hw, cy + hh)]
                if all(cv2.pointPolygonTest(poly, (float(x), float(y)), False) >= 0 for x, y in corners):
                    lo = hh
                else:
                    hi = hh
            area = 4 * lo * lo * aspect
            if best is None or area > best[0]:
                best = (area, cx, cy, lo)
    _, cx, cy, hh = best
    hw = hh * aspect
    return int(math.ceil(cx - hw)) + 1, int(math.ceil(cy - hh)) + 1, int(math.floor(cx + hw)) - 1, int(math.floor(cy + hh)) - 1


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('before')
    ap.add_argument('after')
    ap.add_argument('name', help='file name stem, e.g. "vw-front"')
    ap.add_argument('--sizes', nargs='+', default=['480x600', '720x900'])
    ap.add_argument('--out', default=os.path.join('images', 'gallery'))
    ap.add_argument('--quality', type=int, default=82)
    a = ap.parse_args()

    sizes = [tuple(int(v) for v in s.lower().split('x')) for s in a.sizes]
    aspect = sizes[0][0] / sizes[0][1]
    before, after = load(a.before), load(a.after)
    M = estimate(before, after)
    hb, wb = before.shape[:2]
    ha, wa = after.shape[:2]
    warped = cv2.warpAffine(after, M, (wb, hb), flags=cv2.INTER_LANCZOS4)
    corners = cv2.transform(np.float32([[0, 0], [wa, 0], [wa, ha], [0, ha]]).reshape(-1, 1, 2), M).reshape(-1, 2)
    _, common = cv2.intersectConvexConvex(corners, np.float32([[0, 0], [wb, 0], [wb, hb], [0, hb]]))
    x0, y0, x1, y1 = largest_rect(common.reshape(-1, 2), aspect)
    x0, y0, x1, y1 = max(0, x0), max(0, y0), min(wb, x1), min(hb, y1)
    if x1 - x0 < 300 or y1 - y0 < 300:
        sys.exit('common area too small: re-shoot the photos from the same spot')
    print(f'crop {x1 - x0}x{y1 - y0} px ({(x1 - x0) * (y1 - y0) / (wb * hb):.0%} of the before photo)')
    crops = {'before': before[y0:y1, x0:x1], 'after': warped[y0:y1, x0:x1]}
    os.makedirs(a.out, exist_ok=True)
    for side, img in crops.items():
        pil = Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
        for w, h in sizes:
            path = os.path.join(a.out, f'{a.name}-{side}-{w}.webp')
            pil.resize((w, h), Image.LANCZOS).save(path, 'WEBP', quality=a.quality, method=6)
            print('wrote', path)
    w, h = sizes[-1]
    b = Image.fromarray(cv2.cvtColor(crops['before'], cv2.COLOR_BGR2RGB)).resize((w, h), Image.LANCZOS)
    af = Image.fromarray(cv2.cvtColor(crops['after'], cv2.COLOR_BGR2RGB)).resize((w, h), Image.LANCZOS)
    b.paste(af.crop((w // 2, 0, w, h)), (w // 2, 0))
    ImageDraw.Draw(b).line([(w // 2, 0), (w // 2, h)], fill=(255, 255, 255), width=2)
    preview = os.path.join(a.out, f'{a.name}-split-preview.jpg')
    b.save(preview, quality=85)
    print('preview', preview, '(check it, then delete it)')


if __name__ == '__main__':
    main()
