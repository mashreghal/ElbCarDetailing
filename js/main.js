/* ============================================
   ElbCar Detailing - Main JavaScript
   ============================================ */

// --- Translations ---
const translations = {
  de: {
    meta_title: "Autoaufbereitung Hamburg-Finkenwerder | ElbCar Detailing",
    meta_description: "Autoaufbereitung in Hamburg-Finkenwerder: Innenreinigung, Lackkorrektur, Keramikversiegelung. Kleinwagen ab 150 €, nur mit Termin.",
    trust_hours: "Nur mit Termin",
    trust_hours_note: "Keine festen Öffnungszeiten",
    appt_title: "Nur mit Termin",
    appt_text: "Wir haben keine festen Öffnungszeiten. Bitte kommen Sie nicht spontan vorbei, sondern vereinbaren Sie vorab einen Termin – per WhatsApp, Telefon oder Kontaktformular.",
    studio_title: "Eindrücke aus unserer Halle in Finkenwerder",
    // v3 premium editorial
    hero_location: "Hamburg-Finkenwerder",
    hero_caption_pre: "In unserer Halle in",
    hero_caption_post: "",
    hero_btn_wa: "Termin per WhatsApp",
    hero_btn_form: "Anfrageformular",
    trust_label: "Auf einen Blick",
    aria_lang: "Sprache wählen",
    nav_faq: "FAQ",
    svc_ask: "Anfragen",
    pkg_price_note: "Preis je nach Fahrzeuggröße und Zustand",
    pkg_btn_wa: "Per WhatsApp anfragen",
    pkg_or_form: "oder per Formular",
    wa_pkg_premium: "Hallo ElbCar Detailing, ich interessiere mich für das Premium-Paket. Mein Fahrzeug: ",
    wa_pkg_exklusiv: "Hallo ElbCar Detailing, ich interessiere mich für das Exklusiv-Paket. Mein Fahrzeug: ",
    gallery_hint: "Ziehen Sie den Regler, um Vorher und Nachher zu vergleichen.",
    gallery_more: "Weitere Vorher/Nachher ansehen",
    review_more: "Weiterlesen",
    review_less: "Weniger anzeigen",
    about_caption: "Ahmet Özdemir · Inhaber",
    faq_label: "Häufige Fragen",
    faq_title: "Gut zu wissen vor Ihrem Termin",
    faq1_q: "Kann ich spontan vorbeikommen?",
    faq2_q: "Wo finde ich Ihre Halle?",
    faq2_a: "In Hamburg-Finkenwerder, Köhlfleet-Hauptdeich\u00a03, 21129 Hamburg. Wir sind für Kunden aus ganz Hamburg und Umgebung da – Besuche nur nach vorheriger Terminvereinbarung.",
    faq3_q: "Was kostet eine Autoaufbereitung?",
    faq3_a: "Unsere Richtpreise: Kleinwagen ab\u00a0150\u00a0€, Kompaktwagen ab\u00a0200\u00a0€, SUV ab\u00a0250\u00a0€ und Transporter ab\u00a0300\u00a0€. Der Endpreis hängt von Zustand, Aufwand und gewähltem Paket ab. Gemäß §\u00a019\u00a0UStG wird keine Umsatzsteuer berechnet.",
    faq4_q: "Wie schnell bekomme ich eine Antwort?",
    faq4_a: "In der Regel innerhalb eines Werktages.",
    faq5_q: "Ist die Beratung kostenlos?",
    faq5_a: "Ja. Die Beratung ist kostenlos und unser Angebot unverbindlich.",
    faq6_q: "Wie lange schützt eine Keramikversiegelung?",
    faq6_a: "Eine Keramikversiegelung schützt bis zu 5\u00a0Jahre vor UV-Strahlen, Schmutz und chemischen Einflüssen. Sie ist auch Teil des Exklusiv-Pakets.",
    faq9_q: "Können Kratzer im Lack entfernt werden?",
    faq9_a: "Unsere Lackkorrektur ist eine mehrstufige Politur zum Entfernen von Kratzern, Swirls und Hologrammen. Was bei Ihrem Lack möglich ist, klären wir in der kostenlosen Beratung.",
    faq7_q: "Welche Fahrzeuge bereiten Sie auf?",
    faq7_a: "Vom Kleinwagen bis zum Supersportwagen – auch SUVs und Transporter.",
    steps_title: "So läuft’s ab",
    step1_t: "Anfrage senden",
    step1_d: "Per WhatsApp, Telefon oder Kontaktformular.",
    step2_t: "Persönliches Angebot",
    step2_d: "Kostenlose Beratung – Antwort in der Regel innerhalb eines Werktages.",
    step3_t: "Termin in unserer Halle",
    step3_d: "Köhlfleet-Hauptdeich\u00a03, Hamburg-Finkenwerder.",
    form_more: "Weitere Angaben (optional)",
    form_required_note: "* Pflichtfelder",
    // lead spec: trust price, package choice in the form, FAQ additions
    trust_price_note: "Richtpreise nach Fahrzeuggröße",
    form_pkg_label: "Ihre Auswahl:",
    form_pkg_premium: "Premium-Paket",
    form_pkg_exklusiv: "Exklusiv-Paket",
    form_pkg_custom: "Individuelles Angebot",
    form_pkg_remove: "Auswahl entfernen",
    faq_price_link: "Zur Preisliste",
    faq8_q: "Wechseln Sie auch Reifen?",
    faq8_a: "Ja, wir wechseln Sommer- und Winterreifen – ebenfalls nur nach Terminvereinbarung.",
    faq_more: "Ihre Frage ist nicht dabei?",
    faq_ask_btn: "Per WhatsApp fragen",
    wa_question: "Hallo ElbCar Detailing, ich habe eine Frage: ",
    // review fixes: rating, landmark and viewer names, translated image descriptions
    reviews_score: "5,0",
    aria_nav: "Hauptnavigation",
    aria_quick_contact: "Schnellkontakt",
    aria_viewer: "Bildansicht",
    studio_row_label: "Fotos aus der Halle",
    alt_hero: "Ferrari 488 Spider in der Halle von ElbCar Detailing in Hamburg-Finkenwerder",
    alt_porsche_rear: "Weißer Sportwagen, Heck nach der Aufbereitung",
    alt_studio_front: "Schwarzer Sportwagen, Scheinwerfer und Front glänzend aufbereitet",
    alt_studio_ferrari: "Roter Sportwagen, Frontscheinwerfer",
    alt_studio_interior: "Gepflegter Innenraum eines Sportwagens",
    alt_studio_porsche: "Weißer Sportwagen, Scheinwerfer",
    alt_studio_tail: "Rücklicht mit Hochglanz-Lack",
    alt_studio_seats: "Helle Sportsitze mit Wabensteppung, gereinigt",
    alt_studio_bench: "Rücksitzbank, gründlich gereinigt",
    alt_ba1_before: "Verstaubter Motorraum eines Mercedes vor der Motorwäsche",
    alt_ba1_after: "Sauberer Motorraum eines Mercedes nach der Motorwäsche",
    alt_ba2_before: "Volvo-Innenraum mit Fahrersitz und verschmutztem Fußraum vor der Innenreinigung",
    alt_ba2_after: "Volvo-Innenraum mit Fahrersitz nach der Innenreinigung",
    alt_ba4_before: "Fahrerbereich eines VW Touran mit verschmutzten Fußmatten vor der Innenraumreinigung",
    alt_ba4_after: "Fahrerbereich eines VW Touran nach der Innenraumreinigung",
    alt_ba5_before: "Rücksitze und Fußmatten eines VW Touran mit Krümeln vor der Reinigung",
    alt_ba5_after: "Saubere Rücksitze und Fußmatten eines VW Touran nach der Reinigung",
    alt_ba6_before: "Verschmutzter Kofferraum vor der Tiefenreinigung",
    alt_ba6_after: "Sauberer Kofferraum nach der Tiefenreinigung",
    alt_ba7_before: "Matter, vergilbter Scheinwerfer vor der Aufbereitung",
    alt_ba7_after: "Klarer Scheinwerfer nach der Aufbereitung",
    alt_ba8_before: "Lenkrad eines Mercedes-AMG vor der Pflege",
    alt_ba8_after: "Lenkrad eines Mercedes-AMG nach der Pflege",
    alt_ba10_before: "Verschmutzter Tankdeckel eines roten Autos vor der Detailreinigung",
    alt_ba10_after: "Sauberer Tankdeckel nach der Detailreinigung",
    alt_owner: "Ahmet Özdemir – Inhaber von ElbCar Detailing",
    // Nav
    nav_services: "Leistungen",
    nav_packages: "Pakete & Preise",
    nav_gallery: "Galerie",
    nav_about: "Über uns",
    nav_reviews: "Bewertungen",
    nav_pricing: "Angebot & Preise",
    nav_contact: "Kontakt",

    // Hero
    hero_tagline: "Premium Autoaufbereitung in Hamburg",
    hero_text: "Wir verwandeln Ihr Fahrzeug in einen Neuzustand\u00a0– mit Liebe zum Detail, professionellen Produkten und jahrelanger Erfahrung.",
    hero_btn_contact: "Termin anfragen",
    hero_cta_call: "Jetzt anrufen",

    // About
    about_title: "Über ElbCar Detailing",
    about_subtitle: "Ihr Experte für Fahrzeugaufbereitung in Hamburg",
    about_p1: "Bei ElbCar Detailing\u00a0– früher Fahrzeugaufbereitung Parlack\u00a0– steht Qualität an erster Stelle. Mit modernsten Techniken und Premium-Produkten sorgen wir dafür, dass Ihr Fahrzeug in bestem Zustand erstrahlt.",
    about_p2: "Von der Innenreinigung über Lackaufbereitung bis hin zur Keramikversiegelung\u00a0– wir bieten alles, was Ihr Fahrzeug braucht, um wie neu auszusehen und langfristig geschützt zu sein.",
    about_p3: "Egal ob Kleinwagen oder Supersportwagen\u00a0– jedes Fahrzeug verdient die beste Pflege.",
    about_p4: "Unsere Halle befindet sich in Hamburg-Finkenwerder, Köhlfleet-Hauptdeich\u00a03. Hier bieten wir Autoaufbereitung und Autopflege für Kunden aus ganz Hamburg und Umgebung an – nur nach vorheriger Terminvereinbarung.",
    // Services
    services_title: "Unsere Leistungen",
    services_subtitle: "Professionelle Fahrzeugpflege in Hamburg-Finkenwerder",
    svc1_title: "Innenreinigung",
    svc1_text: "Tiefenreinigung des gesamten Innenraums\u00a0– Sitze, Teppiche, Armaturen, Türverkleidungen und mehr. Für ein makelloses Interieur.",
    svc2_title: "Außenaufbereitung",
    svc2_text: "Professionelle Handwäsche, Dekontamination, Kneten und Versiegelung für einen strahlenden Glanz und langanhaltenden Schutz.",
    svc3_title: "Lackkorrektur & Polieren",
    svc3_text: "Lackaufbereitung mit mehrstufiger Politur zum Entfernen von Kratzern, Swirls und Hologrammen. Ihr Lack erstrahlt in neuem Glanz.",
    svc4_title: "Keramikversiegelung",
    svc4_text: "Langzeitschutz mit professioneller Keramikbeschichtung. Bis zu 5\u00a0Jahre Schutz vor UV-Strahlen, Schmutz und chemischen Einflüssen.",
    svc5_title: "Motorwäsche",
    svc5_text: "Schonende und gründliche Reinigung des Motorraums. Optisch wie technisch ein Gewinn für Ihr Fahrzeug.",
    svc6_title: "Scheinwerfer­aufbereitung",
    svc6_text: "Matte und vergilbte Scheinwerfer werden professionell aufbereitet\u00a0– für bessere Sicht und eine gepflegte Optik.",
    svc7_title: "Lederreinigung & -\u2060pflege",
    svc7_text: "Professionelle Reinigung und Pflege von Ledersitzen und -\u2060oberflächen. Schutz vor Austrocknung und Rissen.",
    svc8_title: "Reifenwechsel",
    svc8_text: "Professioneller Reifenwechsel\u00a0– Sommer- und Winterreifen. Schnell, zuverlässig und zum fairen Preis.",

    // Packages
    packages_title: "Unsere Pakete",
    packages_subtitle: "Wählen Sie das passende Paket für Ihr Fahrzeug",
    pkg2_name: "Premium",
    pkg2_badge: "Unsere Empfehlung",
    pkg2_price_text: "Auf Anfrage",
    pkg2_note: "Komplette Aufbereitung innen & außen",
    pkg2_f1: "Hand-Außenwäsche & Innenreinigung",
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
    pkg3_f5: "Lederpflege & -\u2060versiegelung",
    pkg3_f6: "Detaillierte Endkontrolle",
    pkg3_f7: "Pflegeanleitung & Nachsorge",
    pkg4_name: "Nichts dabei?",
    pkg4_price_text: "Individuell",
    pkg4_note: "Kein passendes Paket gefunden? Wir erstellen Ihnen gerne ein individuelles Angebot.",
    pkg4_f1: "Maßgeschneiderte Leistungen",
    pkg4_f2: "Kostenlose Beratung",
    pkg4_f3: "Flexibler Leistungsumfang",
    pkg4_f4: "Persönliche Betreuung",
    pkg4_f5: "Unterstützung bei jedem Anliegen",
    pkg4_btn: "Individuelles Angebot anfragen",
    pkg_btn: "Jetzt anfragen",

    // Gallery
    gallery_title: "Vorher & Nachher",
    gallery_subtitle: "Überzeugen Sie sich selbst von unseren Ergebnissen",
    gallery_before: "Vorher",
    gallery_after: "Nachher",
    gallery_cap1: "Mercedes\u00a0– Motorraum-Reinigung",
    gallery_cap2: "Volvo\u00a0– Interieur-Aufbereitung",
    gallery_cap4: "VW Touran\u00a0– Innenraum komplett",
    gallery_cap5: "VW Touran\u00a0– Rücksitze & Fußmatten",
    gallery_cap6: "Kofferraum\u00a0– Tiefenreinigung",
    gallery_cap7: "Scheinwerfer\u00a0– Aufbereitung",
    gallery_cap8: "Mercedes AMG\u00a0– Lenkrad-Pflege",
    gallery_cap10: "Tankdeckel\u00a0– Detailreinigung",

    // Reviews
    reviews_title: "Bewertungen",
    reviews_subtitle: "Was auf Google über uns geschrieben wird",
    reviews_count: "83 Bewertungen auf Google",
    reviews_btn: "Alle Bewertungen auf Google ansehen",
    reviews_note: "Auszug aus unseren Google-Bewertungen. Wir prüfen nicht, ob die Bewertungen von Kunden stammen, die unsere Leistung tatsächlich in Anspruch genommen haben.",
    review_translated: "",
    review1_text: "Perfekte Keramikversiegelung. Mehr Glanz geht nicht. Professionelle Arbeit, der Inhaber ist sehr freundlich und auch für einen netten Plausch zu haben. Gerne wieder. Eine klare Empfehlung an alle, die ihr Auto gerne gepflegt haben.",
    review2_text: "Ich bin sehr zufrieden. Parlack hat mich ehrlich beraten und mir klar gesagt, was wirklich nötig ist – keine teuren Zusatzpakete, kein unnötiger Schnickschnack. Wir haben die preisgünstigste Variante gewählt, und das Ergebnis war absolut top. Durch seine Tipps habe ich am Ende bei meinem Leasingrückläufer richtig Geld gespart und gezaubert hat er auch noch. Ganz schlimme Kratzer sind einfach spurlos verschwunden. Zuverlässig, kompetent und fair. Klare Empfehlung.",
    review3_text: "Zur Leasing Rückgabe meines Smarts habe ich ihn hier aufbereiten lassen und war super happy mit dem Ergebnis. Innen- und Außenreinigung sowie Polieren. Das Auto glänzte wie neu. Die Kommunikation und der Kundenservice waren toll und unkompliziert. Ich würde mein Auto jederzeit wieder dorthin bringen und weiterempfehlen.",
    review4_text: "Ich habe unseren Mercedes-Benz Marco Polo bei Parlack in Finkenwerder zur Aufbereitung gegeben – inklusive intensiver Innenreinigung, Außenpolitur und Keramikversiegelung. Das Ergebnis ist einfach unglaublich perfekt! Der Wagen sieht besser aus als neu – jedes Detail glänzt, der Lack ist spiegelglatt und der Innenraum makellos sauber. Der Service war zudem super freundlich, zuverlässig und professionell. Man merkt, dass hier mit echter Leidenschaft und viel Know-how gearbeitet wird. Absolut empfehlenswert – ich komme definitiv wieder!",
    review5_text: "Sehr gute Beratung vorab, total gute Arbeit. Wir haben bei unserem VW T6 eine Außenreinigung machen lassen. Das Ergebnis ist perfekt. Erste Reaktion von meiner Frau: Der sieht ja aus wie neu! Ich kann die Firma mit dem freundlichen Mitarbeiter/Chef nur jedem empfehlen.",

    // Pricing
    pricing_title: "Angebot & Preise",
    pricing_subtitle: "Individuelle Angebote für jedes Fahrzeug",
    pricing_p1: "Unsere Preise richten sich nach Größe und Zustand Ihres Fahrzeugs. Da jedes Fahrzeug individuell ist, erstellen wir Ihnen gerne ein persönliches Angebot\u00a0– passend zu Ihren Wünschen und dem Aufwand.",
    pricing_ref_title: "Richtpreise zur Orientierung",
    pricing_kleinwagen: "Kleinwagen",
    pricing_kompaktwagen: "Kompaktwagen",
    pricing_suv: "SUV",
    pricing_transporter: "Transporter",
    pricing_kleinwagen_price: "ab\u00a0150\u00a0€",
    pricing_kompaktwagen_price: "ab\u00a0200\u00a0€",
    pricing_suv_price: "ab\u00a0250\u00a0€",
    pricing_transporter_price: "ab\u00a0300\u00a0€",
    pricing_disclaimer: "Endpreis abhängig von Zustand, Aufwand und gewähltem Paket.",
    pricing_vat_note: "Gemäß §\u00a019\u00a0UStG (Kleinunternehmerregelung) wird keine Umsatzsteuer berechnet – auf die genannten Preise kommt keine MwSt. hinzu.",
    pricing_p2: "Kontaktieren Sie uns einfach für ein unverbindliches Angebot. Wir beraten Sie gerne!",
    pricing_form_btn: "Jetzt Angebot anfragen",

    // Instagram
    insta_title: "Folgen Sie uns auf Instagram",
    insta_subtitle: "Aktuelle Projekte, Vorher/Nachher-Bilder und Einblicke in unsere Arbeit",
    insta_btn: "Zu Instagram",

    // Contact
    contact_title: "Kontakt",
    contact_subtitle: "Vereinbaren Sie Ihren Termin oder stellen Sie eine Anfrage",
    contact_info_title: "So erreichen Sie uns",
    contact_phone_label: "Telefon",
    contact_phone: "+49 155 63205346",
    contact_email_label: "E-Mail",
    contact_addr_label: "Standort",
    contact_addr: "Köhlfleet-Hauptdeich\u00a03, 21129 Hamburg",
    contact_hours_label: "Termine",
    contact_hours: "Keine festen Öffnungszeiten – Besuche nur nach vorheriger Terminvereinbarung.",
    form_name: "Ihr Name",
    form_email: "Ihre E-Mail",
    form_phone: "Telefonnummer",
    form_service_opt1: "Innenreinigung",
    form_service_opt2: "Außenaufbereitung",
    form_service_opt3: "Lackkorrektur",
    form_service_opt4: "Keramikversiegelung",
    form_service_opt5: "Komplettpaket",
    form_service_opt7: "Reifenwechsel",
    form_service_opt6: "Sonstiges",
    form_message: "Ihre Nachricht",
    form_message_optional: "Zusätzliche Informationen (optional)\u00a0– z.\u00a0B. Marke/Modell, besondere Wünsche",
    form_optional_hint: "Optional – hilft uns, schneller ein Angebot zu erstellen",
    form_contact_pref_label: "Wie möchten Sie kontaktiert werden?",
    form_contact_pref_email: "E-Mail",
    form_contact_pref_callback: "Rückruf",
    form_contact_pref_whatsapp: "WhatsApp",
    form_contact_pref_telegram: "Telegram",
    form_customer_type_label: "Sind Sie Privat- oder Gewerbekunde?",
    form_customer_private: "Privat",
    form_customer_commercial: "Gewerbe",
    form_services_label: "Welche Leistungen interessieren Sie? (Mehrfachauswahl möglich)",
    form_size_label: "Fahrzeuggröße",
    form_size_small: "Klein (z.\u00a0B. Polo, Golf)",
    form_size_medium: "Mittel (Limousine)",
    form_size_large: "Groß (SUV, Kombi)",
    form_size_van: "Transporter",
    form_condition_label: "Wie ist der Zustand des Fahrzeugs?",
    form_condition_light: "Leicht verschmutzt",
    form_condition_normal: "Normal verschmutzt",
    form_condition_heavy: "Stark verschmutzt",
    form_response_promise: "Antwort in der Regel innerhalb eines Werktages",
    form_btn: "Anfrage senden",
    form_sending: "Wird gesendet…",
    form_success: "Vielen Dank! Ihre Anfrage wurde gesendet. Wir melden uns in der Regel innerhalb eines Werktages.",
    form_error_required: "Bitte füllen Sie alle markierten Pflichtfelder aus.",
    form_error_send: "Senden fehlgeschlagen. Bitte versuchen Sie es erneut oder rufen Sie uns an.",
    form_privacy_text: "Mit dem Absenden werden Ihre Angaben über den Dienst Formspree an uns übermittelt und zur Bearbeitung Ihrer Anfrage verarbeitet.",
    form_privacy_link: "Mehr in der Datenschutzerklärung",
    map_notice: "Zum Schutz Ihrer Daten wird die Karte erst nach Ihrem Klick geladen. Dabei werden Daten wie Ihre IP-Adresse an Google übertragen.",
    map_load: "Karte laden",
    map_open: "In Google Maps öffnen",
    map_iframe_title: "Standort von ElbCar Detailing auf Google Maps",
    wa_greeting: "Hallo ElbCar Detailing, ich möchte einen Termin anfragen. Mein Fahrzeug: ",
    aria_menu: "Menü",
    aria_close: "Schließen",
    aria_prev: "Vorheriges Bild",
    aria_next: "Nächstes Bild",
    aria_scroll_top: "Nach oben",
    aria_stars: "5 von 5 Sternen",
    skip_link: "Zum Inhalt springen",
    sticky_call_label: "Anrufen",

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
    meta_title: "Car Detailing Hamburg-Finkenwerder | ElbCar Detailing",
    meta_description: "Car detailing in Hamburg-Finkenwerder: interior cleaning, paint correction, ceramic coating. Small cars from €150, by appointment only.",
    trust_hours: "By appointment only",
    trust_hours_note: "No fixed opening hours",
    appt_title: "By appointment only",
    appt_text: "We have no fixed opening hours. Please don't drop by unannounced – book an appointment in advance via WhatsApp, phone or the contact form.",
    studio_title: "Impressions from our studio in Finkenwerder",
    // v3 premium editorial
    hero_location: "Hamburg-Finkenwerder",
    hero_caption_pre: "In our studio in",
    hero_caption_post: "",
    hero_btn_wa: "Book via WhatsApp",
    hero_btn_form: "Enquiry form",
    trust_label: "At a glance",
    aria_lang: "Choose language",
    nav_faq: "FAQ",
    svc_ask: "Enquire",
    pkg_price_note: "Price depends on vehicle size and condition",
    pkg_btn_wa: "Enquire via WhatsApp",
    pkg_or_form: "or use the form",
    wa_pkg_premium: "Hello ElbCar Detailing, I'm interested in the Premium package. My vehicle: ",
    wa_pkg_exklusiv: "Hello ElbCar Detailing, I'm interested in the Exclusive package. My vehicle: ",
    gallery_hint: "Drag the slider to compare before and after.",
    gallery_more: "See more before & after",
    review_more: "Read more",
    review_less: "Show less",
    about_caption: "Ahmet Özdemir · Owner",
    faq_label: "Frequently asked questions",
    faq_title: "Good to know before your appointment",
    faq1_q: "Can I just drop by?",
    faq2_q: "Where is your studio?",
    faq2_a: "In Hamburg-Finkenwerder, at Köhlfleet-Hauptdeich\u00a03, 21129 Hamburg. We serve customers from all over Hamburg and the surrounding area – visits by prior appointment only.",
    faq3_q: "How much does car detailing cost?",
    faq3_a: "Our guide prices: small cars from\u00a0€150, compact cars from\u00a0€200, SUVs from\u00a0€250 and vans from\u00a0€300. The final price depends on condition, scope and the chosen package. Under Section\u00a019 of the German VAT Act (UStG), no VAT is charged.",
    faq4_q: "How quickly will I get a reply?",
    faq4_a: "Usually within one working day.",
    faq5_q: "Is the consultation free?",
    faq5_a: "Yes. The consultation is free and our quote is non-binding.",
    faq6_q: "How long does a ceramic coating protect?",
    faq6_a: "A ceramic coating protects for up to 5\u00a0years against UV rays, dirt and chemical influences. It is also part of the Exclusive package.",
    faq9_q: "Can scratches in the paint be removed?",
    faq9_a: "Our paint correction is a multi-stage polish that removes scratches, swirl marks and holograms. We'll tell you what is possible for your paint in a free consultation.",
    faq7_q: "Which vehicles do you work on?",
    faq7_a: "Everything from small cars to supercars – including SUVs and vans.",
    steps_title: "How it works",
    step1_t: "Send an enquiry",
    step1_d: "Via WhatsApp, phone or the contact form.",
    step2_t: "Your personal quote",
    step2_d: "Free consultation – we usually reply within one working day.",
    step3_t: "Appointment at our studio",
    step3_d: "Köhlfleet-Hauptdeich\u00a03, Hamburg-Finkenwerder.",
    form_more: "More details (optional)",
    form_required_note: "* Required fields",
    // lead spec: trust price, package choice in the form, FAQ additions
    trust_price_note: "Guide prices by vehicle size",
    form_pkg_label: "Your choice:",
    form_pkg_premium: "Premium package",
    form_pkg_exklusiv: "Exclusive package",
    form_pkg_custom: "Custom quote",
    form_pkg_remove: "Remove selection",
    faq_price_link: "See the price list",
    faq8_q: "Do you also change tyres?",
    faq8_a: "Yes, we change summer and winter tyres – also by appointment only.",
    faq_more: "Can't find your question?",
    faq_ask_btn: "Ask via WhatsApp",
    wa_question: "Hello ElbCar Detailing, I have a question: ",
    // review fixes: rating, landmark and viewer names, translated image descriptions
    reviews_score: "5.0",
    aria_nav: "Main navigation",
    aria_quick_contact: "Quick contact",
    aria_viewer: "Photo viewer",
    studio_row_label: "Photos from the studio",
    alt_hero: "Ferrari 488 Spider in the ElbCar Detailing studio in Hamburg-Finkenwerder",
    alt_porsche_rear: "White sports car, rear view after detailing",
    alt_studio_front: "Black sports car, headlight and front detailed to a high gloss",
    alt_studio_ferrari: "Red sports car, front headlight",
    alt_studio_interior: "Well-kept interior of a sports car",
    alt_studio_porsche: "White sports car, headlight",
    alt_studio_tail: "Tail light and high-gloss paintwork",
    alt_studio_seats: "Light-coloured sports seats with honeycomb quilting, cleaned",
    alt_studio_bench: "Rear bench seat, thoroughly cleaned",
    alt_ba1_before: "Dusty engine bay of a Mercedes before cleaning",
    alt_ba1_after: "Clean engine bay of a Mercedes after cleaning",
    alt_ba2_before: "Volvo interior with the driver's seat and a dirty footwell before interior cleaning",
    alt_ba2_after: "Volvo interior with the driver's seat after interior cleaning",
    alt_ba4_before: "Driver's area of a VW Touran with dirty floor mats before interior cleaning",
    alt_ba4_after: "Driver's area of a VW Touran after interior cleaning",
    alt_ba5_before: "Rear seats and floor mats of a VW Touran with crumbs before cleaning",
    alt_ba5_after: "Clean rear seats and floor mats of a VW Touran after cleaning",
    alt_ba6_before: "Dirty boot before deep cleaning",
    alt_ba6_after: "Clean boot after deep cleaning",
    alt_ba7_before: "Dull, yellowed headlight before restoration",
    alt_ba7_after: "Clear headlight after restoration",
    alt_ba8_before: "Steering wheel of a Mercedes-AMG before care",
    alt_ba8_after: "Steering wheel of a Mercedes-AMG after care",
    alt_ba10_before: "Dirty fuel cap of a red car before detail cleaning",
    alt_ba10_after: "Clean fuel cap after detail cleaning",
    alt_owner: "Ahmet Özdemir, owner of ElbCar Detailing",
    nav_services: "Services",
    nav_packages: "Packages & Prices",
    nav_gallery: "Gallery",
    nav_about: "About",
    nav_reviews: "Reviews",
    nav_pricing: "Quotes & Pricing",
    nav_contact: "Contact",

    hero_tagline: "Premium Car Detailing in Hamburg",
    hero_text: "We transform your vehicle to showroom condition\u00a0— with attention to detail, professional products and years of experience.",
    hero_btn_contact: "Request Appointment",
    hero_cta_call: "Call Now",

    about_title: "About ElbCar Detailing",
    about_subtitle: "Your Expert for Car Detailing in Hamburg",
    about_p1: "At ElbCar Detailing, formerly Fahrzeugaufbereitung Parlack, quality comes first. With state-of-the-art techniques and premium products, we ensure your vehicle shines in its best condition.",
    about_p2: "From interior cleaning to paint correction and ceramic coating\u00a0— we offer everything your vehicle needs to look like new and stay protected long-term.",
    about_p3: "Whether it's a small car or a supercar\u00a0— every vehicle deserves the best care.",
    about_p4: "Our studio is in Hamburg-Finkenwerder, at Köhlfleet-Hauptdeich\u00a03. We offer car detailing and car care there for customers from all over Hamburg and the surrounding area – by appointment only.",
    services_title: "Our Services",
    services_subtitle: "Professional car care in Hamburg-Finkenwerder",
    svc1_title: "Interior Cleaning",
    svc1_text: "Deep cleaning of the entire interior\u00a0— seats, carpets, dashboard, door panels and more. For a flawless cabin.",
    svc2_title: "Exterior Detailing",
    svc2_text: "Professional hand wash, decontamination, clay bar treatment and sealant for a radiant shine and lasting protection.",
    svc3_title: "Paint Correction & Polishing",
    svc3_text: "Multi-stage polishing to remove scratches, swirl marks and holograms. Your paint will shine like new.",
    svc4_title: "Ceramic Coating",
    svc4_text: "Long-term protection with professional ceramic coating. Up to 5\u00a0years of protection against UV rays, dirt and chemical influences.",
    svc5_title: "Engine Bay Cleaning",
    svc5_text: "Gentle yet thorough cleaning of the engine bay. A visual and technical upgrade for your vehicle.",
    svc6_title: "Headlight Restoration",
    svc6_text: "Foggy and yellowed headlights are professionally restored\u00a0— for better visibility and a polished look.",
    svc7_title: "Leather Care",
    svc7_text: "Professional cleaning and conditioning of leather seats and surfaces. Protection against drying and cracking.",
    svc8_title: "Tyre Change",
    svc8_text: "Professional tyre change\u00a0— summer and winter tyres. Fast, reliable and at a fair price.",

    packages_title: "Our Packages",
    packages_subtitle: "Choose the right package for your vehicle",
    pkg2_name: "Premium",
    pkg2_badge: "Our recommendation",
    pkg2_price_text: "On Request",
    pkg2_note: "Complete detailing inside & out",
    pkg2_f1: "Hand exterior wash & interior cleaning",
    pkg2_f2: "Deep interior cleaning",
    pkg2_f3: "Leather/upholstery cleaning",
    pkg2_f4: "Single-stage polish",
    pkg2_f5: "Wax sealant",
    pkg2_f6: "Engine bay cleaning",
    pkg2_f7: "Door sills & boot",
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
    pkg4_name: "Nothing suitable?",
    pkg4_price_text: "Custom quote",
    pkg4_note: "Didn't find the right package? We'll be happy to put together a custom quote for you.",
    pkg4_f1: "Tailored services",
    pkg4_f2: "Free consultation",
    pkg4_f3: "Flexible scope",
    pkg4_f4: "Personal support",
    pkg4_f5: "Help with any request",
    pkg4_btn: "Request a custom quote",
    pkg_btn: "Request Now",

    gallery_title: "Before & After",
    gallery_subtitle: "See the results for yourself",
    gallery_before: "Before",
    gallery_after: "After",
    gallery_cap1: "Mercedes\u00a0— Engine Bay Cleaning",
    gallery_cap2: "Volvo\u00a0— Interior Detailing",
    gallery_cap4: "VW Touran\u00a0— Full Interior",
    gallery_cap5: "VW Touran\u00a0— Rear Seats & Floor Mats",
    gallery_cap6: "Boot\u00a0— Deep Cleaning",
    gallery_cap7: "Headlight\u00a0— Restoration",
    gallery_cap8: "Mercedes AMG\u00a0— Steering Wheel Care",
    gallery_cap10: "Fuel Cap\u00a0— Detail Cleaning",

    reviews_title: "Reviews",
    reviews_subtitle: "What people write about us on Google",
    reviews_count: "83 reviews on Google",
    reviews_btn: "See all reviews on Google",
    reviews_note: "A selection of our Google reviews. We do not check whether the reviews come from customers who have actually used our services.",
    review_translated: "Translated from German",
    review1_text: "Perfect ceramic coating. You can't get more shine than this. Professional work, the owner is very friendly and also up for a nice chat. Happy to come back. A clear recommendation for anyone who likes their car well cared for.",
    review2_text: "I'm very satisfied. Parlack gave me honest advice and clearly told me what was really needed — no expensive add-on packages, no unnecessary extras. We chose the most affordable option, and the result was absolutely top-notch. Thanks to his tips, I ended up saving real money on my lease return, and he worked magic too. Really bad scratches just vanished without a trace. Reliable, competent and fair. Highly recommended.",
    review3_text: "For the lease return of my Smart, I had it detailed here and was super happy with the result. Interior and exterior cleaning plus polishing. The car looked like new. Communication and customer service were great and uncomplicated. I would bring my car back anytime and recommend them to others.",
    review4_text: "I had our Mercedes-Benz Marco Polo detailed at Parlack in Finkenwerder — including intensive interior cleaning, exterior polishing and ceramic coating. The result is simply incredibly perfect! The vehicle looks better than new — every detail shines, the paint is mirror-smooth and the interior is spotlessly clean. The service was also super friendly, reliable and professional. You can tell that real passion and expertise go into the work here. Absolutely recommended — I'll definitely be back!",
    review5_text: "Very good advice up front, really good work. We had the exterior of our VW T6 cleaned. The result is perfect. My wife's first reaction: It looks like new! I can recommend the company and its friendly employee/boss to everyone.",

    pricing_title: "Quotes & Pricing",
    pricing_subtitle: "Tailored quotes for every vehicle",
    pricing_p1: "Our prices depend on the size and condition of your vehicle. Since every car is unique, we're happy to provide a personalised quote\u00a0— tailored to your needs and the scope of work.",
    pricing_ref_title: "Guide prices",
    pricing_kleinwagen: "Small Car",
    pricing_kompaktwagen: "Compact Car",
    pricing_suv: "SUV",
    pricing_transporter: "Van",
    pricing_kleinwagen_price: "from\u00a0€150",
    pricing_kompaktwagen_price: "from\u00a0€200",
    pricing_suv_price: "from\u00a0€250",
    pricing_transporter_price: "from\u00a0€300",
    pricing_disclaimer: "Final price depends on condition, scope and chosen package.",
    pricing_vat_note: "In accordance with Section\u00a019 of the German VAT Act (UStG), no VAT is charged and none is added to the prices shown.",
    pricing_p2: "Simply get in touch for a free, no-obligation quote. We look forward to hearing from you!",
    pricing_form_btn: "Request a Quote",

    insta_title: "Follow Us on Instagram",
    insta_subtitle: "Current projects, before/after photos and insights into our work",
    insta_btn: "Visit Instagram",

    contact_title: "Contact",
    contact_subtitle: "Book your appointment or send us an enquiry",
    contact_info_title: "How to Reach Us",
    contact_phone_label: "Phone",
    contact_phone: "+49 155 63205346",
    contact_email_label: "Email",
    contact_addr_label: "Location",
    contact_addr: "Köhlfleet-Hauptdeich\u00a03, 21129 Hamburg",
    contact_hours_label: "Appointments",
    contact_hours: "No fixed opening hours – visits by prior appointment only.",
    form_name: "Your Name",
    form_email: "Your Email",
    form_phone: "Phone Number",
    form_service_opt1: "Interior Cleaning",
    form_service_opt2: "Exterior Detailing",
    form_service_opt3: "Paint Correction",
    form_service_opt4: "Ceramic Coating",
    form_service_opt5: "Full Package",
    form_service_opt7: "Tyre Change",
    form_service_opt6: "Other",
    form_message: "Your Message",
    form_message_optional: "Additional information (optional)\u00a0— e.g. make/model, special requests",
    form_optional_hint: "Optional – helps us prepare a quote faster",
    form_contact_pref_label: "How would you like to be contacted?",
    form_contact_pref_email: "Email",
    form_contact_pref_callback: "Callback",
    form_contact_pref_whatsapp: "WhatsApp",
    form_contact_pref_telegram: "Telegram",
    form_customer_type_label: "Are you a private or business customer?",
    form_customer_private: "Private",
    form_customer_commercial: "Business",
    form_services_label: "Which services are you interested in? (multiple choices possible)",
    form_size_label: "Vehicle size",
    form_size_small: "Small (e.g. Polo, Golf)",
    form_size_medium: "Medium (saloon)",
    form_size_large: "Large (SUV, estate)",
    form_size_van: "Van",
    form_condition_label: "What is the condition of the vehicle?",
    form_condition_light: "Light soiling",
    form_condition_normal: "Moderate soiling",
    form_condition_heavy: "Heavy soiling",
    form_response_promise: "We usually reply within one working day",
    form_btn: "Send Request",
    form_sending: "Sending…",
    form_success: "Thank you! Your request has been sent. We usually reply within one working day.",
    form_error_required: "Please fill in all highlighted required fields.",
    form_error_send: "Sending failed. Please try again or give us a call.",
    form_privacy_text: "When you submit this form, your details are sent to us via the Formspree service and processed to handle your enquiry.",
    form_privacy_link: "More in our privacy policy",
    map_notice: "To protect your privacy, the map only loads after you click. Loading it sends data such as your IP address to Google.",
    map_load: "Load map",
    map_open: "Open in Google Maps",
    map_iframe_title: "ElbCar Detailing location on Google Maps",
    wa_greeting: "Hello ElbCar Detailing, I'd like to request an appointment. My vehicle: ",
    aria_menu: "Menu",
    aria_close: "Close",
    aria_prev: "Previous image",
    aria_next: "Next image",
    aria_scroll_top: "Back to top",
    aria_stars: "5 out of 5 stars",
    skip_link: "Skip to content",
    sticky_call_label: "Call",

    footer_desc: "Premium car detailing in Hamburg. Your vehicle deserves the best.",
    footer_links: "Links",
    footer_services: "Services",
    footer_legal: "Legal",
    footer_impressum: "Legal Notice",
    footer_datenschutz: "Privacy Policy",
    footer_rights: "All rights reserved.",
  },

  tr: {
    meta_title: "Hamburg-Finkenwerder'de Araç Bakımı | ElbCar Detailing",
    meta_description: "Hamburg-Finkenwerder'de araç bakımı ve detaylı temizlik: iç temizlik, boya düzeltme, seramik kaplama. Küçük araçlar 150 €'dan itibaren, sadece randevu ile.",
    trust_hours: "Sadece randevu ile",
    trust_hours_note: "Sabit çalışma saati yok",
    appt_title: "Sadece randevu ile",
    appt_text: "Sabit çalışma saatlerimiz yoktur. Lütfen habersiz gelmeyin – WhatsApp, telefon veya iletişim formu üzerinden önceden randevu alın.",
    studio_title: "Finkenwerder'deki atölyemizden görüntüler",
    // v3 premium editorial
    hero_location: "Hamburg-Finkenwerder",
    hero_caption_pre: "",
    hero_caption_post: "'deki atölyemizde",
    hero_btn_wa: "WhatsApp ile randevu al",
    hero_btn_form: "Talep formu",
    trust_label: "Bir bakışta",
    aria_lang: "Dil seçin",
    nav_faq: "SSS",
    svc_ask: "Talep et",
    pkg_price_note: "Fiyat, aracın boyutuna ve durumuna göre belirlenir",
    pkg_btn_wa: "WhatsApp ile talep et",
    pkg_or_form: "veya formu kullanın",
    wa_pkg_premium: "Merhaba ElbCar Detailing, Premium paketiyle ilgileniyorum. Aracım: ",
    wa_pkg_exklusiv: "Merhaba ElbCar Detailing, Exclusive paketiyle ilgileniyorum. Aracım: ",
    gallery_hint: "Önce ve sonra arasındaki farkı görmek için kaydırıcıyı sürükleyin.",
    gallery_more: "Daha fazla önce/sonra örneği görün",
    review_more: "Devamını oku",
    review_less: "Daha az göster",
    about_caption: "Ahmet Özdemir · İşletme sahibi",
    faq_label: "Sıkça sorulan sorular",
    faq_title: "Randevunuzdan önce bilmeniz gerekenler",
    faq1_q: "Randevusuz uğrayabilir miyim?",
    faq2_q: "Atölyeniz nerede?",
    faq2_a: "Hamburg-Finkenwerder'de, Köhlfleet-Hauptdeich\u00a03, 21129 Hamburg adresinde. Tüm Hamburg ve çevresinden müşterilerimize hizmet veriyoruz – ziyaretler yalnızca önceden alınan randevu ile.",
    faq3_q: "Araç bakımı ne kadar tutar?",
    faq3_a: "Yaklaşık fiyatlarımız: küçük araçlar için 150\u00a0€'dan, kompakt araçlar için 200\u00a0€'dan, SUV'ler için 250\u00a0€'dan, minibüs ve kamyonetler için 300\u00a0€'dan itibaren. Nihai fiyat aracın durumuna, iş kapsamına ve seçilen pakete göre belirlenir. Alman KDV Kanunu'nun (UStG) 19.\u00a0maddesi uyarınca KDV alınmaz.",
    faq4_q: "Ne kadar hızlı yanıt alırım?",
    faq4_a: "Genellikle bir iş günü içinde.",
    faq5_q: "Danışmanlık ücretsiz mi?",
    faq5_a: "Evet. Danışmanlık ücretsizdir ve teklifimiz bağlayıcı değildir.",
    faq6_q: "Seramik kaplama ne kadar süre korur?",
    faq6_a: "Seramik kaplama, UV ışınlarına, kire ve kimyasal etkilere karşı 5\u00a0yıla kadar koruma sağlar. Exclusive paketine de dahildir.",
    faq9_q: "Boyadaki çizikler giderilebilir mi?",
    faq9_a: "Boya düzeltme, çizikleri, girdap izlerini ve hologramları gidermek için yapılan çok aşamalı bir cilalamadır. Boyanız için nelerin mümkün olduğunu ücretsiz danışmanlıkta netleştiriyoruz.",
    faq7_q: "Hangi araçlarla çalışıyorsunuz?",
    faq7_a: "Küçük araçlardan süper spor arabalara kadar – SUV'ler ve minibüs/kamyonetler dahil.",
    steps_title: "Nasıl işliyor?",
    step1_t: "Talebinizi gönderin",
    step1_d: "WhatsApp, telefon veya iletişim formu üzerinden.",
    step2_t: "Size özel teklif",
    step2_d: "Ücretsiz danışmanlık – genellikle bir iş günü içinde yanıt veriyoruz.",
    step3_t: "Atölyemizde randevu",
    step3_d: "Köhlfleet-Hauptdeich\u00a03, Hamburg-Finkenwerder.",
    form_more: "Diğer bilgiler (isteğe bağlı)",
    form_required_note: "* Zorunlu alanlar",
    // lead spec: trust price, package choice in the form, FAQ additions
    trust_price_note: "Araç boyutuna göre yaklaşık fiyatlar",
    form_pkg_label: "Seçiminiz:",
    form_pkg_premium: "Premium paketi",
    form_pkg_exklusiv: "Exclusive paketi",
    form_pkg_custom: "Kişiye özel teklif",
    form_pkg_remove: "Seçimi kaldır",
    faq_price_link: "Fiyat listesini gör",
    faq8_q: "Lastik değişimi de yapıyor musunuz?",
    faq8_a: "Evet, yaz ve kış lastiği değişimi yapıyoruz – bu hizmet için de randevu gereklidir.",
    faq_more: "Sorunuz burada yok mu?",
    faq_ask_btn: "WhatsApp ile sorun",
    wa_question: "Merhaba ElbCar Detailing, bir sorum var: ",
    // review fixes: rating, landmark and viewer names, translated image descriptions
    reviews_score: "5,0",
    aria_nav: "Ana menü",
    aria_quick_contact: "Hızlı iletişim",
    aria_viewer: "Fotoğraf görüntüleyici",
    studio_row_label: "Atölyeden fotoğraflar",
    alt_hero: "ElbCar Detailing'in Hamburg-Finkenwerder'deki atölyesinde bir Ferrari 488 Spider",
    alt_porsche_rear: "Beyaz spor araba, bakım sonrası arkadan görünüm",
    alt_studio_front: "Siyah spor araba, far ve ön kısım parlatılmış",
    alt_studio_ferrari: "Kırmızı spor araba, ön far",
    alt_studio_interior: "Bir spor arabanın bakımlı iç mekanı",
    alt_studio_porsche: "Beyaz spor araba, far",
    alt_studio_tail: "Arka stop lambası ve yüksek parlaklıkta boya",
    alt_studio_seats: "Petek desenli dikişli açık renk spor koltuklar, temizlenmiş",
    alt_studio_bench: "Arka koltuk, iyice temizlenmiş",
    alt_ba1_before: "Temizlik öncesi bir Mercedes'in tozlu motor bölümü",
    alt_ba1_after: "Temizlik sonrası bir Mercedes'in temiz motor bölümü",
    alt_ba2_before: "İç temizlik öncesi Volvo iç mekanı: sürücü koltuğu ve kirli ayak boşluğu",
    alt_ba2_after: "İç temizlik sonrası Volvo iç mekanı ve sürücü koltuğu",
    alt_ba4_before: "İç temizlik öncesi bir VW Touran'ın sürücü bölümü ve kirli paspasları",
    alt_ba4_after: "İç temizlik sonrası bir VW Touran'ın sürücü bölümü",
    alt_ba5_before: "Temizlik öncesi bir VW Touran'ın kırıntılı arka koltukları ve paspasları",
    alt_ba5_after: "Temizlik sonrası bir VW Touran'ın temiz arka koltukları ve paspasları",
    alt_ba6_before: "Derin temizlik öncesi kirli bagaj",
    alt_ba6_after: "Derin temizlik sonrası temiz bagaj",
    alt_ba7_before: "Yenileme öncesi matlaşmış, sararmış far",
    alt_ba7_after: "Yenileme sonrası berrak far",
    alt_ba8_before: "Bakım öncesi bir Mercedes-AMG direksiyonu",
    alt_ba8_after: "Bakım sonrası bir Mercedes-AMG direksiyonu",
    alt_ba10_before: "Detaylı temizlik öncesi kırmızı bir arabanın kirli yakıt kapağı",
    alt_ba10_after: "Detaylı temizlik sonrası temiz yakıt kapağı",
    alt_owner: "ElbCar Detailing'in sahibi Ahmet Özdemir",
    nav_services: "Hizmetler",
    nav_packages: "Paketler & Fiyatlar",
    nav_gallery: "Galeri",
    nav_about: "Hakkımızda",
    nav_reviews: "Yorumlar",
    nav_pricing: "Teklif & Fiyatlar",
    nav_contact: "İletişim",

    hero_tagline: "Hamburg'da Premium Araç Bakımı",
    hero_text: "Aracınızı sıfır gibi bir duruma getiriyoruz\u00a0— detaylara özen, profesyonel ürünler ve yılların deneyimiyle.",
    hero_btn_contact: "Randevu Al",
    hero_cta_call: "Hemen Ara",

    about_title: "ElbCar Detailing Hakkında",
    about_subtitle: "Hamburg'da Araç Bakım Uzmanınız",
    about_p1: "Eski adıyla Fahrzeugaufbereitung Parlack olan ElbCar Detailing'de kalite her şeyden önce gelir. En modern teknikler ve premium ürünlerle aracınızın en iyi durumda parlamasını sağlıyoruz.",
    about_p2: "İç temizlikten boya düzeltmeye, seramik kaplamaya kadar\u00a0— aracınızın yeni görünmesi ve uzun vadeli korunması için her şeyi sunuyoruz.",
    about_p3: "İster küçük bir araba ister bir süper spor araba olsun\u00a0— her araç en iyi bakımı hak eder.",
    about_p4: "Atölyemiz Hamburg-Finkenwerder'de, Köhlfleet-Hauptdeich\u00a03 adresinde bulunuyor. Burada tüm Hamburg ve çevresinden gelen müşterilerimize araç bakımı ve detaylı temizlik hizmeti sunuyoruz – sadece randevu ile.",
    services_title: "Hizmetlerimiz",
    services_subtitle: "Hamburg-Finkenwerder'de profesyonel araç bakımı",
    svc1_title: "İç Temizlik",
    svc1_text: "Tüm iç mekanın derin temizliği\u00a0— koltuklar, halılar, gösterge paneli, kapı döşemeleri ve daha fazlası. Kusursuz bir iç mekan için.",
    svc2_title: "Dış Detaylandırma",
    svc2_text: "Profesyonel el yıkama, dekontaminasyon, kil bar işlemi ve koruyucu kaplama\u00a0— parlak bir görünüm ve uzun süreli koruma için.",
    svc3_title: "Boya Düzeltme & Cilalama",
    svc3_text: "Çizikleri, girdap izlerini ve hologramları gidermek için çok aşamalı cilalama. Boyanız yeniden ışıl ışıl parlar.",
    svc4_title: "Seramik Kaplama",
    svc4_text: "Profesyonel seramik kaplama ile uzun vadeli koruma. UV ışınlarına, kire ve kimyasal etkilere karşı 5\u00a0yıla kadar koruma.",
    svc5_title: "Motor Yıkama",
    svc5_text: "Motor bölümünün nazik ama kapsamlı temizliği. Aracınız için görsel ve teknik bir yükseltme.",
    svc6_title: "Far Yenileme",
    svc6_text: "Matlaşmış ve sararmış farlar profesyonelce yenilenir\u00a0— daha iyi görüş ve bakımlı bir görünüm için.",
    svc7_title: "Deri Bakımı",
    svc7_text: "Deri koltukların ve yüzeylerin profesyonel temizliği ve bakımı. Kurumaya ve çatlamaya karşı koruma.",
    svc8_title: "Lastik Değişimi",
    svc8_text: "Profesyonel lastik değişimi\u00a0— yaz ve kış lastikleri. Hızlı, güvenilir ve uygun fiyatlı.",

    packages_title: "Paketlerimiz",
    packages_subtitle: "Aracınız için doğru paketi seçin",
    pkg2_name: "Premium",
    pkg2_badge: "Önerimiz",
    pkg2_price_text: "Talep Üzerine",
    pkg2_note: "İç ve dış komple detaylandırma",
    pkg2_f1: "Elle dış yıkama & iç temizlik",
    pkg2_f2: "Derin iç temizlik",
    pkg2_f3: "Deri/döşeme temizliği",
    pkg2_f4: "Tek aşamalı cilalama",
    pkg2_f5: "Wax ile koruyucu kaplama",
    pkg2_f6: "Motor bölümü temizliği",
    pkg2_f7: "Kapı eşikleri & bagaj",
    pkg3_name: "Exclusive",
    pkg3_price_text: "Talep Üzerine",
    pkg3_note: "En üst düzey detaylandırma deneyimi",
    pkg3_f1: "Premium paketteki her şey",
    pkg3_f2: "Çok aşamalı boya düzeltme",
    pkg3_f3: "Seramik kaplama",
    pkg3_f4: "Far yenileme",
    pkg3_f5: "Deri bakımı & koruyucu kaplama",
    pkg3_f6: "Detaylı son kontrol",
    pkg3_f7: "Bakım kılavuzu & takip",
    pkg4_name: "Aradığınız paket yok mu?",
    pkg4_price_text: "Kişiye Özel",
    pkg4_note: "Uygun bir paket bulamadınız mı? Size özel bir teklif hazırlamaktan memnuniyet duyarız.",
    pkg4_f1: "Kişiye özel hizmetler",
    pkg4_f2: "Ücretsiz danışmanlık",
    pkg4_f3: "Esnek hizmet kapsamı",
    pkg4_f4: "Kişisel destek",
    pkg4_f5: "Her talebinizde yardım",
    pkg4_btn: "Size özel teklif isteyin",
    pkg_btn: "Şimdi Talep Et",

    gallery_title: "Önce & Sonra",
    gallery_subtitle: "Sonuçları kendiniz görün",
    gallery_before: "Önce",
    gallery_after: "Sonra",
    gallery_cap1: "Mercedes\u00a0— Motor Temizliği",
    gallery_cap2: "Volvo\u00a0— İç Mekan Detaylandırma",
    gallery_cap4: "VW Touran\u00a0— Komple İç Mekan",
    gallery_cap5: "VW Touran\u00a0— Arka Koltuklar & Paspaslar",
    gallery_cap6: "Bagaj\u00a0— Derin Temizlik",
    gallery_cap7: "Far\u00a0— Yenileme",
    gallery_cap8: "Mercedes AMG\u00a0— Direksiyon Bakımı",
    gallery_cap10: "Yakıt Kapağı\u00a0— Detaylı Temizlik",

    reviews_title: "Yorumlar",
    reviews_subtitle: "Google'da hakkımızda yazılanlar",
    reviews_count: "Google'da 83 yorum",
    reviews_btn: "Tüm yorumları Google'da görün",
    reviews_note: "Google yorumlarımızdan bir seçki. Yorumların, hizmetlerimizden gerçekten yararlanmış müşterilerden gelip gelmediğini kontrol etmiyoruz.",
    review_translated: "Almancadan çevrilmiştir",
    review1_text: "Mükemmel seramik kaplama. Bundan daha fazla parlaklık olamaz. Profesyonel iş, işletme sahibi çok güler yüzlü ve sohbet etmekten keyif alıyor. Tekrar gelmekten memnuniyet duyarım. Arabasına özen gösteren herkese kesinlikle tavsiye ederim.",
    review2_text: "Çok memnunum. Parlack bana dürüstçe danışmanlık yaptı ve gerçekten neyin gerekli olduğunu açıkça söyledi — pahalı ek paketler yok, gereksiz süslemeler yok. En uygun fiyatlı seçeneği tercih ettik ve sonuç kesinlikle mükemmeldi. Önerileri sayesinde kiralık araç iademde ciddi para tasarruf ettim, üstelik sihir gibi bir iş çıkardı. Çok kötü çizikler iz bırakmadan kayboldu. Güvenilir, yetkin ve adil. Kesinlikle tavsiye ederim.",
    review3_text: "Smart'ımın kiralama iadesi için burada bakım yaptırdım ve sonuçtan çok memnun kaldım. İç ve dış temizlik ile cilalama. Araba yeni gibi parlıyordu. İletişim ve müşteri hizmetleri harika ve sorunsuzdu. Arabamı her zaman tekrar buraya getiririm ve herkese tavsiye ederim.",
    review4_text: "Mercedes-Benz Marco Polo'muzu Finkenwerder'deki Parlack'a bakım için bıraktım — yoğun iç temizlik, dış cilalama ve seramik kaplama dahil. Sonuç inanılmaz derecede mükemmel! Araç yenisinden daha iyi görünüyor — her detay parlıyor, boya ayna gibi pürüzsüz ve iç mekan tertemiz. Hizmet ayrıca çok güler yüzlü, güvenilir ve profesyoneldi. Burada gerçek tutku ve uzmanlıkla çalışıldığı hissediliyor. Kesinlikle tavsiye ederim — mutlaka tekrar geleceğim!",
    review5_text: "Önceden çok iyi danışmanlık, gerçekten çok iyi bir iş. VW T6'mıza dış temizlik yaptırdık. Sonuç mükemmel. Eşimin ilk tepkisi: Sanki yepyeni olmuş! Güler yüzlü çalışanı/patronu ile bu firmayı herkese tavsiye ederim.",

    pricing_title: "Teklif & Fiyatlar",
    pricing_subtitle: "Her araca özel teklifler",
    pricing_p1: "Fiyatlarımız aracınızın büyüklüğüne ve durumuna göre belirlenir. Her araç farklı olduğundan, size özel bir teklif hazırlamaktan memnuniyet duyarız\u00a0— ihtiyaçlarınıza ve iş kapsamına uygun olarak.",
    pricing_ref_title: "Fikir vermesi için yaklaşık fiyatlar",
    pricing_kleinwagen: "Küçük Araç",
    pricing_kompaktwagen: "Kompakt Araç",
    pricing_suv: "SUV",
    pricing_transporter: "Minibüs / Kamyonet",
    pricing_kleinwagen_price: "150\u00a0€'dan itibaren",
    pricing_kompaktwagen_price: "200\u00a0€'dan itibaren",
    pricing_suv_price: "250\u00a0€'dan itibaren",
    pricing_transporter_price: "300\u00a0€'dan itibaren",
    pricing_disclaimer: "Nihai fiyat aracın durumuna, iş kapsamına ve seçilen pakete göre değişir.",
    pricing_vat_note: "Alman Katma Değer Vergisi Kanunu'nun (UStG) 19.\u00a0maddesi uyarınca KDV alınmaz; belirtilen fiyatlara KDV eklenmez.",
    pricing_p2: "Ücretsiz ve bağlayıcı olmayan bir teklif için bizimle iletişime geçin. Sizden haber almayı dört gözle bekliyoruz!",
    pricing_form_btn: "Teklif İste",

    insta_title: "Instagram'da Bizi Takip Edin",
    insta_subtitle: "Güncel projeler, önce/sonra fotoğrafları ve çalışmalarımızdan kareler",
    insta_btn: "Instagram'a Git",

    contact_title: "İletişim",
    contact_subtitle: "Randevunuzu planlayın veya bir talep gönderin",
    contact_info_title: "Bize Ulaşın",
    contact_phone_label: "Telefon",
    contact_phone: "+49 155 63205346",
    contact_email_label: "E-Posta",
    contact_addr_label: "Konum",
    contact_addr: "Köhlfleet-Hauptdeich\u00a03, 21129 Hamburg",
    contact_hours_label: "Randevular",
    contact_hours: "Sabit çalışma saatimiz yoktur – ziyaretler yalnızca önceden alınan randevu ile.",
    form_name: "Adınız",
    form_email: "E-Posta Adresiniz",
    form_phone: "Telefon Numarası",
    form_service_opt1: "İç Temizlik",
    form_service_opt2: "Dış Detaylandırma",
    form_service_opt3: "Boya Düzeltme",
    form_service_opt4: "Seramik Kaplama",
    form_service_opt5: "Komple Paket",
    form_service_opt7: "Lastik Değişimi",
    form_service_opt6: "Diğer",
    form_message: "Mesajınız",
    form_message_optional: "Ek bilgiler (isteğe bağlı)\u00a0— örn. marka/model, özel istekler",
    form_optional_hint: "İsteğe bağlı – daha hızlı teklif hazırlamamıza yardımcı olur",
    form_contact_pref_label: "Nasıl iletişime geçilmesini istersiniz?",
    form_contact_pref_email: "E-Posta",
    form_contact_pref_callback: "Geri arama",
    form_contact_pref_whatsapp: "WhatsApp",
    form_contact_pref_telegram: "Telegram",
    form_customer_type_label: "Bireysel mi yoksa kurumsal müşteri misiniz?",
    form_customer_private: "Bireysel",
    form_customer_commercial: "Kurumsal",
    form_services_label: "Hangi hizmetlerle ilgileniyorsunuz? (birden fazla seçilebilir)",
    form_size_label: "Araç boyutu",
    form_size_small: "Küçük (örn. Polo, Golf)",
    form_size_medium: "Orta (sedan)",
    form_size_large: "Büyük (SUV, station wagon)",
    form_size_van: "Minibüs / Kamyonet",
    form_condition_label: "Aracın durumu nasıl?",
    form_condition_light: "Az kirli",
    form_condition_normal: "Orta derecede kirli",
    form_condition_heavy: "Çok kirli",
    form_response_promise: "Genellikle bir iş günü içinde yanıt veriyoruz",
    form_btn: "Talep Gönder",
    form_sending: "Gönderiliyor…",
    form_success: "Teşekkür ederiz! Talebiniz gönderildi. Genellikle bir iş günü içinde size geri dönüyoruz.",
    form_error_required: "Lütfen işaretlenen tüm zorunlu alanları doldurun.",
    form_error_send: "Gönderme başarısız oldu. Lütfen tekrar deneyin veya bizi arayın.",
    form_privacy_text: "Formu gönderdiğinizde bilgileriniz Formspree hizmeti aracılığıyla bize iletilir ve talebinizin işlenmesi amacıyla kullanılır.",
    form_privacy_link: "Ayrıntılar Gizlilik Politikamızda",
    map_notice: "Gizliliğinizi korumak için harita yalnızca tıklamanızdan sonra yüklenir. Bu sırada IP adresiniz gibi veriler Google'a iletilir.",
    map_load: "Haritayı yükle",
    map_open: "Google Haritalar'da aç",
    map_iframe_title: "ElbCar Detailing'in Google Haritalar'daki konumu",
    wa_greeting: "Merhaba ElbCar Detailing, randevu almak istiyorum. Aracım: ",
    aria_menu: "Menü",
    aria_close: "Kapat",
    aria_prev: "Önceki resim",
    aria_next: "Sonraki resim",
    aria_scroll_top: "Yukarı çık",
    aria_stars: "5 üzerinden 5 yıldız",
    skip_link: "İçeriğe geç",
    sticky_call_label: "Ara",

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
// Language order: a ?lang=de|en|tr link, then the visitor's saved choice, then the browser language, else German.
const isLang = (l) => Object.prototype.hasOwnProperty.call(translations, l);
function detectLanguage() {
  try {
    const q = (new URLSearchParams(window.location.search).get('lang') || '').toLowerCase();
    if (isLang(q)) return q;
  } catch (e) { /* old browser */ }
  try {
    const saved = localStorage.getItem('elbcar-lang');
    if (isLang(saved)) return saved;
  } catch (e) { /* storage blocked */ }
  // Crawlers whose user agent contains one of these words (e.g. Googlebot, Google-InspectionTool, Bingbot) keep the German default.
  // The Lighthouse CLI's emulated phone does not: audit the German page with --chrome-flags="--lang=de-DE" or /?lang=de.
  if (!/bot|crawl|spider|slurp|lighthouse|headless|inspectiontool/i.test(navigator.userAgent || '')) {
    const prefs = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || ''];
    for (const pref of prefs) {
      const base = String(pref).toLowerCase().split('-')[0];
      if (isLang(base)) return base;
    }
  }
  return 'de';
}
let currentLang = detectLanguage();

// Smooth in-page scrolling (CSS html.smooth) only once the visitor has tapped, clicked or pressed a key:
// the browser's own jump to a /#fragment on arrival stays instant and lands on its target
const smoothOn = () => document.documentElement.classList.add('smooth');
document.addEventListener('pointerdown', smoothOn, { capture: true, once: true });
document.addEventListener('keydown', smoothOn, { capture: true, once: true });

// Was the last input a key press (not a tap or click)? Focus that the script moves shows its ring only then
// (Safari would also show it after a tap or click; Firefox reports keyboard-activated link clicks with detail 1)
let lastInputPointer = false;
document.addEventListener('pointerdown', () => { lastInputPointer = true; }, true);
document.addEventListener('keydown', () => { lastInputPointer = false; }, true);
const viaKeyboard = () => !lastInputPointer;

// --- DOM Ready ---
document.addEventListener('DOMContentLoaded', () => {
  // The HTML is already German (it must match translations.de): rewriting all texts with the same words would only
  // force a second full layout on every German page view. Other languages are applied as before.
  if (currentLang !== 'de') setLanguage(currentLang, false);
  initNavbar();
  initMobileMenu();
  initBeforeAfterSliders();
  initLightbox();
  initScrollAnimations();
  initScrollToTop();
  initActionBar();
  initContactForm();
  initMapConsent();
  initBookingLinks();
  initGalleryMore();
  initSnapRows();
  initReviewClamps();
});

// --- Language Switching ---
// persist=false on page load (link, saved choice or browser language): only a click on a language button stores the choice
function setLanguage(lang, persist = true) {
  // German-only pages (Impressum, Datenschutz, 404): never relabel them as EN/TR
  if (document.documentElement.hasAttribute('data-lang-lock') || !document.querySelector('[data-i18n]')) return;
  if (!isLang(lang)) return;
  const t = translations[lang];
  currentLang = lang;
  if (persist) {
    try { localStorage.setItem('elbcar-lang', lang); } catch (e) { /* storage blocked */ }
  }

  // Update all elements with data-i18n (including <title>, i.e. the browser tab)
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

  // Translated attributes: accessible names (aria-label, title), image descriptions (alt) and the meta description
  [['data-i18n-aria', 'aria-label'], ['data-i18n-title', 'title'], ['data-i18n-alt', 'alt'], ['data-i18n-content', 'content']].forEach(([data, attr]) => {
    document.querySelectorAll('[' + data + ']').forEach(el => {
      const v = t[el.getAttribute(data)];
      if (v !== undefined) el.setAttribute(attr, v);
    });
  });

  // WhatsApp links: prefilled text in the current language (package buttons name their package via data-wa-key)
  document.querySelectorAll('a[href^="https://wa.me/"]').forEach(a => {
    const msg = (a.dataset.waKey && t[a.dataset.waKey]) || t.wa_greeting;
    if (msg) a.href = a.getAttribute('href').split('?')[0] + '?text=' + encodeURIComponent(msg);
  });

  // Update active lang button (aria-pressed tells screen readers which one is active)
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
    btn.setAttribute('aria-pressed', btn.dataset.lang === lang ? 'true' : 'false');
  });

  // Update HTML lang attribute
  document.documentElement.lang = lang;

  // Review texts change length with the language: re-check which ones need "Read more"
  updateReviewClamps();
}

// Global handler for lang buttons
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.lang-btn');
  if (btn) {
    setLanguage(btn.dataset.lang);
    // A ?lang= link in the address bar would win on reload, so keep it in step with the choice
    try {
      const url = new URL(window.location.href);
      if (url.searchParams.has('lang')) {
        url.searchParams.set('lang', btn.dataset.lang);
        history.replaceState(null, '', url);
      }
    } catch (err) { /* old browser or file:// page */ }
  }
});

// --- Navbar Scroll ---
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// --- Mobile Menu ---
// The closed menu is visibility:hidden (CSS), so its links are not reachable by keyboard or screen readers.
function initMobileMenu() {
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');
  if (!toggle || !menu) return;
  const navbar = toggle.closest('.navbar') || document.body;
  const isOpen = () => menu.classList.contains('open');
  // What the keyboard can reach while the open menu covers the page (logo, menu items, WhatsApp, menu button)
  const focusables = () => Array.from(navbar.querySelectorAll('a[href], button:not([disabled])'))
    .filter(el => el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden');

  function setOpen(open, returnFocus) {
    toggle.classList.toggle('active', open);
    menu.classList.toggle('open', open);
    navbar.classList.toggle('menu-open', open); // the bar stays opaque above the open menu
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      const first = menu.querySelector('a[href], button');
      if (first) first.focus({ preventScroll: true, focusVisible: viaKeyboard() }); // ring only when opened with the keyboard
    } else if (returnFocus) {
      toggle.focus();
    }
  }

  toggle.addEventListener('click', () => setOpen(!isOpen()));

  // Any link in the bar closes the menu: the menu items, the logo (back to the top) and the WhatsApp buttons
  navbar.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', () => setOpen(false));
  });

  // Escape closes the menu and returns focus to the menu button; Tab cycles inside the open menu
  document.addEventListener('keydown', (e) => {
    if (!isOpen()) return;
    if (e.key === 'Escape') { setOpen(false, true); return; }
    if (e.key !== 'Tab') return;
    const items = focusables();
    if (!items.length) return;
    const first = items[0], last = items[items.length - 1];
    const outside = !navbar.contains(document.activeElement);
    if (e.shiftKey && (outside || document.activeElement === first)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && (outside || document.activeElement === last)) { e.preventDefault(); first.focus(); }
  });

  // Turning a tablet to the desktop layout while the menu is open must not leave the page unscrollable
  const wide = window.matchMedia ? window.matchMedia('(min-width: 1100px)') : null;
  const onWide = (e) => { if (e.matches && isOpen()) setOpen(false); };
  if (wide && wide.addEventListener) wide.addEventListener('change', onWide);
  else if (wide && wide.addListener) wide.addListener(onWide);
}

// --- Before/After Sliders ---
function initBeforeAfterSliders() {
  document.querySelectorAll('.ba-slider').forEach(slider => {
    const afterImg = slider.querySelector('.ba-after');
    const handle = slider.querySelector('.ba-handle');
    const arrows = slider.querySelector('.ba-handle-arrows');
    let pos = 50;

    function setPercent(percent) {
      pos = Math.max(0, Math.min(100, percent));
      // Value 0-100 as declared in aria-valuemin/max; the handle stops 2% short of the edges
      const shown = Math.max(2, Math.min(98, pos));
      // Before photo on the left, after photo (stacked on top) shown right of the handle
      afterImg.style.clipPath = `inset(0 0 0 ${shown}%)`;
      handle.style.left = shown + '%';
      arrows.style.left = shown + '%';
      slider.setAttribute('aria-valuenow', Math.round(pos));
    }
    function fromX(x) {
      const rect = slider.getBoundingClientRect();
      setPercent(((x - rect.left) / rect.width) * 100);
    }
    setPercent(50);

    // Touch: only a clearly horizontal move drags the handle (a vertical swipe scrolls the page and
    // leaves the slider alone); a tap jumps to the tapped point. Mouse and pen drag right away.
    let start = null, dragging = false;
    slider.addEventListener('pointerdown', (e) => {
      if (e.pointerType === 'mouse' && e.button !== 0) return;
      start = { x: e.clientX, y: e.clientY, id: e.pointerId };
      dragging = e.pointerType !== 'touch';
      if (dragging) { slider.setPointerCapture(e.pointerId); slider.classList.add('dragging'); fromX(e.clientX); }
    });
    slider.addEventListener('pointermove', (e) => {
      if (!start || e.pointerId !== start.id) return;
      if (!dragging) {
        const dx = Math.abs(e.clientX - start.x), dy = Math.abs(e.clientY - start.y);
        if (dx < 8 || dx <= dy) return;
        dragging = true;
        try { slider.setPointerCapture(e.pointerId); } catch (err) { /* pointer already gone */ }
        slider.classList.add('dragging');
      }
      fromX(e.clientX);
    });
    slider.addEventListener('pointerup', (e) => {
      if (start && !dragging && e.pointerId === start.id &&
          Math.abs(e.clientX - start.x) < 6 && Math.abs(e.clientY - start.y) < 6) fromX(e.clientX);
      start = null; dragging = false; slider.classList.remove('dragging');
    });
    // The browser took the gesture over (page scroll): keep the handle where it was
    slider.addEventListener('pointercancel', () => { start = null; dragging = false; slider.classList.remove('dragging'); });
    slider.addEventListener('keydown', (e) => {
      // ARIA slider keys: Left/Down and Right/Up step 5, Page Down/Up step 10, Home/End jump to 0/100
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { setPercent(pos - 5); e.preventDefault(); }
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { setPercent(pos + 5); e.preventDefault(); }
      if (e.key === 'PageDown') { setPercent(pos - 10); e.preventDefault(); }
      if (e.key === 'PageUp') { setPercent(pos + 10); e.preventDefault(); }
      if (e.key === 'Home') { setPercent(0); e.preventDefault(); }
      if (e.key === 'End') { setPercent(100); e.preventDefault(); }
    });
  });
}

// --- Lightbox ---
function initLightbox() {
  const box = document.getElementById('lightbox');
  if (!box) return;
  const links = Array.from(document.querySelectorAll('[data-lightbox]'));
  const img = box.querySelector('img');
  const buttons = Array.from(box.querySelectorAll('button'));
  let idx = 0, opener = null;
  const show = (i) => {
    idx = (i + links.length) % links.length;
    img.src = links[idx].getAttribute('href');
    img.alt = links[idx].querySelector('img').alt;
  };
  // The close button shows its focus ring only when the viewer was opened with the keyboard
  const open = (i) => { opener = document.activeElement; show(i); box.hidden = false; document.body.style.overflow = 'hidden'; box.querySelector('.lb-close').focus({ focusVisible: viaKeyboard() }); };
  const close = () => {
    box.hidden = true; img.src = ''; document.body.style.overflow = '';
    if (!opener || !opener.focus) return;
    // Keyboard users continue at the photo they opened; it is scrolled into view only if it is no longer on screen
    const r = opener.getBoundingClientRect();
    opener.focus({ preventScroll: r.bottom > 0 && r.top < window.innerHeight });
  };
  links.forEach((a, i) => a.addEventListener('click', (e) => { e.preventDefault(); open(i); }));
  box.querySelector('.lb-close').addEventListener('click', close);
  box.querySelector('.lb-prev').addEventListener('click', () => show(idx - 1));
  box.querySelector('.lb-next').addEventListener('click', () => show(idx + 1));
  box.addEventListener('click', (e) => { if (e.target === box) close(); });
  document.addEventListener('keydown', (e) => {
    if (box.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
    // aria-modal: Tab and Shift+Tab cycle through the viewer's buttons, nothing behind the overlay gets focus
    if (e.key === 'Tab' && buttons.length) {
      e.preventDefault();
      const i = buttons.indexOf(document.activeElement);
      buttons[(i + (e.shiftKey ? -1 : 1) + buttons.length) % buttons.length].focus();
    }
  });
  let sx = null;
  box.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; }, { passive: true });
  box.addEventListener('touchend', (e) => {
    if (sx === null) return;
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) show(idx + (dx < 0 ? 1 : -1));
    sx = null;
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

// --- Phone action bar (WhatsApp + call): shown once the hero buttons have scrolled away,
//     hidden again while the contact section or the footer (both with their own buttons) are on screen ---
function initActionBar() {
  const cta = document.querySelector('.hero-cta') || document.getElementById('hero');
  if (!cta || !('IntersectionObserver' in window)) { document.body.classList.add('past-hero'); return; }
  let past = false;
  const covered = new Set();
  let typing = false;
  const apply = () => document.body.classList.toggle('past-hero', past && !typing && covered.size === 0);
  document.addEventListener('focusin', (e) => { typing = !!(e.target.closest && e.target.closest('input, textarea, select')); apply(); });
  document.addEventListener('focusout', () => { typing = false; apply(); });
  new IntersectionObserver(([entry]) => {
    past = !entry.isIntersecting && entry.boundingClientRect.top < 0;
    apply();
  }, { threshold: 0 }).observe(cta);
  const own = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) covered.add(en.target); else covered.delete(en.target); });
    apply();
  }, { threshold: 0, rootMargin: '0px 0px -30% 0px' });
  document.querySelectorAll('#contact, .footer').forEach(el => own.observe(el));
}

// --- "Anfragen" on a service, package or the custom offer: carry the choice into the contact form ---
// A service ticks its "Leistungen" pill; a package shows a removable tag and fills the hidden "Paket" field
// (sent in German like the other form values; the tag is shown in the page language).
function initBookingLinks() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const tag = document.getElementById('formPkg');
  const tagName = tag && tag.querySelector('.form-pkg-name');
  const pkgInput = document.getElementById('cf-pkg');
  const title = document.getElementById('form-title');
  function setPackage(value, key) {
    if (!tag || !tagName || !pkgInput) return;
    if (!value) {
      tag.hidden = true; pkgInput.value = ''; pkgInput.disabled = true;
      tagName.removeAttribute('data-i18n'); tagName.textContent = '';
      return;
    }
    const t = translations[currentLang] || translations.de;
    tagName.setAttribute('data-i18n', key); // re-translated by setLanguage()
    tagName.textContent = t[key] || value;
    pkgInput.value = value; pkgInput.disabled = false; tag.hidden = false;
    tag.classList.remove('is-flash'); void tag.offsetWidth; tag.classList.add('is-flash');
  }
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[data-svc], a[data-pkg]');
    if (!link) return;
    if (link.dataset.svc) {
      form.querySelectorAll('input[name="Leistungen"]').forEach(box => { if (box.value === link.dataset.svc) box.checked = true; });
    }
    if (link.dataset.pkg) setPackage(link.dataset.pkg, link.dataset.pkgKey);
    if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return; // new tab or window: left to the browser
    // Scroll in script instead of following the #contactForm link: Firefox would take the focus back from the heading
    // during the link's own jump. Keyboard and screen-reader users continue at the form heading; its focus ring shows
    // only after keyboard activation, not after a tap or a mouse click.
    e.preventDefault();
    try { if (location.hash !== '#contactForm') history.pushState(null, '', '#contactForm'); } catch (err) { /* file:// page */ }
    form.scrollIntoView({ behavior: scrollBehavior(), block: 'start' });
    if (title) title.focus({ preventScroll: true, focusVisible: viaKeyboard() });
  });
  const remove = tag && tag.querySelector('.form-pkg-x');
  if (remove) remove.addEventListener('click', () => { setPackage(''); const n = document.getElementById('cf-name'); if (n) n.focus(); });
  form.addEventListener('reset', () => setPackage(''));
}

// --- Before/after: 3 sliders on phones, 4 from 640px; one button opens the rest in place (without JS all show) ---
function initGalleryMore() {
  const grid = document.getElementById('baGrid');
  const wrap = document.querySelector('.gallery-more-wrap');
  if (!grid || !wrap) return;
  const btn = wrap.querySelector('.gallery-more');
  const count = wrap.querySelector('.gallery-more-count');
  const hiddenItems = () => Array.from(grid.children).filter(el => getComputedStyle(el).display === 'none');
  const refresh = () => {
    const n = grid.classList.contains('show-all') ? 0 : hiddenItems().length;
    wrap.hidden = n === 0;
    if (count) count.textContent = n;
  };
  btn.addEventListener('click', () => {
    const first = hiddenItems()[0];
    const root = document.documentElement;
    // The new pairs open in place, without scroll anchoring: on phones the first of them sits above the last pair shown
    // (it fills the two-column rows from 640px), and anchoring would keep the view below it, out of sight
    root.style.overflowAnchor = 'none';
    grid.classList.add('show-all');
    btn.setAttribute('aria-expanded', 'true');
    wrap.hidden = true;
    if (first) {
      first.classList.add('visible'); // shown at once, without the fade-in offset: it is measured and scrolled to right away
      const top = first.getBoundingClientRect().top;
      if (top < (parseFloat(getComputedStyle(root).scrollPaddingTop) || 0) || top > window.innerHeight - 160) first.scrollIntoView({ behavior: scrollBehavior(), block: 'start' });
      // the button is gone: continue at the first new slider (focus ring only after keyboard activation)
      const slider = first.querySelector('.ba-slider');
      if (slider) slider.focus({ preventScroll: true, focusVisible: viaKeyboard() });
    }
    requestAnimationFrame(() => { root.style.overflowAnchor = ''; });
  });
  refresh();
  window.addEventListener('resize', refresh);
}

// --- Swipe rows (studio photos on phones): counter, progress line and previous/next buttons ---
// Only while the row really scrolls does it become a focusable, labelled group (not a second region named like the
// section around it); arrow keys, Home and End move by photo.
function initSnapRows() {
  const tr = () => translations[currentLang] || translations.de;
  const chevron = (back) => '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="' + (back ? '15 18 9 12 15 6' : '9 18 15 12 9 6') + '"/></svg>';
  document.querySelectorAll('[data-snap]').forEach(row => {
    const items = Array.from(row.children).filter(el => !el.hidden); // lightbox-only photos are not in the row
    if (items.length < 2) return;
    const labelKey = row.getAttribute('data-snap-label-key');
    const ui = document.createElement('div');
    ui.className = 'snap-ui container';
    ui.innerHTML = '<span class="snap-progress" aria-hidden="true"><i></i></span><span class="snap-count" aria-live="polite"></span>'
      + '<button type="button" class="snap-btn snap-prev" data-i18n-aria="aria_prev">' + chevron(true) + '</button>'
      + '<button type="button" class="snap-btn snap-next" data-i18n-aria="aria_next">' + chevron(false) + '</button>';
    row.after(ui);
    const count = ui.querySelector('.snap-count'), thumb = ui.querySelector('.snap-progress i');
    const prev = ui.querySelector('.snap-prev'), next = ui.querySelector('.snap-next');
    prev.setAttribute('aria-label', tr().aria_prev); next.setAttribute('aria-label', tr().aria_next);
    const current = () => {
      const x = row.getBoundingClientRect().left;
      let best = 0, bestD = Infinity;
      items.forEach((el, i) => { const d = Math.abs(el.getBoundingClientRect().left - x); if (d < bestD) { bestD = d; best = i; } });
      return best;
    };
    const go = (i) => { const el = items[Math.max(0, Math.min(items.length - 1, i))]; row.scrollTo({ left: el.offsetLeft - row.offsetLeft, behavior: scrollBehavior() }); };
    prev.addEventListener('click', () => go(current() - 1));
    next.addEventListener('click', () => go(current() + 1));
    function update() {
      const scrollable = row.scrollWidth > row.clientWidth + 4;
      row.classList.toggle('is-scrollable', scrollable);
      if (scrollable) {
        row.setAttribute('tabindex', '0'); row.setAttribute('role', 'group');
        if (labelKey) { row.setAttribute('data-i18n-aria', labelKey); row.setAttribute('aria-label', tr()[labelKey] || ''); } // re-translated by setLanguage()
      } else ['tabindex', 'role', 'aria-label', 'data-i18n-aria'].forEach(a => row.removeAttribute(a));
      ui.hidden = !scrollable;
      if (!scrollable) return;
      const txt = (current() + 1) + ' / ' + items.length;
      if (count.textContent !== txt) count.textContent = txt; // live region: announce real changes only
      const max = row.scrollWidth - row.clientWidth;
      thumb.style.width = (row.clientWidth / row.scrollWidth * 100) + '%';
      thumb.style.transform = 'translateX(' + (row.scrollLeft / row.clientWidth * 100) + '%)';
      prev.disabled = row.scrollLeft <= 2;
      next.disabled = row.scrollLeft >= max - 2;
    }
    let raf = 0;
    row.addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; update(); }); }, { passive: true });
    window.addEventListener('resize', update);
    row.addEventListener('keydown', (e) => {
      if (e.target !== row) return;
      const keys = { ArrowRight: current() + 1, ArrowLeft: current() - 1, Home: 0, End: items.length - 1 };
      if (e.key in keys) { go(keys[e.key]); e.preventDefault(); }
    });
    update();
  });
}

// --- Reviews: long texts are clamped to six lines with a "Read more" toggle ---
function initReviewClamps() {
  const grid = document.querySelector('.reviews-grid');
  if (!grid) return;
  grid.classList.add('is-clamped');
  grid.querySelectorAll('.review-more').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.review-card');
      const open = !card.classList.contains('is-open');
      card.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
  updateReviewClamps();
  if ('ResizeObserver' in window) new ResizeObserver(() => updateReviewClamps()).observe(grid);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(updateReviewClamps);
}
function updateReviewClamps() {
  document.querySelectorAll('.reviews-grid.is-clamped .review-card').forEach(card => {
    const text = card.querySelector('.review-text');
    const btn = card.querySelector('.review-more');
    if (!text || !btn || card.classList.contains('is-open')) return;
    btn.hidden = text.scrollHeight <= text.clientHeight + 2;
  });
}

// Smooth scrolling only when the visitor has not asked the system for reduced motion
function scrollBehavior() {
  return (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) ? 'auto' : 'smooth';
}

// --- Scroll to Top ---
function initScrollToTop() {
  const btn = document.querySelector('.scroll-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: scrollBehavior() });
  });
}

// --- Google Maps: load the iframe only after the visitor clicks "Karte laden" ---
function initMapConsent() {
  const box = document.getElementById('mapConsent');
  if (!box) return;
  const btn = box.querySelector('.map-load-btn');
  if (!btn) return;
  btn.addEventListener('click', (e) => {
    const t = translations[currentLang] || translations.de;
    const iframe = document.createElement('iframe');
    iframe.title = t.map_iframe_title || translations.de.map_iframe_title;
    iframe.setAttribute('data-i18n-title', 'map_iframe_title'); // re-translated by setLanguage()
    iframe.src = box.dataset.mapSrc;
    iframe.height = '350';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    box.replaceChildren(iframe);
    box.classList.add('is-loaded');
    // Opened with the keyboard (click detail 0): the map shows a focus ring while it has focus
    box.classList.toggle('kbd-focus', e.detail === 0);
    // The button is gone: move focus to the map so keyboard and screen-reader users stay here
    iframe.focus();
  });
}

// --- Contact Form ---
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const status = document.createElement('div');
  status.className = 'form-status';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  form.insertBefore(status, form.querySelector('button[type="submit"]'));

  // The choice groups are labelled "Optional" – only Name and E-Mail are required.
  const requiredRadioGroups = [];

  function clearErrors() {
    form.querySelectorAll('.form-choice.has-error, .form-group.has-error').forEach(el => {
      el.classList.remove('has-error');
    });
    status.className = 'form-status';
    status.removeAttribute('data-i18n');
    status.textContent = '';
  }

  function setStatus(type, key) {
    const t = translations[currentLang] || translations.de;
    status.className = 'form-status form-status-' + type;
    status.setAttribute('data-i18n', key); // re-translated by setLanguage()
    status.textContent = t[key] || translations.de[key] || '';
  }

  function validate() {
    let firstInvalid = null;

    form.querySelectorAll('input[required], textarea[required]').forEach(el => {
      if (el.type === 'radio') return;
      const group = el.closest('.form-group');
      if (!el.value.trim() || (el.type === 'email' && !el.checkValidity())) {
        if (group) group.classList.add('has-error');
        if (!firstInvalid) firstInvalid = el;
      }
    });

    requiredRadioGroups.forEach(name => {
      const checked = form.querySelector(`input[name="${name}"]:checked`);
      if (!checked) {
        const anyInput = form.querySelector(`input[name="${name}"]`);
        const choice = anyInput && anyInput.closest('.form-choice');
        if (choice) choice.classList.add('has-error');
        if (!firstInvalid) firstInvalid = choice || anyInput;
      }
    });

    return firstInvalid;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    const firstInvalid = validate();
    if (firstInvalid) {
      setStatus('error', 'form_error_required');
      firstInvalid.scrollIntoView({ behavior: scrollBehavior(), block: 'center' });
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    setStatus('sending', 'form_sending');

    // Abort after 15 s so a bad connection cannot leave the form hanging
    const controller = ('AbortController' in window) ? new AbortController() : null;
    const timer = controller ? setTimeout(() => controller.abort(), 15000) : null;

    try {
      const formData = new FormData(form);
      const emailValue = (form.querySelector('input[type="email"]') || {}).value;
      if (emailValue) formData.set('_replyto', emailValue);

      const response = await fetch(form.action, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData,
        signal: controller ? controller.signal : undefined
      });

      if (response.ok) {
        form.reset();
        setStatus('success', 'form_success');
        status.scrollIntoView({ behavior: scrollBehavior(), block: 'center' });
      } else {
        // Server-side errors (Formspree) are shown as our own translated message
        setStatus('error', 'form_error_send');
      }
    } catch (err) {
      setStatus('error', 'form_error_send');
    } finally {
      if (timer) clearTimeout(timer);
      submitBtn.disabled = false;
    }
  });

  form.addEventListener('change', (e) => {
    if (e.target.matches('input, textarea')) {
      const choice = e.target.closest('.form-choice');
      const group = e.target.closest('.form-group');
      if (choice) choice.classList.remove('has-error');
      if (group) group.classList.remove('has-error');
    }
  });
}
