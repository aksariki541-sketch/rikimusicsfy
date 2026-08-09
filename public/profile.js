var Profile = {
    render() {
        var el = gid('view-dev');
        if (!el) return;

        var swatches = (typeof Theme !== 'undefined' && Theme.swatchesMarkup)
            ? Theme.swatchesMarkup(true)
            : '';
        var standalone = typeof isStandaloneApp !== 'undefined' && isStandaloneApp;
        var serviceWorkerText = 'serviceWorker' in navigator ? 'Ready' : 'Tidak didukung';

        el.innerHTML = `
        <div class="riki-topbar pt-7 pb-4 px-4 sticky top-0 z-30 border-b shadow-2xl transition-all relative" style="background: linear-gradient(180deg, rgba(8, 9, 13, 0.4) 0%, rgba(8, 9, 13, 0.75) 100%), url('/banner.png') center/cover no-repeat;">
            <div class="flex items-center justify-between gap-3">
                <div>
                    <p class="riki-eyebrow">RIKI // PROFILE</p>
                    <h1 class="text-2xl font-black text-white tracking-tight mt-1">My digital universe</h1>
                </div>
                <button onclick="Theme.open()" class="riki-icon-button" title="Ubah warna" aria-label="Ubah warna tema">
                    <i data-lucide="palette" class="w-4 h-4"></i>
                </button>
            </div>
        </div>

        <main class="riki-profile-wrap">
            <section class="riki-profile-hero">
                <div class="riki-profile-content">
                    <div class="riki-profile-photo">
                        <img src="/profile.jpg" alt="Foto profil Riki" onerror="this.onerror=null;this.src='/logo.png';" />
                    </div>
                    <div class="min-w-0">
                        <p class="riki-eyebrow">HELLO, I'M</p>
                        <h2 class="riki-profile-name">RIKI<span>.</span></h2>
                        <p class="riki-profile-bio">A place for the tracks, moods, and late-night ideas that make up my little world on the internet.</p>
                    </div>
                </div>
                <div class="riki-profile-stats" aria-label="Ringkasan Riki">
                    <div class="riki-profile-stat"><strong>01</strong><span>Universe</span></div>
                    <div class="riki-profile-stat"><strong>10</strong><span>Neon themes</span></div>
                    <div class="riki-profile-stat"><strong>∞</strong><span>Good vibes</span></div>
                </div>
            </section>

            <div class="riki-profile-grid">
                <section class="riki-panel riki-panel-theme">
                    <div class="riki-panel-head">
                        <div>
                            <p class="riki-eyebrow">PERSONALIZE</p>
                            <h3 class="riki-panel-title"><i data-lucide="sparkles" class="w-4 h-4"></i> Choose your pulse</h3>
                        </div>
                        <button onclick="Theme.open()" class="riki-panel-tag hover:opacity-80" type="button">View all<br>colors ↗</button>
                    </div>
                    <div class="riki-palette-grid riki-profile-palette">${swatches}</div>
                    <div class="flex items-center gap-2 mt-3 text-[11px] text-white/55">
                        <span class="riki-status-dot"></span>
                        <span>ACTIVE: <strong class="text-white/90" data-riki-theme-label></strong></span>
                    </div>
                </section>

                <section class="riki-panel">
                    <div class="riki-panel-head">
                        <div>
                            <p class="riki-eyebrow">THE APP</p>
                            <h3 class="riki-panel-title"><i data-lucide="radio" class="w-4 h-4"></i> RIKI Music</h3>
                        </div>
                        <span class="riki-panel-tag">v3.0</span>
                    </div>
                    <div class="riki-info-row">
                        <span class="riki-info-label">Offline mode</span>
                        <span class="riki-info-value"><span class="riki-status-dot"></span> Ready</span>
                    </div>
                    <div class="riki-info-row">
                        <span class="riki-info-label">Service worker</span>
                        <span class="riki-info-value">${serviceWorkerText}</span>
                    </div>
                    <div class="riki-info-row">
                        <span class="riki-info-label">Saved cache</span>
                        <button onclick="if(typeof clearPwaCache==='function') clearPwaCache();" class="riki-info-value hover:text-white underline decoration-white/25 underline-offset-4">Clear</button>
                    </div>
                </section>

                <section class="riki-panel">
                    <div class="riki-panel-head">
                        <div>
                            <p class="riki-eyebrow">NOW PLAYING</p>
                            <h3 class="riki-panel-title"><i data-lucide="heart" class="w-4 h-4"></i> Made for your mood</h3>
                        </div>
                        <span class="riki-panel-tag">Always on</span>
                    </div>
                    <p class="text-[12px] leading-relaxed text-white/65">Search, save, and come back to the tracks that feel like yours. The universe stays in sync with your chosen glow.</p>
                </section>
            </div>

            <div class="riki-profile-actions">
                <button id="pwa-install-btn" onclick="installPWA()" class="${standalone ? 'hidden ' : ''}riki-action-primary font-bold rounded-xl active:scale-95 transition-all text-center flex items-center justify-center gap-2">
                    <i data-lucide="download" class="w-4 h-4"></i> Install app
                </button>
                <a href="https://protofolioriki.my.id" target="_blank" rel="noopener noreferrer" class="btn-chrome font-bold rounded-xl active:scale-95 transition-all text-center flex items-center justify-center gap-2">
                    <i data-lucide="orbit" class="w-4 h-4"></i> Visit portfolio
                </a>
            </div>
        </main>`;

        if (typeof Theme !== 'undefined' && Theme.apply) Theme.apply(Theme.current, false);
        lucide.createIcons();
    }
};

var Dev = Profile;
