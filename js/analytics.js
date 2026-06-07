/* ===== D INDUSTRIALES - SITE-WIDE EVENT TRACKING (GA4) =====
 * Loaded on every page. Uses event delegation so it works whether or
 * not main.js is present. All event names follow GA4 snake_case.
 */
(function () {
  function track(name, params) {
    if (typeof window.gtag !== 'function') return;
    try { window.gtag('event', name, params || {}); } catch (_) {}
  }

  function pageId() {
    var p = (location.pathname || '').split('/').pop() || 'index.html';
    return p.toLowerCase();
  }

  function currentLang() {
    try { return localStorage.getItem('dindustriales-lang') || document.documentElement.lang || 'es'; }
    catch (_) { return document.documentElement.lang || 'es'; }
  }

  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  }

  // ── CLICK DELEGATION ────────────────────────────────────────
  document.addEventListener('click', function (e) {
    var el = e.target.closest('a, button');
    if (!el) return;

    // Phone calls (tel: links)
    var telLink = el.closest('a[href^="tel:"]');
    if (telLink) {
      track('call_phone', {
        event_category: 'contact',
        event_label: telLink.getAttribute('href').replace('tel:', ''),
        page: pageId()
      });
      return;
    }

    // WhatsApp (wa.me links)
    var waLink = el.closest('a[href*="wa.me"]');
    if (waLink) {
      track('open_whatsapp', {
        event_category: 'contact',
        event_label: waLink.getAttribute('aria-label') || waLink.className || 'whatsapp',
        page: pageId(),
        language: currentLang()
      });
      return;
    }

    // Theme toggle
    if (el.closest('#themeToggle')) {
      // Fires before the toggle runs; report the NEW theme that's about to apply.
      var nextTheme = currentTheme() === 'dark' ? 'light' : 'dark';
      track('theme_toggle', { event_category: 'ui', theme: nextTheme, page: pageId() });
      return;
    }

    // Language toggle (header button OR static <a class="lang-toggle"> on sub-pages)
    if (el.closest('#langToggle') || el.closest('.lang-toggle')) {
      var fromLang = currentLang();
      track('language_toggle', {
        event_category: 'ui',
        from_language: fromLang,
        to_language: fromLang === 'es' ? 'en' : 'es',
        page: pageId()
      });
      return;
    }

    // Initial language modal (index.html only)
    if (el.closest('#pickEs')) { track('language_chosen', { event_category: 'ui', language: 'es', source: 'modal' }); return; }
    if (el.closest('#pickEn')) { track('language_chosen', { event_category: 'ui', language: 'en', source: 'modal' }); return; }

    // Floating Assistant launcher (open/close toggle)
    if (el.closest('#diAssistantLauncher')) {
      var panel = document.getElementById('diAssistantPanel');
      var willOpen = !(panel && panel.classList.contains('is-open'));
      track(willOpen ? 'assistant_open' : 'assistant_close', {
        event_category: 'assistant', source: 'launcher', page: pageId()
      });
      return;
    }

    // Assistant message bubble (opens panel)
    if (el.closest('#diAssistantBubble') && !el.closest('[data-di-bubble-close]')) {
      track('assistant_open', { event_category: 'assistant', source: 'bubble', page: pageId() });
      return;
    }

    // "View insurers" — assistant panel CTA + asistencia page CTA
    var insurersLink = el.closest('a[href*="aseguradoras"], a[href*="asistencia-reclamaciones"]');
    if (insurersLink) {
      track('view_insurers', {
        event_category: 'navigation',
        event_label: insurersLink.textContent.trim().slice(0, 60),
        page: pageId()
      });
      return;
    }
  }, true);

  // ── FORM SUBMIT (contact form on index.html) ────────────────
  document.addEventListener('submit', function (e) {
    var form = e.target;
    if (!form || form.id !== 'contactForm') return;
    var data = new FormData(form);
    track('contact_form_submit', {
      event_category: 'lead',
      event_label: data.get('aseguradora') || 'unspecified',
      language: currentLang(),
      page: pageId()
    });
  }, true);
})();
