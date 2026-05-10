/* PeerX — shared interactive bits. */

(function () {
    'use strict';

    // Language switcher.
    var pills = document.querySelectorAll('[data-set-lang]');
    function applyLang(lang) {
        if (lang !== 'en' && lang !== 'ru') lang = 'en';
        document.documentElement.lang = lang;
        pills.forEach(function (p) {
            p.setAttribute('aria-pressed', p.dataset.setLang === lang ? 'true' : 'false');
        });
        try { localStorage.setItem('peerx-lang', lang); } catch (_) {}
    }
    applyLang(document.documentElement.lang);
    pills.forEach(function (p) {
        p.addEventListener('click', function () { applyLang(p.dataset.setLang); });
    });

    // Cursor-tracked spotlight on .feature cards.
    if (
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
        window.matchMedia('(hover: hover)').matches
    ) {
        document.querySelectorAll('.feature').forEach(function (card) {
            card.addEventListener('mousemove', function (e) {
                var rect = card.getBoundingClientRect();
                card.style.setProperty('--spot-x', (e.clientX - rect.left) + 'px');
                card.style.setProperty('--spot-y', (e.clientY - rect.top) + 'px');
            });
        });
    }

    // Reveal-on-scroll.
    var els = document.querySelectorAll('.reveal');
    if (
        window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        !('IntersectionObserver' in window)
    ) {
        els.forEach(function (el) { el.classList.add('in'); });
    } else {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry, i) {
                if (entry.isIntersecting) {
                    entry.target.style.transitionDelay = (i * 60) + 'ms';
                    entry.target.classList.add('in');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        els.forEach(function (el) { io.observe(el); });
    }
})();
