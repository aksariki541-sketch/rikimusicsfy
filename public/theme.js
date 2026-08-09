/* RIKI // Portfolio Theme Controller - Optimized
 * Monochrome default like protofolioriki.my.id, PP as icon
 */
(function () {
    'use strict';

    var STORAGE_KEY = 'riki_theme';
    var DEFAULT_THEME = 'mono'; // portfolio monochrome
    var PALETTES = [
        { id: 'mono', name: 'Mono — Portfolio', primary: '#ffffff', secondary: '#9aa0af', rgb: '255 255 255', secondaryRgb: '154 160 175' },
        { id: 'cosmic-cyan', name: 'Cosmic Cyan', primary: '#30e5ff', secondary: '#e5f8ff', rgb: '48 229 255', secondaryRgb: '229 248 255' },
        { id: 'ultraviolet', name: 'Ultraviolet', primary: '#b18cff', secondary: '#f0e6ff', rgb: '177 140 255', secondaryRgb: '240 230 255' },
        { id: 'laser-lime', name: 'Laser Lime', primary: '#d4ff32', secondary: '#f2ffcc', rgb: '212 255 50', secondaryRgb: '242 255 204' },
        { id: 'hot-pink', name: 'Hot Pink', primary: '#ff7acc', secondary: '#ffe6f3', rgb: '255 122 204', secondaryRgb: '255 230 243' },
        { id: 'aurora', name: 'Aurora', primary: '#7cffb2', secondary: '#e6fff0', rgb: '124 255 178', secondaryRgb: '230 255 240' },
        { id: 'cobalt', name: 'Cobalt', primary: '#7aa2ff', secondary: '#e3eaff', rgb: '122 162 255', secondaryRgb: '227 234 255' },
        { id: 'arctic', name: 'Arctic Ice', primary: '#e8f6ff', secondary: '#ffffff', rgb: '232 246 255', secondaryRgb: '255 255 255' }
    ];

    function getPalette(id) {
        return PALETTES.find(function (p) { return p.id === id; }) || PALETTES[0];
    }
    function getSavedTheme() {
        try { return localStorage.getItem(STORAGE_KEY) || DEFAULT_THEME; } catch(e){ return DEFAULT_THEME; }
    }
    function iconMarkup(name, cls){
        return '<i data-lucide="'+name+'" class="'+(cls||'w-4 h-4')+'"></i>';
    }

    var Theme = {
        palettes: PALETTES,
        current: getSavedTheme(),
        initialized: false,

        init: function(){
            if(this.initialized) return;
            this.initialized=true;
            document.documentElement.classList.add('riki-experience');
            this.apply(this.current, false);
        },

        apply: function(id, persist){
            var palette = getPalette(id);
            var root = document.documentElement;
            this.current = palette.id;
            root.dataset.rikiTheme = palette.id;
            root.style.setProperty('--riki-accent', palette.primary);
            root.style.setProperty('--riki-accent-2', palette.secondary);
            root.style.setProperty('--riki-accent-rgb', palette.rgb);
            root.style.setProperty('--riki-accent-2-rgb', palette.secondaryRgb);
            root.style.setProperty('--riki-accent-contrast', (palette.id==='laser-lime'||palette.id==='mono'||palette.id==='arctic') ? '#050507' : '#f7fbff');

            // Keep theme-color dark like portfolio, not neon - prevents address bar flash
            var themeMeta = document.querySelector('meta[name="theme-color"]');
            if(themeMeta) themeMeta.setAttribute('content', '#050507');

            document.querySelectorAll('[data-riki-theme]').forEach(function(ctrl){
                var active = ctrl.getAttribute('data-riki-theme')===palette.id;
                ctrl.classList.toggle('is-selected', active);
                ctrl.setAttribute('aria-pressed', active ? 'true' : 'false');
            });
            document.querySelectorAll('[data-riki-theme-label]').forEach(function(n){ n.textContent = palette.name; });

            if(persist!==false){
                try{ localStorage.setItem(STORAGE_KEY, palette.id); }catch(e){}
            }
            // Update favicon to PP - always PP as icon
            try{
                var links = document.querySelectorAll("link[rel*='icon']");
                links.forEach(function(l){
                    if(l.getAttribute('href') && l.getAttribute('href').includes('profile')){
                        // keep
                    }
                });
            }catch(e){}
        },

        set: function(id){
            var palette = getPalette(id);
            this.apply(palette.id, true);
            if(typeof window.showToast==='function') window.showToast('Tema '+palette.name+' aktif');
            if(window.lucide&&typeof window.lucide.createIcons==='function') window.lucide.createIcons();
        },

        swatchesMarkup: function(compact){
            var current=this.current;
            return PALETTES.map(function(p){
                var selected=p.id===current;
                return '<button type="button" class="riki-palette-option'+(selected?' is-selected':'')+'" '+
                    'data-riki-theme="'+p.id+'" aria-label="Pilih tema '+p.name+'" aria-pressed="'+(selected?'true':'false')+'" '+
                    'onclick="Theme.set(\''+p.id+'\')" style="--palette-primary:'+p.primary+';--palette-secondary:'+p.secondary+';">'+
                    '<span class="riki-palette-orb" aria-hidden="true"></span>'+
                    (compact ? '' : '<span class="riki-palette-name">'+p.name+'</span>')+
                    '<span class="riki-palette-check" aria-hidden="true">✓</span>'+
                    '</button>';
            }).join('');
        },

        mount: function(){
            if(document.getElementById('riki-theme-modal')) return;
            var modal=document.createElement('div');
            modal.id='riki-theme-modal';
            modal.className='riki-theme-modal hidden';
            modal.setAttribute('role','dialog');
            modal.setAttribute('aria-modal','true');
            modal.setAttribute('aria-labelledby','riki-theme-modal-title');
            modal.innerHTML=
                '<button class="riki-theme-backdrop" aria-label="Tutup pemilih warna" onclick="Theme.close()"></button>'+
                '<section class="riki-theme-sheet" role="document">'+
                    '<div class="riki-theme-sheet-header">'+
                        '<div>'+
                            '<p class="riki-eyebrow">RIKI // DIGITAL UNIVERSE</p>'+
                            '<h2 id="riki-theme-modal-title">Choose your pulse</h2>'+
                            '<p class="riki-theme-description">Portfolio monochrome sebagai default. Ikon = foto profilmu.</p>'+
                        '</div>'+
                        '<button type="button" class="riki-close-button" aria-label="Tutup" onclick="Theme.close()">'+iconMarkup('x','w-5 h-5')+'</button>'+
                    '</div>'+
                    '<div class="riki-palette-grid">'+this.swatchesMarkup(false)+'</div>'+
                    '<div class="riki-theme-sheet-footer"><span class="riki-live-dot"></span><span>ACTIVE: <strong data-riki-theme-label></strong> • ICON: PP</span></div>'+
                '</section>';
            document.body.appendChild(modal);
            document.addEventListener('keydown', function(e){ if(e.key==='Escape') Theme.close(); });
            if(window.lucide&&typeof window.lucide.createIcons==='function') window.lucide.createIcons();
            this.apply(this.current,false);
        },

        open: function(){
            this.mount();
            var modal=document.getElementById('riki-theme-modal');
            if(!modal) return;
            modal.classList.remove('hidden');
            requestAnimationFrame(function(){ modal.classList.add('is-open'); });
            document.body.classList.add('riki-modal-open');
            var cb=modal.querySelector('.riki-close-button');
            if(cb) cb.focus();
        },

        close: function(){
            var modal=document.getElementById('riki-theme-modal');
            if(!modal||modal.classList.contains('hidden')) return;
            modal.classList.remove('is-open');
            document.body.classList.remove('riki-modal-open');
            setTimeout(function(){ if(!modal.classList.contains('is-open')) modal.classList.add('hidden'); }, 180);
        },

        toggle: function(){
            var modal=document.getElementById('riki-theme-modal');
            if(modal&&!modal.classList.contains('hidden')) this.close();
            else this.open();
        }
    };

    window.Theme=Theme;
    Theme.init();
}());
