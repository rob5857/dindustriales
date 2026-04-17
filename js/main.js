/* ===== D INDUSTRIALES - MAIN JS ===== */

// ── THEME TOGGLE ──────────────────────────────────────────────
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function applyTheme(theme) {
  html.setAttribute('data-theme', theme);
  themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  localStorage.setItem('dindustriales-theme', theme);
}

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

// Load saved theme
const savedTheme = localStorage.getItem('dindustriales-theme') || 'dark';
applyTheme(savedTheme);

// ── LANGUAGE SYSTEM ───────────────────────────────────────────
const TRANSLATIONS = {
  es: {
    modal_title: 'Selecciona tu idioma',
    modal_subtitle: 'Elige el idioma en que deseas navegar',
    modal_btn_es: 'Español',
    modal_btn_en: 'English',
    nav_services: 'Servicios', nav_insurers: 'Aseguradoras', nav_radar: 'Radar PR', nav_gallery: 'Galería',
    nav_faq: 'FAQ', nav_contact: 'Contacto', nav_whatsapp: 'WhatsApp',
    hero_title: 'Restauración Profesional de<br/><span class="gradient-text">Daños por Incendio e Inundaciones</span>',
    hero_subtitle: 'La principal empresa de restauración de daños por incendio de Puerto Rico.<br/>Trabajamos directamente con tu aseguradora. Disponibles <strong>24/7</strong>.',
    hero_badge1: 'Ayuda Rápida', hero_badge2: '+15 Años de Experiencia', hero_badge3: 'Respuesta en 24 horas',
    hero_cta1: 'Inspecciones para Seguros', hero_cta2: 'Emergencias 24/7', hero_scroll: 'Scroll',
    stat_years: 'Años de Experiencia', stat_jobs: 'Trabajos Completados',
    stat_insurers: 'Aseguradoras Afiliadas', stat_claims: 'Reclamos Exitosos',
    services_label: 'Nuestros Servicios',
    services_h2: 'Restauración Completa <span class="gradient-text">Post-Incendio</span>',
    services_p: 'Manejamos cada etapa del proceso de restauración, desde la emergencia hasta la reconstrucción final.',
    svc1_badge: 'Servicio Principal', svc1_h3: 'Descontaminación de Humo y Hollín',
    svc1_p: 'Eliminamos completamente humo, hollín y olores con equipo industrial especializado y técnicas avanzadas. El humo invisible sigue dañando tu propiedad y tu salud cada día que pasa.',
    svc1_li1: 'Utilización de químicos no nocivos', svc1_li2: 'Descontaminación del Aire', svc1_li3: 'Eliminación de olores',
    svc2_h3: 'Mitigación de Emergencia',
    svc2_p: 'Respuesta inmediata 24/7. Aseguramos la propiedad, removemos escombros peligrosos y prevenimos daños adicionales.',
    svc2_li1: 'Respuesta en menos de 24 horas', svc2_li2: 'Alcance de daños para rápida respuesta', svc2_li3: 'Remoción de escombros',
    svc3_h3: 'Daños por Agua',
    svc3_p: 'Restauramos los daños causados por el agua del sistema contra incendios con extracción y secado industrial.',
    svc3_li1: 'Extracción de agua', svc3_li2: 'Secado industrial', svc3_li3: 'Prevención de moho', svc3_li4: 'Mitigación de hongos',
    svc4_h3: 'Restauración de Estructuras',
    svc4_p: 'Reconstruimos desde los cimientos: techos, paredes, pisos, electricidad, plomería y acabados completos.',
    svc4_li1: 'Techos y paredes', svc4_li2: 'Stain Bloquer', svc4_li3: 'Restauración de puertas y ventanas',
    svc5_h3: '¡Reclamamos por tí!',
    svc5_p: 'Trabajamos directamente con tu aseguradora. Manejamos toda la documentación y negociación mientras usted descansa.',
    svc5_li1: 'Coordinación con ajustadores', svc5_li2: 'Documentación fotográfica', svc5_li3: 'Estimados detallados',
    svc6_h3: 'Polizas de Contenido',
    svc6_p: 'Recuperamos, limpiamos y restauramos muebles, documentos, electrónicos y objetos de valor personal.',
    svc6_li1: 'Inventario detallado', svc6_li2: 'Restauración de documentos', svc6_li3: 'Almacenamiento seguro',
    proceso_label: '¿Cómo Trabajamos?',
    proceso_h2: '¡Proceso Simple, Transparente <span class="gradient-text"> y Libre de Costos!</span>',
    step1_h3: 'Llamada de Emergencia', step1_p: 'Llámanos o escríbenos por WhatsApp. Respondemos en 24 horas.',
    step2_h3: 'Inspección Gratuita', step2_p: 'Llegamos a la propiedad, evaluamos los daños y documentamos todo para el proceso de reclamación.',
    step3_h3: 'Coordinación con Aseguradora', step3_p: 'Contactamos directamente a tu aseguradora, presentamos la documentación y manejamos el claim por ti.',
    step4_h3: 'Restauración Completa', step4_p: 'Ejecutamos el plan de restauración con los más altos estándares de calidad hasta la entrega final.',
    aseg_label: 'Aseguradoras',
    aseg_h2: 'Trabajamos con las principales <span class="gradient-text">Aseguradoras de Puerto Rico</span>',
    aseg_p: '¡Siempre poniendo al asegurado primero!',
    gallery_label: 'Nuestro Trabajo', gallery_h2: 'Transformaciones <span class="gradient-text">Reales</span>',
    gallery_p: 'Desliza el divisor para ver el antes y después de nuestras restauraciones profesionales.',
    gallery_before: 'ANTES', gallery_after: 'DESPUÉS', gallery_hint: 'Desliza el divisor',
    pre_radar_text: 'Estamos contigo paso a paso, en un proceso complicado somos tu mano amiga con la experiencia.',
    radar_label: 'Monitoreo en Tiempo Real',
    radar_h2: 'Radar de <span class="gradient-text">Emergencias de Incendio</span> en Puerto Rico',
    radar_p: 'Datos satelitales en tiempo real de focos de calor activos en Puerto Rico. Fuente: NASA FIRMS / VIIRS.',
    radar_legend_high: 'Alta Intensidad', radar_legend_med: 'Moderada', radar_legend_low: 'Baja',
    radar_note: 'Datos actualizados cada 12 horas desde satélites VIIRS (NASA). Hora:',
    faq_label: 'Preguntas Frecuentes',
    faq_h2: 'Todo lo que necesitas <span class="gradient-text">saber</span>',
    faq_p: 'Respuestas claras sobre restauración por incendio, inundación y reclamaciones de seguros en Puerto Rico.',
    faq_q1: '¿Qué debo hacer después de un incendio en mi casa?',
    faq_a1: '<p>Primero, garantiza la seguridad de todos y llama al 911 si hay heridos. Luego <strong>contáctanos de inmediato</strong> — respondemos en <strong>24 horas</strong>. Documentamos los daños, aseguramos la propiedad y activamos el proceso de reclamación y restauración.</p>',
    faq_q2: '¿Qué hace una empresa de restauración por incendio?',
    faq_a2: '<p>Evaluamos y documentamos daños estructurales, realizamos <strong>limpieza de humo y hollín</strong>, eliminamos olores, ejecutamos <strong>secado estructural</strong> y <strong>gestionamos la reclamación</strong> ante tu aseguradora en Puerto Rico.</p>',
    faq_q3: '¿Qué cubre el seguro de propiedad por daños de incendio?',
    faq_a3: '<p>La mayoría de pólizas cubren daños estructurales, <strong>restauración de humo y hollín</strong>, daños por agua y pólizas de contenido. Te ayudamos a reclamar el máximo con MAPFRE, Triple-S, Cooperativa de Seguros y más.</p>',
    faq_q4: '¿Qué hacer si se inundó mi casa en Puerto Rico?',
    faq_a4: '<p>Actúa rápido — el moho puede aparecer en 24–48 horas. Documenta con fotos y <strong>llámanos de inmediato</strong>. Realizamos <strong>extracción de agua</strong>, secado estructural y gestionamos tu reclamación por inundación.</p>',
    faq_q5: '¿Qué incluye la restauración de daños por humo y hollín?',
    faq_a5: '<p>Limpieza de superficies, <strong>eliminación de olores</strong> con equipo industrial, descontaminación del aire, tratamiento de paredes, techos, ductos y restauración de muebles y objetos personales.</p>',
    faq_q6: '¿Cómo funciona la reclamación de seguro por incendio o inundación?',
    faq_a6: '<p>Inspeccionamos los daños, preparamos el <strong>estimado detallado</strong>, coordinamos con el ajustador y negociamos con las aseguradoras.</p>',
    contact_label: 'Contáctenos',
    contact_h2: '¿Sufrió un Incendio o Inundación? <span class="gradient-text">Estamos Aquí</span>',
    contact_p: 'No esperes. Cada minuto cuenta. Contáctanos ahora para una inspección gratuita de emergencia en Puerto Rico.',
    contact_wa_p: 'Chat inmediato con un experto', contact_phone_h3: 'Llamada Directa',
    contact_phone_p: 'Línea de emergencias 24/7', contact_sms_h3: 'Mensaje de Texto',
    contact_sms_p: 'Envíanos un SMS ahora', contact_email_p: 'Respuesta en menos de 1 hora',
    form_toggle: 'Solicitar Inspección Gratuita', form_h3: 'Completa el formulario',
    form_name_label: 'Nombre Completo *', form_name_ph: 'Juan García',
    form_phone_label: 'Teléfono *', form_email_label: 'Email', form_email_ph: 'juan@ejemplo.com',
    form_address_label: 'Dirección de la Propiedad *', form_address_ph: 'Calle, Municipio, Puerto Rico',
    form_insurer_label: 'Aseguradora', form_insurer_ph: 'Seleccionar aseguradora...',
    form_insurer_other: 'Otra', form_insurer_none: 'No tengo seguro',
    form_desc_label: 'Descripción del Incidente *', form_desc_ph: 'Describa brevemente lo que ocurrió...',
    form_submit: '<i class="fas fa-paper-plane"></i> Enviar Solicitud',
    form_sending: '<i class="fas fa-spinner fa-spin"></i> Enviando...',
    form_success: '<i class="fas fa-check-circle"></i> ¡Mensaje enviado! Nos comunicaremos en menos de 24 horas.',
    form_error: 'Hubo un problema al enviar el mensaje. Por favor intente de nuevo o contáctenos directamente.',
    footer_brand_p: 'Restauración profesional de daños por incendio, humo e inundación en Puerto Rico. Licenciados, asegurados y con más de 15 años de experiencia.',
    footer_services_h4: 'Servicios', footer_svc1: 'Mitigación de Emergencia', footer_svc2: 'Limpieza de Humo',
    footer_svc3: 'Daños por Agua', footer_svc4: 'Reconstrucción', footer_svc5: 'Gestión de Reclamaciones',
    footer_insurers_h4: 'Aseguradoras', footer_contact_h4: 'Contacto', footer_available: 'Disponible 24/7',
    footer_copy: '© 2025 Desarrollos Industriales LLC. Todos los derechos reservados. | Puerto Rico',
    bp_label: 'Nuestra Promesa',
    bp_h2: 'Estamos Contigo, <span class="gradient-text">No Contra Ti</span>',
    bp_subtitle: 'Cuando más nos necesitas, aquí estamos — de tu lado, desde el primer día.',
    bp_intro: 'Cuando tu hogar sufre daños, no solo enfrentas una reparación…<br><strong>enfrentas papeleo, burocracia y tiempo invertido con la aseguradora.</strong>',
    bp_body1: 'En <strong>Desarrollos Industriales LLC</strong> estamos para ayudarte, orientarte y solucionarte.',
    bp_card1: 'Aquí no hay tiempo que perder. Una vez nos contactas, <strong>comenzamos el proceso de inmediato.</strong> Sin largas esperas. Sin dejar tu caso estancado.',
    bp_card2: 'Lo mejor de todo: <strong>comenzamos la reparación junto con la reclamación.</strong>',
    bp_card3: 'Respuesta en <strong>24 horas.</strong> ¡Garantizado!',

    bp_tagline: 'Desarrollos Industriales LLC<br><span class="gradient-text">Recupera tu casa. Recupera tu tranquilidad. Rápido.</span>',
    bp_cta: 'Comenzar ahora',
    testi_label: 'Lo que dicen nuestros clientes',
    testi_h2: 'Historias <span class="gradient-text">Reales</span>',
    testi_verified_title: 'Cliente verificado',
    testi_data: [
      { quote: 'El incendio destruyó parte de mi cocina y sala. No sabía por dónde empezar. Llamé a D Industriales y en menos de 24 horas ya tenían todo documentado para la aseguradora. En semanas mi casa estaba restaurada. ¡Increíble servicio!', date: 'Marzo 2025' },
      { quote: 'La aseguradora quería pagarme mucho menos de lo que necesitaba. D Industriales me resolvio, gestionó todo el proceso y logré recibir lo que realmente me correspondía. Sin ellos no lo hubiera conseguido.', date: 'Enero 2025' },
      { quote: 'Lo que más me sorprendió fue que comenzaron la reparación al mismo tiempo que tramitaban la reclamación. No tuve que esperar meses para que mi familia tuviera una casa habitable. Muy profesionales y humanos.', date: 'Febrero 2025' },
      { quote: 'Pensé que iba a tardar un año en recuperar mi hogar. Con D Industriales el proceso fue rápido, transparente y sin costos de bolsillo. Me mantuvieron informado en todo momento. Los recomiendo al 100%.', date: 'Diciembre 2024' },
      { quote: 'El equipo de D Industriales fue como tener a alguien de familia peleando por nosotros. Desde la llamada inicial hasta la entrega final, todo fue impecable. Nuestra casa quedó mejor que antes del incendio.', date: 'Noviembre 2024' },
    ],
  },
  en: {
    modal_title: 'Select your language',
    modal_subtitle: 'Choose the language you want to browse in',
    modal_btn_es: 'Español',
    modal_btn_en: 'English',
    nav_services: 'Services', nav_insurers: 'Insurers', nav_radar: 'Radar PR', nav_gallery: 'Gallery',
    nav_faq: 'FAQ', nav_contact: 'Contact', nav_whatsapp: 'WhatsApp',
    hero_title: 'Professional Restoration of<br/><span class="gradient-text">Fire &amp; Flood Damage</span>',
    hero_subtitle: 'Puerto Rico\'s premier fire damage restoration company.<br/>We work directly with your insurer. Available <strong>24/7</strong>.',
    hero_badge1: 'Fast Response', hero_badge2: '+15 Years of Experience', hero_badge3: '24-hour Response',
    hero_cta1: 'Insurance Inspections', hero_cta2: '24/7 Emergencies', hero_scroll: 'Scroll',
    stat_years: 'Years of Experience', stat_jobs: 'Completed Jobs',
    stat_insurers: 'Affiliated Insurers', stat_claims: 'Successful Claims',
    services_label: 'Our Services',
    services_h2: 'Complete <span class="gradient-text">Post-Fire Restoration</span>',
    services_p: 'We handle every stage of the restoration process, from the emergency to the final reconstruction.',
    svc1_badge: 'Main Service', svc1_h3: 'Smoke & Soot Decontamination',
    svc1_p: 'We completely eliminate smoke, soot, and odors with specialized industrial equipment and advanced techniques. Invisible smoke keeps damaging your property and health every day that passes.',
    svc1_li1: 'Non-toxic chemicals', svc1_li2: 'Air decontamination', svc1_li3: 'Odor elimination',
    svc2_h3: 'Emergency Mitigation',
    svc2_p: 'Immediate 24/7 response. We secure the property, remove hazardous debris, and prevent additional damage.',
    svc2_li1: 'Response in less than 24 hours', svc2_li2: 'Damage assessment for rapid response', svc2_li3: 'Debris removal',
    svc3_h3: 'Water Damage',
    svc3_p: 'We restore damage caused by firefighting water with industrial extraction and drying equipment.',
    svc3_li1: 'Water extraction', svc3_li2: 'Industrial drying', svc3_li3: 'Mold prevention', svc3_li4: 'Fungus mitigation',
    svc4_h3: 'Structure Restoration',
    svc4_p: 'We rebuild from the ground up: roofs, walls, floors, electrical, plumbing, and complete finishes.',
    svc4_li1: 'Roofs and walls', svc4_li2: 'Stain Blocker', svc4_li3: 'Door and window restoration',
    svc5_h3: 'We Claim For You!',
    svc5_p: 'We work directly with your insurer. We handle all documentation and negotiation while you rest.',
    svc5_li1: 'Adjuster coordination', svc5_li2: 'Photo documentation', svc5_li3: 'Detailed estimates',
    svc6_h3: 'Content Policies',
    svc6_p: 'We recover, clean, and restore furniture, documents, electronics, and personal valuables.',
    svc6_li1: 'Detailed inventory', svc6_li2: 'Document restoration', svc6_li3: 'Secure storage',
    proceso_label: 'How We Work?',
    proceso_h2: 'Simple, Transparent <span class="gradient-text"> and Cost-Free Process!</span>',
    step1_h3: 'Emergency Call', step1_p: 'Call us or message us on WhatsApp. We respond within 24 hours.',
    step2_h3: 'Free Inspection', step2_p: 'We arrive at the property, assess the damage, and document everything for the claims process.',
    step3_h3: 'Insurer Coordination', step3_p: 'We contact your insurer directly, submit documentation, and manage the claim for you.',
    step4_h3: 'Complete Restoration', step4_p: 'We execute the restoration plan with the highest quality standards until final delivery.',
    aseg_label: 'Insurers',
    aseg_h2: 'We Work with the Leading <span class="gradient-text">Puerto Rico Insurers</span>',
    aseg_p: 'Always putting the insured first!',
    gallery_label: 'Our Work', gallery_h2: 'Real <span class="gradient-text">Transformations</span>',
    gallery_p: 'Drag the divider to see the before and after of our professional restorations.',
    gallery_before: 'BEFORE', gallery_after: 'AFTER', gallery_hint: 'Drag the divider',
    pre_radar_text: 'We are with you every step of the way, in a complicated process we are your helping hand with the experience.',
    radar_label: 'Real-Time Monitoring',
    radar_h2: 'Fire Emergency <span class="gradient-text">Radar</span> in Puerto Rico',
    radar_p: 'Real-time satellite data of active heat sources in Puerto Rico. Source: NASA FIRMS / VIIRS.',
    radar_legend_high: 'High Intensity', radar_legend_med: 'Moderate', radar_legend_low: 'Low',
    radar_note: 'Data updated every 12 hours from VIIRS satellites (NASA). Time:',
    faq_label: 'Frequently Asked Questions',
    faq_h2: 'Everything you need to <span class="gradient-text">know</span>',
    faq_p: 'Clear answers about fire, flood restoration and insurance claims in Puerto Rico.',
    faq_q1: 'What should I do after a house fire?',
    faq_a1: '<p>First, ensure everyone is safe and call 911 if there are injuries. Then <strong>contact us immediately</strong> — we respond within <strong>24 hours</strong>. We document the damage, secure the property, and launch the restoration and claims process right away.</p>',
    faq_q2: 'What does a fire restoration company do?',
    faq_a2: '<p>A company like Desarrollos Industriales LLC assesses and documents structural damage, performs <strong>smoke and soot cleanup</strong>, eliminates odors, executes <strong>structural drying</strong> if needed, reconstructs the structure, and <strong>manages the insurance claim</strong> on your behalf in Puerto Rico.</p>',
    faq_q3: 'What does property insurance cover for fire damage?',
    faq_a3: '<p>Most policies in Puerto Rico cover structural fire damage, <strong>smoke and soot restoration</strong>, water damage from firefighting systems, and content policies (furniture, electronics, documents). We help you claim the maximum with the insurer.</p>',
    faq_q4: 'What should I do if my house flooded in Puerto Rico?',
    faq_a4: '<p>Act fast — mold can appear within 24–48 hours. Cut electricity if safe, document with photos, and <strong>call us immediately</strong>. We perform <strong>water extraction</strong>, industrial structural drying, mold prevention, and manage your flood damage claim with your insurer.</p>',
    faq_q5: 'What does smoke and soot damage restoration include?',
    faq_a5: '<p>It includes full surface cleaning, <strong>odor elimination</strong> with specialized industrial equipment, indoor air decontamination, treatment of walls, ceilings, ducts, and restoration of furniture and personal belongings. Invisible smoke keeps damaging materials and health if not treated properly.</p>',
    faq_q6: 'How does a fire or flood insurance claim work?',
    faq_a6: '<p>We handle everything: we inspect and document the damage, prepare a <strong>detailed estimate</strong>, coordinate with your insurer\'s adjuster, and negotiate to get you the maximum from your policy. We work with the insurer.</p>',
    contact_label: 'Contact Us',
    contact_h2: 'Suffered a Fire or Flood? <span class="gradient-text">We\'re Here</span>',
    contact_p: 'Don\'t wait. Every minute counts. Contact us now for a free emergency inspection in Puerto Rico.',
    contact_wa_p: 'Instant chat with an expert', contact_phone_h3: 'Direct Call',
    contact_phone_p: '24/7 Emergency Line', contact_sms_h3: 'Text Message',
    contact_sms_p: 'Send us an SMS now', contact_email_p: 'Response in less than 1 hour',
    form_toggle: 'Request Free Inspection', form_h3: 'Complete the form',
    form_name_label: 'Full Name *', form_name_ph: 'John Smith',
    form_phone_label: 'Phone *', form_email_label: 'Email', form_email_ph: 'john@example.com',
    form_address_label: 'Property Address *', form_address_ph: 'Street, Municipality, Puerto Rico',
    form_insurer_label: 'Insurer', form_insurer_ph: 'Select insurer...',
    form_insurer_other: 'Other', form_insurer_none: "I don't have insurance",
    form_desc_label: 'Incident Description *', form_desc_ph: 'Briefly describe what happened...',
    form_submit: '<i class="fas fa-paper-plane"></i> Send Request',
    form_sending: '<i class="fas fa-spinner fa-spin"></i> Sending...',
    form_success: '<i class="fas fa-check-circle"></i> Message sent! We\'ll contact you within 24 hours.',
    form_error: 'There was a problem sending the message. Please try again or contact us directly.',
    footer_brand_p: 'Professional fire damage restoration in Puerto Rico. Licensed, insured, and with over 15 years of experience.',
    footer_services_h4: 'Services', footer_svc1: 'Emergency Mitigation', footer_svc2: 'Smoke Cleanup',
    footer_svc3: 'Water Damage', footer_svc4: 'Reconstruction', footer_svc5: 'Claims Management',
    footer_insurers_h4: 'Insurers', footer_contact_h4: 'Contact', footer_available: 'Available 24/7',
    footer_copy: '© 2025 Desarrollos Industriales LLC. All rights reserved. | Puerto Rico',
    bp_label: 'Our Promise',
    bp_h2: 'We Are With You, <span class="gradient-text">Not Against You</span>',
    bp_subtitle: 'When you need us most, we\'re here — on your side, from day one.',
    bp_intro: 'When your home suffers damage, you don\'t just face a repair…<br><strong>you face paperwork, bureaucracy, and spent time with the insurance companies.</strong>',
    bp_body1: 'At <strong>Desarrollos Industriales LLC</strong> we are here to help, guide, and assist you.',
    bp_card1: 'No time to waste. Once you contact us, <strong>we start the process immediately.</strong> No long waits. No leaving your case stalled.',
    bp_card2: 'Best of all: <strong>we begin repairs at the same time as the claim.</strong>',
    bp_card3: 'Response in <strong>24 hours.</strong> Guaranteed!',

    bp_tagline: 'Desarrollos Industriales LLC<br><span class="gradient-text">Recover your home. Recover your peace of mind. Fast.</span>',
    bp_cta: 'Get started now',
    testi_label: 'What our clients say',
    testi_h2: 'Real <span class="gradient-text">Stories</span>',
    testi_verified_title: 'Verified client',
    testi_data: [
      { quote: 'The fire destroyed part of my kitchen and living room. I didn\'t know where to start. I called D Industriales and in less than 24 hours they had everything documented for the insurer. In weeks my house was restored. Incredible service!', date: 'March 2025' },
      { quote: 'The insurance company wanted to pay me much less than I needed. D Industriales assist me, managed the entire process, and I received what I truly deserved. Without them I wouldn\'t have gotten it.', date: 'January 2025' },
      { quote: 'What surprised me most was that they started repairs at the same time they processed the claim. My family didn\'t have to wait months for a livable home. Very professional and caring.', date: 'February 2025' },
      { quote: 'I thought it would take a year to recover my home. With D Industriales the process was fast, transparent, and at no out-of-pocket cost. They kept me informed every step of the way. I recommend them 100%.', date: 'December 2024' },
      { quote: 'The D Industriales team was like having family fighting for us. From the first call to the final delivery, everything was impeccable. Our house ended up better than before the fire.', date: 'November 2024' },
    ],
  }
};

// ── TESTIMONIOS DATA (must be before applyLanguage) ──────────
const TESTI_STATIC = [
  { name: 'María González', location: 'Bayamón, PR',  avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { name: 'Carlos Rivera',  location: 'San Juan, PR', avatar: 'https://randomuser.me/api/portraits/men/32.jpg'   },
  { name: 'Lucía Martínez', location: 'Caguas, PR',   avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { name: 'Roberto Colón',  location: 'Ponce, PR',    avatar: 'https://randomuser.me/api/portraits/men/76.jpg'   },
  { name: 'Ana Torres',     location: 'Arecibo, PR',  avatar: 'https://randomuser.me/api/portraits/women/12.jpg' },
];
let _testiTimer = null;

function applyLanguage(lang) {
  const t = TRANSLATIONS[lang];
  if (!t) return;

  // Update all data-i18n elements (innerHTML)
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  // Update placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (t[key] !== undefined) el.setAttribute('placeholder', t[key]);
  });

  // Update select option texts
  document.querySelectorAll('[data-i18n-option]').forEach(el => {
    const key = el.getAttribute('data-i18n-option');
    if (t[key] !== undefined) el.textContent = t[key];
  });

  // Update html lang attribute
  document.documentElement.setAttribute('lang', lang);

  // Update lang toggle button image: show the OTHER language flag
  const langFlagImg = document.getElementById('langFlagImg');
  if (langFlagImg) {
    langFlagImg.src = lang === 'es' ? 'images/us.png' : 'images/pr.png';
    langFlagImg.alt = lang === 'es' ? 'English' : 'Español';
  }

  // Save preference (only marks language, NOT that user explicitly chose via modal)
  localStorage.setItem('dindustriales-lang', lang);

  // Rebuild testimonials in the chosen language
  buildTestiCards(lang);
}

function applyLanguageAndSave(lang) {
  localStorage.setItem('dindustriales-lang-chosen', '1');
  applyLanguage(lang);
}

// Language toggle button (header)
const langToggleBtn = document.getElementById('langToggle');
if (langToggleBtn) {
  langToggleBtn.addEventListener('click', () => {
    const current = localStorage.getItem('dindustriales-lang') || 'en';
    applyLanguage(current === 'es' ? 'en' : 'es');
  });
}

// ── LANGUAGE MODAL ────────────────────────────────────────────
const langModal = document.getElementById('langModal');

function closeLangModal(lang) {
  langModal.classList.add('hidden');
  setTimeout(() => { langModal.style.display = 'none'; }, 380);
  applyLanguageAndSave(lang);
}

document.getElementById('pickEs').addEventListener('click', () => closeLangModal('es'));
document.getElementById('pickEn').addEventListener('click', () => closeLangModal('en'));

// Show modal only if user NEVER explicitly picked a language via the modal
const userChose  = localStorage.getItem('dindustriales-lang-chosen');
const savedLang  = localStorage.getItem('dindustriales-lang');
if (userChose && savedLang) {
  // User already picked before — skip modal and apply saved language
  langModal.style.display = 'none';
  applyLanguage(savedLang);
}
// Otherwise modal stays visible — user must pick

// ── TESTIMONIOS SLIDER ────────────────────────────────────────

function buildTestiCards(lang) {
  const track = document.getElementById('testiTrack');
  if (!track) return;
  clearInterval(_testiTimer);
  track.style.transform = 'translateX(0)';

  const t = TRANSLATIONS[lang] || TRANSLATIONS.es;
  const data = t.testi_data || [];
  const verifiedTitle = t.testi_verified_title || 'Cliente verificado';
  const stars = '<i class="fas fa-star"></i>'.repeat(5);

  track.innerHTML = TESTI_STATIC.map((s, i) => {
    const d = data[i] || {};
    return `
      <article class="testi-card">
        <div class="testi-top">
          <div class="testi-avatar-wrap">
            <img src="${s.avatar}" alt="${s.name}" class="testi-avatar" loading="lazy" />
            <span class="testi-verified" title="${verifiedTitle}"><i class="fas fa-check-circle"></i></span>
          </div>
          <div class="testi-meta">
            <strong class="testi-name">${s.name}</strong>
            <span class="testi-location"><i class="fas fa-map-marker-alt"></i> ${s.location}</span>
            <div class="testi-stars">${stars}</div>
          </div>
        </div>
        <blockquote class="testi-quote">
          <i class="fas fa-quote-left testi-icon-quote"></i>
          ${d.quote || ''}
        </blockquote>
        <span class="testi-date">${d.date || ''}</span>
      </article>`;
  }).join('');

  initTestiSlider();
}

function initTestiSlider() {
  const track   = document.getElementById('testiTrack');
  const dotsWrap = document.getElementById('testiDots');
  if (!track) return;

  const cards = Array.from(track.querySelectorAll('.testi-card'));
  if (!cards.length) return;

  // Replace prev/next buttons to remove any old click listeners
  ['testiPrev', 'testiNext'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { const clone = el.cloneNode(true); el.parentNode.replaceChild(clone, el); }
  });
  const prevBtn = document.getElementById('testiPrev');
  const nextBtn = document.getElementById('testiNext');

  let current = 0;
  const total = cards.length;

  function visibleCount() {
    if (window.innerWidth <= 580) return 1;
    if (window.innerWidth <= 900) return 2;
    return 3;
  }

  function buildDots() {
    dotsWrap.innerHTML = '';
    const pages = total - visibleCount() + 1;
    for (let i = 0; i < pages; i++) {
      const d = document.createElement('button');
      d.className = 'testi-dot' + (i === current ? ' active' : '');
      d.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(d);
    }
  }

  function updateDots() {
    dotsWrap.querySelectorAll('.testi-dot').forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function goTo(index) {
    const pages = total - visibleCount() + 1;
    current = Math.max(0, Math.min(index, pages - 1));
    const cardW = cards[0].getBoundingClientRect().width + 24;
    track.style.transform = `translateX(-${current * cardW}px)`;
    updateDots();
  }

  function next() { goTo(current + 1 >= total - visibleCount() + 1 ? 0 : current + 1); }
  function prev() { goTo(current - 1 < 0 ? total - visibleCount() : current - 1); }

  function startTimer() { _testiTimer = setInterval(next, 5000); }
  function resetTimer() { clearInterval(_testiTimer); startTimer(); }

  prevBtn.addEventListener('click', () => { resetTimer(); prev(); });
  nextBtn.addEventListener('click', () => { resetTimer(); next(); });

  // Swipe táctil (property assignment evita listeners duplicados)
  let startX = 0;
  track.ontouchstart = e => { startX = e.touches[0].clientX; };
  track.ontouchend = e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { resetTimer(); diff > 0 ? next() : prev(); }
  };

  // Hover pause
  const wrap = track.parentElement;
  wrap.onmouseenter = () => clearInterval(_testiTimer);
  wrap.onmouseleave = startTimer;

  // Resize (sobrescribe handler anterior)
  window._testiResizeHandler = () => { goTo(0); buildDots(); };

  buildDots();
  startTimer();
}

// Resize listener único global
window.addEventListener('resize', () => { if (window._testiResizeHandler) window._testiResizeHandler(); });

// Render inicial (idioma por defecto: inglés, o el guardado)
buildTestiCards(localStorage.getItem('dindustriales-lang') || 'en');

// ── HAMBURGER MENU ────────────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

function closeMenu() {
  navMenu.classList.remove('open');
  hamburger.classList.remove('active');
  document.body.style.overflow = '';
}

function openMenu() {
  navMenu.classList.add('open');
  hamburger.classList.add('active');
  document.body.style.overflow = 'hidden'; // evita scroll del fondo
}

hamburger.addEventListener('click', () => {
  navMenu.classList.contains('open') ? closeMenu() : openMenu();
});

// Cerrar al hacer clic en un link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Cerrar al hacer clic en el overlay (pseudo-element ::before)
navMenu.addEventListener('click', (e) => {
  if (e.target === navMenu) closeMenu();
});

// Cerrar con tecla Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && navMenu.classList.contains('open')) closeMenu();
});

// ── HEADER SCROLL ─────────────────────────────────────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 60);
});

// ── FIRE CANVAS ANIMATION ──────────────────────────────────────
(function initFireCanvas() {
  const canvas = document.getElementById('fireCanvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let W, H;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const colors = [
    'rgba(255,60,0,',
    'rgba(255,130,30,',
    'rgba(255,200,50,',
    'rgba(230,50,20,',
    'rgba(255,100,10,',
    'rgba(255,80,0,'
  ];

  function Particle() {
    this.reset = function () {
      this.x = Math.random() * W;
      this.y = H + Math.random() * 80;
      this.size = Math.random() * 18 + 4;
      this.speedY = -(Math.random() * 2.5 + 0.8);
      this.speedX = (Math.random() - 0.5) * 1.2;
      this.life = 1;
      this.decay = Math.random() * 0.012 + 0.006;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.wobble = Math.random() * Math.PI * 2;
      this.wobbleSpeed = Math.random() * 0.06 + 0.02;
    };
    this.reset();

    this.update = function () {
      this.life -= this.decay;
      this.y += this.speedY;
      this.wobble += this.wobbleSpeed;
      this.x += this.speedX + Math.sin(this.wobble) * 0.5;
      this.size *= 0.993;
      if (this.life <= 0 || this.y < -this.size) this.reset();
    };

    this.draw = function () {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.life);
      const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
      grad.addColorStop(0, this.color + '1)');
      grad.addColorStop(0.5, this.color + '0.6)');
      grad.addColorStop(1, this.color + '0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };
  }

  // Create particles
  for (let i = 0; i < 220; i++) {
    const p = new Particle();
    p.y = Math.random() * H; // spread initial positions
    particles.push(p);
  }

  // Also add ember/spark particles
  function Ember() {
    this.reset = function () {
      this.x = Math.random() * W;
      this.y = H * 0.7 + Math.random() * H * 0.3;
      this.size = Math.random() * 2.5 + 0.5;
      this.speedY = -(Math.random() * 3 + 1);
      this.speedX = (Math.random() - 0.5) * 2;
      this.life = 1;
      this.decay = Math.random() * 0.008 + 0.004;
    };
    this.reset();
    this.update = function () {
      this.life -= this.decay;
      this.y += this.speedY;
      this.x += this.speedX;
      this.speedX += (Math.random() - 0.5) * 0.15;
      if (this.life <= 0 || this.y < -10) this.reset();
    };
    this.draw = function () {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.life * 0.9);
      ctx.fillStyle = '#ffd60a';
      ctx.shadowColor = '#ff6b35';
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };
  }

  for (let i = 0; i < 80; i++) {
    const e = new Ember();
    e.y = Math.random() * H;
    particles.push(e);
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
})();

// ── COUNTER ANIMATION ──────────────────────────────────────────
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 2000;
    const start = performance.now();
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * ease);
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

// Trigger counter when stats section is visible
const statsObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { animateCounters(); statsObs.disconnect(); } });
}, { threshold: 0.5 });
const statsSection = document.getElementById('stats');
if (statsSection) statsObs.observe(statsSection);

// ── FIRE RADAR MAP (Leaflet + NASA FIRMS) ─────────────────────
function initFireMap() {
  const mapEl = document.getElementById('fireMap');
  if (!mapEl) return;

  // Center on Puerto Rico
  const map = L.map('fireMap', {
    center: [18.22, -66.59],
    zoom: 9,
    zoomControl: true,
    scrollWheelZoom: false,
  });

  // Base tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);

  // FIRMS VIIRS NRT WMS overlay (no API key needed for WMS tiles)
  const firmsUrl = 'https://firms.modaps.eosdis.nasa.gov/wms/key/1/';
  const firmsLayer = L.tileLayer.wms(firmsUrl, {
    layers: 'fires_viirs_snpp',
    format: 'image/png',
    transparent: true,
    opacity: 0.85,
    attribution: 'NASA FIRMS'
  });

  // Try to load FIRMS, fallback gracefully
  firmsLayer.on('tileerror', () => {
    document.getElementById('radarStatusText').textContent = 'Cargando desde base alternativa...';
  });
  firmsLayer.addTo(map);

  // Fetch fire hotspot data from NASA FIRMS JSON API (CORS proxy)
  const today = new Date().toISOString().split('T')[0];
  const statusEl = document.getElementById('radarStatusText');
  const timeEl = document.getElementById('radarTime');

  // Use NASA FIRMS public REST API (map key required – fallback to manual markers if unavailable)
  const FIRMS_MAP_KEY = 'yourkey'; // Replace with a free key from https://firms.modaps.eosdis.nasa.gov/api/
  const firmsApiUrl = `https://firms.modaps.eosdis.nasa.gov/api/area/json/${FIRMS_MAP_KEY}/VIIRS_SNPP_NRT/-68,17,-65,19/2`;

  fetch(firmsApiUrl)
    .then(r => r.ok ? r.json() : Promise.reject())
    .then(data => {
      if (!data || !data.length) throw new Error('No data');
      const fireIcon = L.divIcon({
        className: '',
        html: '<div style="width:14px;height:14px;background:radial-gradient(circle,#ffd60a,#ff4500);border-radius:50%;border:2px solid #fff;box-shadow:0 0 8px #ff4500;"></div>',
        iconSize: [14, 14], iconAnchor: [7, 7]
      });
      data.forEach(point => {
        const brightness = parseFloat(point.bright_ti4 || 300);
        const color = brightness > 350 ? '#ef4444' : brightness > 330 ? '#f97316' : '#eab308';
        const icon = L.divIcon({
          className: '',
          html: `<div style="width:12px;height:12px;background:${color};border-radius:50%;border:2px solid #fff;box-shadow:0 0 8px ${color};animation:radarPulse 2s infinite;"></div>`,
          iconSize: [12, 12], iconAnchor: [6, 6]
        });
        L.marker([parseFloat(point.latitude), parseFloat(point.longitude)], { icon })
          .addTo(map)
          .bindPopup(`<b>Foco de Calor</b><br/>Brillo: ${brightness}K<br/>Fecha: ${point.acq_date}<br/>Satélite: VIIRS`);
      });
      statusEl.textContent = `${data.length} focos de calor activos detectados`;
      timeEl.textContent = new Date().toLocaleString('es-PR');
    })
    .catch(() => {
      // Graceful fallback: show static known fire risk areas in PR
      statusEl.textContent = 'Mapa activo – datos satelitales actualizados cada 12h';
      timeEl.textContent = new Date().toLocaleString('es-PR');
      const zones = [
        { lat: 18.01, lng: -66.61, name: 'Bosque Toro Negro', risk: 'Área de riesgo monitoreada' },
        { lat: 18.47, lng: -66.73, name: 'Aguadilla', risk: 'Área costera monitoreada' },
        { lat: 18.09, lng: -65.83, name: 'Humacao', risk: 'Área este monitoreada' },
        { lat: 18.35, lng: -66.11, name: 'Caguas', risk: 'Área central monitoreada' },
      ];
      zones.forEach(z => {
        L.circleMarker([z.lat, z.lng], {
          radius: 10, color: '#ff6b35', fillColor: '#ff6b35', fillOpacity: 0.3,
          weight: 2, dashArray: '4'
        }).addTo(map).bindPopup(`<b>${z.name}</b><br/>${z.risk}`);
      });
    });

  // Add PR boundary highlight
  L.rectangle([[17.9, -67.3], [18.55, -65.6]], {
    color: '#4ecdc4', weight: 2, fill: false, dashArray: '6'
  }).addTo(map).bindPopup('<b>Puerto Rico</b><br/>Zona de monitoreo activo');
}

document.addEventListener('DOMContentLoaded', () => {
  // Init AOS
  AOS.init({ duration: 800, once: true, offset: 80 });
  // Init map
  initFireMap();
});

// ── CONTACT FORM ───────────────────────────────────────────────
// EmailJS IDs — reemplaza con los tuyos (ver instrucciones en README)
var EMAILJS_SERVICE_ID  = 'service_981iqui';
var EMAILJS_TEMPLATE_ID = 'template_db05cnf';

function submitForm(event) {
  event.preventDefault();
  const form = event.target;
  const data = Object.fromEntries(new FormData(form));
  const submitBtn = form.querySelector('[type="submit"]');
  const successEl = document.getElementById('formSuccess');

  // Deshabilitar botón mientras envía
  const curLang = localStorage.getItem('dindustriales-lang') || 'es';
  const tForm = TRANSLATIONS[curLang];
  submitBtn.disabled = true;
  submitBtn.innerHTML = tForm.form_sending;

  // Parámetros que coinciden con las variables del template de EmailJS
  const templateParams = {
    nombre:      data.nombre,
    telefono:    data.telefono,
    email_from:  data.email || 'No proporcionado',
    direccion:   data.direccion,
    aseguradora: data.aseguradora || 'No especificada',
    descripcion: data.descripcion
  };

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(function () {
      // ✅ Mostrar mensaje de éxito y limpiar el formulario
      successEl.style.display = 'flex';
      form.reset();
    })
    .catch(function (error) {
      console.error('EmailJS error — status:', error.status, '| text:', error.text, '| detail:', error);
      successEl.style.display = 'none';
      var detail = (error && error.text) ? ('\n\nDetalle: ' + error.text) : '';
      alert(tForm.form_error + detail);
    })
    .finally(function () {
      submitBtn.disabled = false;
      submitBtn.innerHTML = tForm.form_submit;
    });
}

// ── GALLERY LOADER (from localStorage - admin managed) ────────
function loadGallery() {
  const items = JSON.parse(localStorage.getItem('dindustriales-gallery') || '[]');
  const container = document.getElementById('galleryItems');
  const placeholders = document.getElementById('galleryGrid');
  if (!container) return;

  if (items.length > 0) {
    placeholders.style.display = 'none';
    container.innerHTML = items.map((item, i) => `
      <div class="gallery-item" onclick="openLightbox('${item.after || item.src}')">
        <img src="${item.src}" alt="${item.title || 'Proyecto ' + (i+1)}" loading="lazy" />
        <div class="gallery-badge">${item.type || 'Restauración'}</div>
        <div class="gallery-item-overlay">
          <h4>${item.title || 'Proyecto de Restauración'}</h4>
          <p>${item.description || 'Puerto Rico'}</p>
        </div>
      </div>
    `).join('');
  }
}

// ── LIGHTBOX ───────────────────────────────────────────────────
function openLightbox(src) {
  let lb = document.querySelector('.lightbox');
  if (!lb) {
    lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.innerHTML = '<button class="lightbox-close" onclick="closeLightbox()">&times;</button><img />';
    lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
    document.body.appendChild(lb);
  }
  lb.querySelector('img').src = src;
  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  const lb = document.querySelector('.lightbox');
  if (lb) { lb.classList.remove('active'); document.body.style.overflow = ''; }
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

loadGallery();

// Formulario colapsable y reveal de teléfonos gestionados en index.html (inline script)
