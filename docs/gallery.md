# Before/after gallery

*Last updated: 2026-10-18.*

## How the slider works

Each pair in section 03 ("Vorher & Nachher") stacks two photos. The **before** photo fills the frame; the **after** photo sits on top and is only visible to the right of the handle (`clip-path` in `js/main.js`, `initBeforeAfterSliders`). "Vorher" is labelled on the left, "Nachher" on the right. Dragging the handle to the left shows more of the clean result.

Because the visitor sees the left part of one photo next to the right part of the other, **both photos must show the same spot from the same angle and distance**. If they do not, the slider stitches two different views together (for example two steering wheels).

## What was fixed on 2026-10-18

- Eight pairs were aligned from the original photos with `tools/align_pairs.py` (feature matching, then scale/rotation/shift; no distortion) and cropped to the area both photos share. File names and pixel sizes stayed the same.
- Two pairs were removed because they were shot from different spots and cannot line up: the Volvo rear seats and the Audi floor mat (owner's decision).
- On desktop the boot and fuel-cap sliders are wide (class `ba-wide-d`), so the opened gallery keeps full rows.
- The full-resolution originals of all pairs are archived outside the repository in `C:\Claude_Code_Projects\ElbCarDetailing-photos-archive\images\gallery\`.

## Taking new before/after photos (for Ahmet)

1. Shoot the **before** photo, then mark where you stand (tape on the floor or a fixed reference point).
2. Shoot the **after** photo from **exactly the same spot**, at the same height, with the same zoom, in portrait format (or both in landscape).
3. Keep doors, seats and the steering wheel in the same position in both photos.
4. Best results come from detailed, flat subjects seen from the front: paint, wheels, headlights, mats, seats.
5. Paint correction or ceramic coating pairs would make the strongest first slider; most current pairs show interior cleaning.

## Adding a pair to the site

1. Align and export (portrait 4:5):
   `python tools/align_pairs.py before.jpg after.jpg NAME --sizes 480x600 720x900`
   For a wide slider use `--sizes 480x270 800x450 1280x720`.
2. Open `images/gallery/NAME-split-preview.jpg`. If the halves do not continue each other, re-shoot; then delete the preview file.
3. Copy an existing slider block in `index.html` (inside `#baGrid`), change the file names, `srcset`, `sizes`, the caption id (`ba-capN`) and the alt-text keys, and add the caption and alt texts in German, English and Turkish in `js/main.js` (`gallery_capN`, `alt_baN_before`, `alt_baN_after`).
4. Blocks with class `ba-extra` stay hidden until "Weitere Vorher/Nachher ansehen" is pressed; the count on the button updates itself. On desktop the grid has three columns: keep rows full (a wide block spans two columns).
5. Check in a browser at phone and desktop width, then publish through a pull request (see `docs/hosting.md`).
