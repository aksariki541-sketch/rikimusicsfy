// ===== TEMA WARNA (10 pilihan) =====
// Fitur ganti warna tema aplikasi. Tersimpan di localStorage, tidak mengubah fungsi lain.
var APP_THEMES = [
    { id: 'default', name: 'Monokrom', accent: '#9ca3af', swatch: 'linear-gradient(135deg,#e5e7eb,#4b5563)', meta: '#050507' },
    { id: 'blue',    name: 'Biru',     accent: '#3b82f6', swatch: 'linear-gradient(135deg,#60a5fa,#1d4ed8)', meta: '#070a12' },
    { id: 'red',     name: 'Merah',    accent: '#ef4444', swatch: 'linear-gradient(135deg,#f87171,#b91c1c)', meta: '#130809' },
    { id: 'green',   name: 'Hijau',    accent: '#22c55e', swatch: 'linear-gradient(135deg,#4ade80,#15803d)', meta: '#07120b' },
    { id: 'purple',  name: 'Ungu',     accent: '#a855f7', swatch: 'linear-gradient(135deg,#c084fc,#7e22ce)', meta: '#0e0716' },
    { id: 'pink',    name: 'Pink',     accent: '#ec4899', swatch: 'linear-gradient(135deg,#f472b6,#be185d)', meta: '#150812' },
    { id: 'orange',  name: 'Oranye',   accent: '#f97316', swatch: 'linear-gradient(135deg,#fb923c,#c2410c)', meta: '#140b06' },
    { id: 'gold',    name: 'Emas',     accent: '#eab308', swatch: 'linear-gradient(135deg,#fde047,#a16207)', meta: '#120f05' },
    { id: 'cyan',    name: 'Cyan',     accent: '#06b6d4', swatch: 'linear-gradient(135deg,#22d3ee,#0e7490)', meta: '#051114' },
    { id: 'teal',    name: 'Tosca',    accent: '#14b8a6', swatch: 'linear-gradient(135deg,#2dd4bf,#0f766e)', meta: '#051210' }
];
var THEME_STORAGE_KEY = 'app_theme';

function getThemeById(id) {
    for (var i = 0; i < APP_THEMES.length; i++) { if (APP_THEMES[i].id === id) return APP_THEMES[i]; }
    return APP_THEMES[0];
}

function getAppTheme() {
    try { return localStorage.getItem(THEME_STORAGE_KEY) || 'default'; } catch (e) { return 'default'; }
}

function applyAppTheme(id, silent) {
    var theme = getThemeById(id);
    var root = document.documentElement;
    if (theme.id === 'default') root.removeAttribute('data-theme');
    else root.setAttribute('data-theme', theme.id);
    try { localStorage.setItem(THEME_STORAGE_KEY, theme.id); } catch (e) {}
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme.meta);
    updateThemePickerActive(theme.id);
    if (!silent && typeof showToast === 'function') showToast('Warna tema: ' + theme.name);
}

function updateThemePickerActive(id) {
    var btns = document.querySelectorAll('[data-theme-btn]');
    for (var i = 0; i < btns.length; i++) {
        var b = btns[i];
        var active = b.getAttribute('data-theme-btn') === id;
        b.className = 'theme-swatch relative w-10 h-10 rounded-full border transition-all duration-200 active:scale-90 shadow-lg ' +
            (active ? 'border-white ring-2 ring-white/80 scale-105' : 'border-white/25 opacity-75 hover:opacity-100 hover:scale-105');
        var chk = b.querySelector('.theme-check');
        if (chk) chk.style.display = active ? 'flex' : 'none';
    }
    var label = document.querySelector('#theme-picker-card .theme-active-name');
    if (label) label.textContent = getThemeById(id).name;
}

function injectThemePicker() {
    var view = document.getElementById('view-dev');
    if (!view) return;
    if (view.querySelector('#theme-picker-card')) { updateThemePickerActive(getAppTheme()); return; }
    var container = view.querySelector('.pt-6.px-4');
    if (!container) return;
    var current = getAppTheme();
    var html = '<div id="theme-picker-card" class="glass rounded-2xl p-5 max-w-sm mx-auto text-left mb-6">' +
        '<h3 class="text-white font-bold text-sm uppercase tracking-wider mb-3 flex items-center gap-2 border-b border-white/10 pb-2">' +
        '<i data-lucide="palette" class="w-4 h-4 text-rose-400"></i> Warna Tema' +
        '</h3>' +
        '<div class="flex flex-wrap gap-2.5 justify-center">';
    for (var i = 0; i < APP_THEMES.length; i++) {
        var t = APP_THEMES[i];
        html += '<button type="button" data-theme-btn="' + t.id + '" title="' + t.name + '" aria-label="' + t.name + '" onclick="applyAppTheme(\'' + t.id + '\')" class="theme-swatch relative w-10 h-10 rounded-full border transition-all duration-200 active:scale-90 shadow-lg ' + (t.id === current ? 'border-white ring-2 ring-white/80 scale-105' : 'border-white/25 opacity-75 hover:opacity-100 hover:scale-105') + '" style="background:' + t.swatch + '">' +
            '<span class="theme-check absolute inset-0 items-center justify-center text-white" style="display:' + (t.id === current ? 'flex' : 'none') + '">' +
            '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="filter:drop-shadow(0 1px 2px rgba(0,0,0,0.6))"><path d="M20 6 9 17l-5-5"/></svg>' +
            '</span></button>';
    }
    html += '</div>' +
        '<p class="text-center text-white/50 text-[11px] mt-3 font-medium">Tema aktif: <span class="theme-active-name text-white/80 font-bold">' + getThemeById(current).name + '</span></p>' +
        '</div>';
    var wrap = document.createElement('div');
    wrap.innerHTML = html;
    var card = wrap.firstElementChild;
    var firstGlass = container.querySelector('.glass');
    if (firstGlass) container.insertBefore(card, firstGlass);
    else container.appendChild(card);
    if (window.lucide && typeof lucide.createIcons === 'function') { try { lucide.createIcons(); } catch (e) {} }
}

// Hook ke Profile.render tanpa mengubah isi profile.js
if (typeof Profile !== 'undefined' && Profile && typeof Profile.render === 'function' && !Profile.__themeHooked) {
    Profile.__themeHooked = true;
    var __origProfileRender = Profile.render.bind(Profile);
    Profile.render = function () {
        __origProfileRender();
        try { injectThemePicker(); } catch (e) {}
    };
}

// Terapkan tema tersimpan saat load & isi picker bila profil sudah dirender
try { applyAppTheme(getAppTheme(), true); } catch (e) {}
try { injectThemePicker(); } catch (e) {}
