/* ============================================
   ElbCar Detailing - Main JavaScript
   ============================================ */

// --- Translations ---
const translations = {
  de: {
    // Nav
    nav_services: "Leistungen",
    nav_packages: "Pakete",
    nav_gallery: "Galerie",
    nav_about: "Über Uns",
    nav_contact: "Kontakt",

    // Hero
    hero_tagline: "Premium Fahrzeugaufbereitung in Hamburg",
    hero_text: "Wir verwandeln Ihr Fahrzeug in einen Neuzustand — mit Liebe zum Detail, professionellen Produkten und jahrelanger Erfahrung.",
    hero_btn_services: "Unsere Leistungen",
    hero_btn_contact: "Termin anfragen",

    // About
    about_title: "Über ElbCar Detailing",
    about_subtitle: "Ihr Experte für Fahrzeugaufbereitung in Hamburg",
    about_p1: "Bei ElbCar Detailing steht Qualität an erster Stelle. Mit modernsten Techniken und Premium-Produkten sorgen wir dafür, dass Ihr Fahrzeug in bestem Zustand erstrahlt.",
    about_p2: "Von der Innenreinigung über Lackaufbereitung bis hin zur Keramikversiegelung — wir bieten alles, was Ihr Fahrzeug braucht, um wie neu auszusehen und langfristig geschützt zu sein.",
    about_p3: "Egal ob Kleinwagen oder Supersportwagen — jedes Fahrzeug verdient die beste Pflege.",
    about_placeholder: "Foto des Inhabers — kommt bald",
    about_stat1: "Zufriedene Kunden",
    about_stat2: "Jahre Erfahrung",
    about_stat3: "Premium-Marken",

    // Services
    services_title: "Unsere Leistungen",
    services_subtitle: "Professionelle Fahrzeugpflege für höchste Ansprüche",
    svc1_title: "Innenreinigung",
    svc1_text: "Tiefenreinigung des gesamten Innenraums — Sitze, Teppiche, Armaturen, Türverkleidungen und mehr. Für ein makelloses Interieur.",
    svc2_title: "Außenaufbereitung",
    svc2_text: "Professionelle Handwäsche, Dekontamination, Kneten und Versiegelung für einen strahlenden Glanz und langanhaltenden Schutz.",
    svc3_title: "Lackkorrektur & Polieren",
    svc3_text: "Mehrstufige Politur zum Entfernen von Kratzern, Swirls und Hologrammen. Ihr Lack erstrahlt in neuem Glanz.",
    svc4_title: "Keramikversiegelung",
    svc4_text: "Langzeitschutz mit professioneller Keramikbeschichtung. Bis zu 5 Jahre Schutz vor UV-Strahlen, Schmutz und chemischen Einflüssen.",
    svc5_title: "Motorwäsche",
    svc5_text: "Schonende und gründliche Reinigung des Motorraums. Optisch wie technisch ein Gewinn für Ihr Fahrzeug.",
    svc6_title: "Scheinwerfer­aufbereitung",
    svc6_text: "Matte und vergilbte Scheinwerfer werden professionell aufbereitet — für bessere Sicht und eine gepflegte Optik.",
    svc7_title: "Lederreinigung & -pflege",
    svc7_text: "Professionelle Reinigung und Pflege von Ledersitzen und -oberflächen. Schutz vor Austrocknung und Rissen.",
    svc_price: "ab",

    // Packages
    packages_title: "Unsere Pakete",
    packages_subtitle: "Wählen Sie das passende Paket für Ihr Fahrzeug",
    pkg1_name: "Basis",
    pkg1_price_text: "Auf Anfrage",
    pkg1_note: "Perfekt für die regelmäßige Pflege",
    pkg1_f1: "Außenwäsche von Hand",
    pkg1_f2: "Felgenreinigung",
    pkg1_f3: "Reifenpflege",
    pkg1_f4: "Innenraum saugen",
    pkg1_f5: "Armaturenbrett reinigen",
    pkg1_f6: "Scheiben innen & außen",
    pkg2_name: "Premium",
    pkg2_badge: "Beliebteste Wahl",
    pkg2_price_text: "Auf Anfrage",
    pkg2_note: "Komplette Aufbereitung innen & außen",
    pkg2_f1: "Alles aus dem Basis-Paket",
    pkg2_f2: "Tiefenreinigung Innenraum",
    pkg2_f3: "Leder-/Polsterreinigung",
    pkg2_f4: "1-Stufen-Politur",
    pkg2_f5: "Wachsversiegelung",
    pkg2_f6: "Motorraum reinigen",
    pkg2_f7: "Türeinstiege & Kofferraum",
    pkg3_name: "Exklusiv",
    pkg3_price_text: "Auf Anfrage",
    pkg3_note: "Die ultimative Fahrzeugaufbereitung",
    pkg3_f1: "Alles aus dem Premium-Paket",
    pkg3_f2: "Mehrstufige Lackkorrektur",
    pkg3_f3: "Keramikversiegelung",
    pkg3_f4: "Scheinwerferaufbereitung",
    pkg3_f5: "Lederpflege & -versiegelung",
    pkg3_f6: "Detaillierte Endkontrolle",
    pkg3_f7: "Pflegeanleitung & Nachsorge",
    pkg_btn: "Jetzt anfragen",

    // Gallery
    gallery_title: "Vorher & Nachher",
    gallery_subtitle: "Überzeugen Sie sich selbst von unseren Ergebnissen",
    gallery_before: "Vorher",
    gallery_after: "Nachher",
    gallery_cap1: "Mercedes — Motorraum-Reinigung",
    gallery_cap2: "Volvo — Interieur-Aufbereitung",
    gallery_cap3: "Volvo — Rücksitze",
    gallery_cap4: "VW Touran — Innenraum komplett",
    gallery_cap5: "VW Touran — Rücksitze & Fußmatten",
    gallery_cap6: "Kofferraum — Tiefenreinigung",
    gallery_cap7: "Scheinwerfer — Aufbereitung",
    gallery_cap8: "Mercedes AMG — Lenkrad-Pflege",
    gallery_cap9: "Audi — Fußmatten-Reinigung",
    gallery_cap10: "Tankdeckel — Detailreinigung",

    // Instagram
    insta_title: "Folgen Sie uns auf Instagram",
    insta_subtitle: "Aktuelle Projekte, Vorher/Nachher-Bilder und Einblicke in unsere Arbeit",
    insta_btn: "Zu Instagram",

    // Booking
    booking_title: "Online-Buchung kommt bald!",
    booking_text: "Wir arbeiten an einem Online-Buchungssystem. Bis dahin kontaktieren Sie uns direkt.",
    booking_btn: "Jetzt Kontakt aufnehmen",

    // Contact
    contact_title: "Kontakt",
    contact_subtitle: "Vereinbaren Sie Ihren Termin oder stellen Sie eine Anfrage",
    contact_info_title: "So erreichen Sie uns",
    contact_phone_label: "Telefon",
    contact_phone: "+49 155 63205346",
    contact_email_label: "E-Mail",
    contact_email: "info@elbcar-detailing.de",
    contact_addr_label: "Standort",
    contact_addr: "Köhlfleet-Hauptdeich 3, 21129 Hamburg",
    contact_hours_label: "Öffnungszeiten",
    contact_hours: "Mo–Fr: 08:00 – 18:00\nSa: 09:00 – 15:00\nSo: Geschlossen",
    form_name: "Ihr Name",
    form_email: "Ihre E-Mail",
    form_phone: "Telefonnummer",
    form_service: "Gewünschte Leistung",
    form_service_opt0: "Bitte wählen...",
    form_service_opt1: "Innenreinigung",
    form_service_opt2: "Außenaufbereitung",
    form_service_opt3: "Lackkorrektur",
    form_service_opt4: "Keramikversiegelung",
    form_service_opt5: "Komplettpaket",
    form_service_opt6: "Sonstiges",
    form_message: "Ihre Nachricht",
    form_btn: "Nachricht senden",

    // Footer
    footer_desc: "Premium Fahrzeugaufbereitung in Hamburg. Ihr Fahrzeug verdient das Beste.",
    footer_links: "Links",
    footer_services: "Leistungen",
    footer_legal: "Rechtliches",
    footer_impressum: "Impressum",
    footer_datenschutz: "Datenschutz",
    footer_rights: "Alle Rechte vorbehalten.",
  },

  en: {
    nav_services: "Services",
    nav_packages: "Packages",
    nav_gallery: "Gallery",
    nav_about: "About",
    nav_contact: "Contact",

    hero_tagline: "Premium Car Detailing in Hamburg",
    hero_text: "We transform your vehicle to showroom condition — with attention to detail, professional products and years of experience.",
    hero_btn_services: "Our Services",
    hero_btn_contact: "Request Appointment",

    about_title: "About ElbCar Detailing",
    about_subtitle: "Your Expert for Car Detailing in Hamburg",
    about_p1: "At ElbCar Detailing, quality comes first. With state-of-the-art techniques and premium products, we ensure your vehicle shines in its best condition.",
    about_p2: "From interior cleaning to paint correction and ceramic coating — we offer everything your vehicle needs to look like new and stay protected long-term.",
    about_p3: "Whether it's a compact car or a supercar — every vehicle deserves the best care.",
    about_placeholder: "Owner photo — coming soon",
    about_stat1: "Happy Customers",
    about_stat2: "Years Experience",
    about_stat3: "Premium Brands",

    services_title: "Our Services",
    services_subtitle: "Professional vehicle care for the highest standards",
    svc1_title: "Interior Cleaning",
    svc1_text: "Deep cleaning of the entire interior — seats, carpets, dashboard, door panels and more. For a flawless cabin.",
    svc2_title: "Exterior Detailing",
    svc2_text: "Professional hand wash, decontamination, clay bar treatment and sealant for a radiant shine and lasting protection.",
    svc3_title: "Paint Correction & Polishing",
    svc3_text: "Multi-stage polishing to remove scratches, swirl marks and holograms. Your paint will shine like new.",
    svc4_title: "Ceramic Coating",
    svc4_text: "Long-term protection with professional ceramic coating. Up to 5 years of protection against UV rays, dirt and chemical influences.",
    svc5_title: "Engine Bay Cleaning",
    svc5_text: "Gentle yet thorough cleaning of the engine bay. A visual and technical upgrade for your vehicle.",
    svc6_title: "Headlight Restoration",
    svc6_text: "Foggy and yellowed headlights are professionally restored — for better visibility and a polished look.",
    svc7_title: "Leather Care",
    svc7_text: "Professional cleaning and conditioning of leather seats and surfaces. Protection against drying and cracking.",
    svc_price: "from",

    packages_title: "Our Packages",
    packages_subtitle: "Choose the right package for your vehicle",
    pkg1_name: "Basic",
    pkg1_price_text: "On Request",
    pkg1_note: "Perfect for regular maintenance",
    pkg1_f1: "Hand wash exterior",
    pkg1_f2: "Wheel cleaning",
    pkg1_f3: "Tire dressing",
    pkg1_f4: "Interior vacuuming",
    pkg1_f5: "Dashboard cleaning",
    pkg1_f6: "Windows inside & outside",
    pkg2_name: "Premium",
    pkg2_badge: "Most Popular",
    pkg2_price_text: "On Request",
    pkg2_note: "Complete detailing inside & out",
    pkg2_f1: "Everything from Basic",
    pkg2_f2: "Deep interior cleaning",
    pkg2_f3: "Leather/upholstery cleaning",
    pkg2_f4: "Single-stage polish",
    pkg2_f5: "Wax sealant",
    pkg2_f6: "Engine bay cleaning",
    pkg2_f7: "Door sills & trunk",
    pkg3_name: "Exclusive",
    pkg3_price_text: "On Request",
    pkg3_note: "The ultimate detailing experience",
    pkg3_f1: "Everything from Premium",
    pkg3_f2: "Multi-stage paint correction",
    pkg3_f3: "Ceramic coating",
    pkg3_f4: "Headlight restoration",
    pkg3_f5: "Leather care & sealing",
    pkg3_f6: "Detailed final inspection",
    pkg3_f7: "Care guide & aftercare",
    pkg_btn: "Request Now",

    gallery_title: "Before & After",
    gallery_subtitle: "See the results for yourself",
    gallery_before: "Before",
    gallery_after: "After",
    gallery_cap1: "Mercedes — Engine Bay Cleaning",
    gallery_cap2: "Volvo — Interior Detailing",
    gallery_cap3: "Volvo — Rear Seats",
    gallery_cap4: "VW Touran — Full Interior",
    gallery_cap5: "VW Touran — Rear Seats & Floor Mats",
    gallery_cap6: "Trunk — Deep Cleaning",
    gallery_cap7: "Headlight — Restoration",
    gallery_cap8: "Mercedes AMG — Steering Wheel Care",
    gallery_cap9: "Audi — Floor Mat Cleaning",
    gallery_cap10: "Fuel Cap — Detail Cleaning",

    insta_title: "Follow Us on Instagram",
    insta_subtitle: "Current projects, before/after photos and insights into our work",
    insta_btn: "Visit Instagram",

    booking_title: "Online Booking Coming Soon!",
    booking_text: "We're building an online booking system. Until then, contact us directly.",
    booking_btn: "Get in Touch",

    contact_title: "Contact",
    contact_subtitle: "Schedule your appointment or send us an inquiry",
    contact_info_title: "How to Reach Us",
    contact_phone_label: "Phone",
    contact_phone: "+49 155 63205346",
    contact_email_label: "Email",
    contact_email: "info@elbcar-detailing.de",
    contact_addr_label: "Location",
    contact_addr: "Köhlfleet-Hauptdeich 3, 21129 Hamburg",
    contact_hours_label: "Opening Hours",
    contact_hours: "Mon–Fri: 08:00 – 18:00\nSat: 09:00 – 15:00\nSun: Closed",
    form_name: "Your Name",
    form_email: "Your Email",
    form_phone: "Phone Number",
    form_service: "Desired Service",
    form_service_opt0: "Please select...",
    form_service_opt1: "Interior Cleaning",
    form_service_opt2: "Exterior Detailing",
    form_service_opt3: "Paint Correction",
    form_service_opt4: "Ceramic Coating",
    form_service_opt5: "Full Package",
    form_service_opt6: "Other",
    form_message: "Your Message",
    form_btn: "Send Message",

    footer_desc: "Premium car detailing in Hamburg. Your vehicle deserves the best.",
    footer_links: "Links",
    footer_services: "Services",
    footer_legal: "Legal",
    footer_impressum: "Legal Notice",
    footer_datenschutz: "Privacy Policy",
    footer_rights: "All rights reserved.",
  },

  tr: {
    nav_services: "Hizmetler",
    nav_packages: "Paketler",
    nav_gallery: "Galeri",
    nav_about: "Hakkımızda",
    nav_contact: "İletişim",

    hero_tagline: "Hamburg'da Premium Araç Bakımı",
    hero_text: "Aracınızı sıfır gibi bir duruma getiriyoruz — detaylara özen, profesyonel ürünler ve yıllarca deneyim ile.",
    hero_btn_services: "Hizmetlerimiz",
    hero_btn_contact: "Randevu Al",

    about_title: "ElbCar Detailing Hakkında",
    about_subtitle: "Hamburg'da Araç Bakım Uzmanınız",
    about_p1: "ElbCar Detailing'de kalite her şeyden önce gelir. En modern teknikler ve premium ürünlerle aracınızın en iyi durumda parlamasını sağlıyoruz.",
    about_p2: "İç temizlikten boya düzeltmeye, seramik kaplamaya kadar — aracınızın yeni görünmesi ve uzun vadeli korunması için her şeyi sunuyoruz.",
    about_p3: "İster küçük bir araba ister bir süper spor araba olsun — her araç en iyi bakımı hak eder.",
    about_placeholder: "Sahibin fotoğrafı — yakında",
    about_stat1: "Mutlu Müşteri",
    about_stat2: "Yıl Deneyim",
    about_stat3: "Premium Marka",

    services_title: "Hizmetlerimiz",
    services_subtitle: "En yüksek standartlar için profesyonel araç bakımı",
    svc1_title: "İç Temizlik",
    svc1_text: "Tüm iç mekanın derin temizliği — koltuklar, halılar, gösterge paneli, kapı döşemeleri ve daha fazlası.",
    svc2_title: "Dış Detaylandırma",
    svc2_text: "Profesyonel el yıkama, dekontaminasyon, kil bar işlemi ve parlak bir görünüm için mühür.",
    svc3_title: "Boya Düzeltme & Cilalama",
    svc3_text: "Çizikleri, girdap izlerini ve hologramları gidermek için çok aşamalı cilalama.",
    svc4_title: "Seramik Kaplama",
    svc4_text: "Profesyonel seramik kaplama ile uzun vadeli koruma. UV ışınlarına, kire ve kimyasal etkilere karşı 5 yıla kadar koruma.",
    svc5_title: "Motor Yıkama",
    svc5_text: "Motor bölümünün nazik ama kapsamlı temizliği. Aracınız için görsel ve teknik bir yükseltme.",
    svc6_title: "Far Yenileme",
    svc6_text: "Matlaşmış ve sararrmış farlar profesyonelce yenilenir — daha iyi görüş ve bakımlı bir görünüm için.",
    svc7_title: "Deri Bakımı",
    svc7_text: "Deri koltukların ve yüzeylerin profesyonel temizliği ve bakımı. Kurumaya ve çatlamaya karşı koruma.",
    svc_price: "başlayan",

    packages_title: "Paketlerimiz",
    packages_subtitle: "Aracınız için doğru paketi seçin",
    pkg1_name: "Temel",
    pkg1_price_text: "Talep Üzerine",
    pkg1_note: "Düzenli bakım için ideal",
    pkg1_f1: "Elle dış yıkama",
    pkg1_f2: "Jant temizliği",
    pkg1_f3: "Lastik bakımı",
    pkg1_f4: "İç mekan süpürme",
    pkg1_f5: "Gösterge paneli temizliği",
    pkg1_f6: "Camlar iç & dış",
    pkg2_name: "Premium",
    pkg2_badge: "En Popüler",
    pkg2_price_text: "Talep Üzerine",
    pkg2_note: "İç ve dış komple detaylandırma",
    pkg2_f1: "Temel paketteki her şey",
    pkg2_f2: "Derin iç temizlik",
    pkg2_f3: "Deri/döşeme temizliği",
    pkg2_f4: "Tek aşamalı cilalama",
    pkg2_f5: "Wax mühürleme",
    pkg2_f6: "Motor bölümü temizliği",
    pkg2_f7: "Kapı eşikleri & bagaj",
    pkg3_name: "Özel",
    pkg3_price_text: "Talep Üzerine",
    pkg3_note: "En üst düzey detaylandırma deneyimi",
    pkg3_f1: "Premium paketteki her şey",
    pkg3_f2: "Çok aşamalı boya düzeltme",
    pkg3_f3: "Seramik kaplama",
    pkg3_f4: "Far yenileme",
    pkg3_f5: "Deri bakımı & mühürleme",
    pkg3_f6: "Detaylı son kontrol",
    pkg3_f7: "Bakım kılavuzu & takip",
    pkg_btn: "Şimdi Talep Et",

    gallery_title: "Önce & Sonra",
    gallery_subtitle: "Sonuçları kendiniz görün",
    gallery_before: "Önce",
    gallery_after: "Sonra",
    gallery_cap1: "Mercedes — Motor Temizliği",
    gallery_cap2: "Volvo — İç Mekan Detaylandırma",
    gallery_cap3: "Volvo — Arka Koltuklar",
    gallery_cap4: "VW Touran — Komple İç Mekan",
    gallery_cap5: "VW Touran — Arka Koltuklar & Paspaslar",
    gallery_cap6: "Bagaj — Derin Temizlik",
    gallery_cap7: "Far — Yenileme",
    gallery_cap8: "Mercedes AMG — Direksiyon Bakımı",
    gallery_cap9: "Audi — Paspas Temizliği",
    gallery_cap10: "Yakıt Kapağı — Detay Temizlik",

    insta_title: "Instagram'da Bizi Takip Edin",
    insta_subtitle: "Güncel projeler, önce/sonra fotoğrafları ve çalışmalarımızdan kareler",
    insta_btn: "Instagram'a Git",

    booking_title: "Online Randevu Yakında!",
    booking_text: "Online randevu sistemi üzerinde çalışıyoruz. O zamana kadar bize doğrudan ulaşın.",
    booking_btn: "İletişime Geç",

    contact_title: "İletişim",
    contact_subtitle: "Randevunuzu planlayın veya bir talep gönderin",
    contact_info_title: "Bize Ulaşın",
    contact_phone_label: "Telefon",
    contact_phone: "+49 155 63205346",
    contact_email_label: "E-Posta",
    contact_email: "info@elbcar-detailing.de",
    contact_addr_label: "Konum",
    contact_addr: "Köhlfleet-Hauptdeich 3, 21129 Hamburg",
    contact_hours_label: "Çalışma Saatleri",
    contact_hours: "Pzt–Cum: 08:00 – 18:00\nCmt: 09:00 – 15:00\nPaz: Kapalı",
    form_name: "Adınız",
    form_email: "E-Posta Adresiniz",
    form_phone: "Telefon Numarası",
    form_service: "İstenen Hizmet",
    form_service_opt0: "Lütfen seçin...",
    form_service_opt1: "İç Temizlik",
    form_service_opt2: "Dış Detaylandırma",
    form_service_opt3: "Boya Düzeltme",
    form_service_opt4: "Seramik Kaplama",
    form_service_opt5: "Komple Paket",
    form_service_opt6: "Diğer",
    form_message: "Mesajınız",
    form_btn: "Mesaj Gönder",

    footer_desc: "Hamburg'da premium araç bakımı. Aracınız en iyisini hak ediyor.",
    footer_links: "Bağlantılar",
    footer_services: "Hizmetler",
    footer_legal: "Yasal",
    footer_impressum: "Künye",
    footer_datenschutz: "Gizlilik Politikası",
    footer_rights: "Tüm hakları saklıdır.",
  }
};

// --- State ---
let currentLang = localStorage.getItem('elbcar-lang') || 'de';

// --- DOM Ready ---
document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);
  initNavbar();
  initMobileMenu();
  initBeforeAfterSliders();
  initScrollAnimations();
  initScrollToTop();
  initContactForm();
});

// --- Language Switching ---
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('elbcar-lang', lang);
  const t = translations[lang];
  if (!t) return;

  // Update all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = t[key];
      } else if (el.tagName === 'OPTION') {
        el.textContent = t[key];
      } else {
        el.textContent = t[key];
      }
    }
  });

  // Update active lang button
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Update HTML lang attribute
  document.documentElement.lang = lang;
}

// Global handler for lang buttons
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('lang-btn')) {
    setLanguage(e.target.dataset.lang);
  }
});

// --- Navbar Scroll ---
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// --- Mobile Menu ---
function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu on link click
  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

// --- Before/After Sliders ---
function initBeforeAfterSliders() {
  document.querySelectorAll('.ba-slider').forEach(slider => {
    const afterImg = slider.querySelector('.ba-after');
    const handle = slider.querySelector('.ba-handle');
    const arrows = slider.querySelector('.ba-handle-arrows');
    let isDragging = false;

    function updatePosition(x) {
      const rect = slider.getBoundingClientRect();
      let percent = ((x - rect.left) / rect.width) * 100;
      percent = Math.max(2, Math.min(98, percent));
      afterImg.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
      handle.style.left = percent + '%';
      arrows.style.left = percent + '%';
    }

    // Mouse events
    slider.addEventListener('mousedown', (e) => {
      isDragging = true;
      updatePosition(e.clientX);
      e.preventDefault();
    });
    document.addEventListener('mousemove', (e) => {
      if (isDragging) updatePosition(e.clientX);
    });
    document.addEventListener('mouseup', () => { isDragging = false; });

    // Touch events
    slider.addEventListener('touchstart', (e) => {
      isDragging = true;
      updatePosition(e.touches[0].clientX);
    }, { passive: true });
    document.addEventListener('touchmove', (e) => {
      if (isDragging) updatePosition(e.touches[0].clientX);
    }, { passive: true });
    document.addEventListener('touchend', () => { isDragging = false; });
  });
}

// --- Scroll Animations ---
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// --- Scroll to Top ---
function initScrollToTop() {
  const btn = document.querySelector('.scroll-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// --- Contact Form (placeholder) ---
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const msgs = {
      de: 'Vielen Dank! Wir melden uns bald bei Ihnen.',
      en: 'Thank you! We will get back to you soon.',
      tr: 'Teşekkürler! En kısa sürede size döneceğiz.'
    };
    alert(msgs[currentLang] || msgs.de);
    form.reset();
  });
}
