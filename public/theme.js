/* RIKI // Neon theme controller
 * Keeps the interface personal without reloading the application.
 */
(function () {
    'use strict';

    var STORAGE_KEY = 'riki_theme';
    var DEFAULT_THEME = 'cosmic-cyan';
    var PALETTES = [
        { id: 'cosmic-cyan', name: 'Cosmic Cyan', primary: '#30e5ff', secondary: '#7c5cff', rgb: '48 229 255', secondaryRgb: '124 92 255' },
        { id: 'ultraviolet', name: 'Ultraviolet', primary: '#ad6cff', secondary: '#f05bff', rgb: '173 108 255', secondaryRgb: '240 91 255' },
        { id: 'laser-lime', name: 'Laser Lime', primary: '#b9ff35', secondary: '#20e3b2', rgb: '185 255 53', secondaryRgb: '32 227 178' },
        { id: 'solar-flare', name: 'Solar Flare', primary: '#ffba35', secondary: '#ff5f57', rgb: '255 186 53', secondaryRgb: '255 95 87' },
        { id: 'hot-pink', name: 'Hot Pink', primary: '#ff4bb8', secondary: '#9d4edd', rgb: '255 75 184', secondaryRgb: '157 78 221' },
        { id: 'aurora', name: 'Aurora', primary: '#25f0a4', secondary: '#1aa8ff', rgb: '37 240 164', secondaryRgb: '26 168 255' },
        { id: 'cobalt', name: 'Cobalt Blue', primary: '#5f86ff', secondary: '#58e5ff', rgb: '95 134 255', secondaryRgb: '88 229 255' },
        { id: 'red-pulse', name: 'Red Pulse', primary: '#ff4d6d', secondary: '#ff8a3d', rgb: '255 77 109', secondaryRgb: '255 138 61' },
        { id: 'plasma-orange', name: 'Plasma Orange', primary: '#ff7a3d', secondary: '#ffd166', rgb: '255 122 61', secondaryRgb: '255 209 102' },
        { id: 'arctic', name: 'Arctic Ice', primary: '#dff8ff', secondary: '#66d9ff', rgb: '223 248 255', secondaryRgb: '102 217 255' }
    ];

    function getPalette(id) {
        return PALETTES.find(function (palette) { return palette.id === id; }) || PALETTES[0];
    }

    function getSavedTheme() {
        try {
            return localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME;
        } catch (error) {
            return DEFAULT_THEME;
        }
    }

    function iconMarkup(name, className) {
        return '<i data-lucide="' + name + '" class="' + (className || 'w-4 h-4') + '"></i>';
    }

    var Theme = {
        palettes: PALETTES,
        current: getSavedTheme(),
        initialized: false,

        init: function () {
            if (this.initialized) return;
            this.initialized = true;
            document.documentElement.classList.add('riki-experience');
            this.apply(this.current, false);
        },

        apply: function (id, persist) {
            var palette = getPalette(id);
            var root = document.documentElement;
            this.current = palette.id;
            root.dataset.rikiTheme = palette.id;
            root.style.setProperty('--riki-accent', palette.primary);
            root.style.setProperty('--riki-accent-2', palette.secondary);
            root.style.setProperty('--riki-accent-rgb', palette.rgb);
            root.style.setProperty('--riki-accent-2-rgb', palette.secondaryRgb);
            root.style.setProperty('--riki-accent-contrast', palette.id === 'arctic' || palette.id === 'laser-lime' || palette.id === 'solar-flare' ? '#071018' : '#f7fbff');

            var themeMeta = document.querySelector('meta[name="theme-color"]');
            if (themeMeta) themeMeta.setAttribute('content', palette.primary);

            document.querySelectorAll('[data-riki-theme]').forEach(function (control) {
                var active = control.getAttribute('data-riki-theme') === palette.id;
                control.classList.toggle('is-selected', active);
                control.setAttribute('aria-pressed', active ? 'true' : 'false');
            });

            var label = document.querySelectorAll('[data-riki-theme-label]');
            label.forEach(function (node) { node.textContent = palette.name; });

            if (persist !== false) {
                try { localStorage.setItem(STORAGE_KEY, palette.id); } catch (error) {}
            }
        },

        set: function (id) {
            var palette = getPalette(id);
            this.apply(palette.id, true);
            if (typeof window.showToast === 'function') {
                window.showToast('Tema ' + palette.name + ' aktif');
            }
            if (window.lucide && typeof window.lucide.createIcons === 'function') {
                window.lucide.createIcons();
            }
        },

        swatchesMarkup: function (compact) {
            var current = this.current;
            return PALETTES.map(function (palette) {
                var selected = palette.id === current;
                return '<button type="button" class="riki-palette-option' + (selected ? ' is-selected' : '') + '" ' +
                    'data-riki-theme="' + palette.id + '" aria-label="Pilih tema ' + palette.name + '" aria-pressed="' + (selected ? 'true' : 'false') + '" ' +
                    'onclick="Theme.set(\'' + palette.id + '\')" style="--palette-primary:' + palette.primary + ';--palette-secondary:' + palette.secondary + ';">' +
                    '<span class="riki-palette-orb" aria-hidden="true"></span>' +
                    (compact ? '' : '<span class="riki-palette-name">' + palette.name + '</span>') +
                    '<span class="riki-palette-check" aria-hidden="true">✓</span>' +
                    '</button>';
            }).join('');
        },

        mount: function () {
            if (document.getElementById('riki-theme-modal')) return;

            var modal = document.createElement('div');
            modal.id = 'riki-theme-modal';
            modal.className = 'riki-theme-modal hidden';
            modal.setAttribute('role', 'dialog');
            modal.setAttribute('aria-modal', 'true');
            modal.setAttribute('aria-labelledby', 'riki-theme-modal-title');
            modal.innerHTML =
                '<button class="riki-theme-backdrop" aria-label="Tutup pemilih warna" onclick="Theme.close()"></button>' +
                '<section class="riki-theme-sheet" role="document">' +
                    '<div class="riki-sheet-orbit riki-sheet-orbit-one"></div>' +
                    '<div class="riki-sheet-orbit riki-sheet-orbit-two"></div>' +
                    '<div class="riki-theme-sheet-header">' +
                        '<div>' +
                            '<p class="riki-eyebrow">PERSONALIZE YOUR UNIVERSE</p>' +
                            '<h2 id="riki-theme-modal-title">Choose your pulse</h2>' +
                            '<p class="riki-theme-description">10 warna neon. Disimpan otomatis di perangkatmu.</p>' +
                        '</div>' +
                        '<button type="button" class="riki-close-button" aria-label="Tutup" onclick="Theme.close()">' + iconMarkup('x', 'w-5 h-5') + '</button>' +
                    '</div>' +
                    '<div class="riki-palette-grid">' + this.swatchesMarkup(false) + '</div>' +
                    '<div class="riki-theme-sheet-footer"><span class="riki-live-dot"></span><span>ACTIVE: <strong data-riki-theme-label></strong></span></div>' +
                '</section>';
            document.body.appendChild(modal);

            document.addEventListener('keydown', function (event) {
                if (event.key === 'Escape') Theme.close();
            });

            if (window.lucide && typeof window.lucide.createIcons === 'function') {
                window.lucide.createIcons();
            }
            this.apply(this.current, false);
        },

        open: function () {
            this.mount();
            var modal = document.getElementById('riki-theme-modal');
            if (!modal) return;
            modal.classList.remove('hidden');
            requestAnimationFrame(function () { modal.classList.add('is-open'); });
            document.body.classList.add('riki-modal-open');
            var closeButton = modal.querySelector('.riki-close-button');
            if (closeButton) closeButton.focus();
        },

        close: function () {
            var modal = document.getElementById('riki-theme-modal');
            if (!modal || modal.classList.contains('hidden')) return;
            modal.classList.remove('is-open');
            document.body.classList.remove('riki-modal-open');
            setTimeout(function () {
                if (!modal.classList.contains('is-open')) modal.classList.add('hidden');
            }, 220);
        },

        toggle: function () {
            var modal = document.getElementById('riki-theme-modal');
            if (modal && !modal.classList.contains('hidden')) this.close();
            else this.open();
        }
    };

    window.Theme = Theme;
    Theme.init();
}());
