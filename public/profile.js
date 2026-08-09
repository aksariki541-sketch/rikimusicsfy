var Profile = {
    render() {
        var el = gid('view-dev');
        if (!el) return;

        var swatches = (typeof Theme !== 'undefined' && Theme.swatchesMarkup) ? Theme.swatchesMarkup(true) : '';
        var standalone = typeof isStandaloneApp !== 'undefined' && isStandaloneApp;

        el.innerHTML = `
        <div class="riki-topbar pt-[max(1.6rem,env(safe-area-inset-top))] pb-3 px-4 sticky top-0 z-30 border-b">
            <div class="flex items-center justify-between gap-3">
                <div>
                    <p class="riki-eyebrow">RIKI // PROFILE</p>
                    <h1 class="text-[1.35rem] font-black tracking-tight mt-1">My digital universe</h1>
                </div>
                <button onclick="Theme.open()" class="riki-icon-button w-9 h-9 rounded-full" aria-label="Tema"><i data-lucide="palette" class="w-4 h-4"></i></button>
            </div>
        </div>

        <main class="max-w-[42rem] mx-auto px-4 pb-32 pt-5 space-y-4">
            <!-- Hero like portfolio -->
            <section class="rounded-[1.2rem] border border-white/10 bg-[#0e0e12] p-4 relative overflow-hidden">
                <div class="absolute top-0 right-0 w-40 h-40 border border-white/[0.05] rounded-full translate-x-16 -translate-y-16 pointer-events-none"></div>
                <div class="flex gap-3.5 items-start relative z-10">
                    <div class="w-[68px] h-[68px] rounded-full overflow-hidden border border-white/15 bg-[#15151a] shrink-0">
                        <img src="/profile.jpg" alt="Riki PP" class="w-full h-full object-cover" />
                    </div>
                    <div class="min-w-0 flex-1">
                        <p class="riki-eyebrow">HELLO, I'M</p>
                        <h2 class="text-[1.9rem] font-black tracking-tight leading-[0.9] mt-1">RIKI<span class="text-white/20">.</span></h2>
                        <p class="text-[11px] text-white/60 mt-2 leading-relaxed max-w-[32ch]">14 years old student from SMP Negeri 4 Sigi. Exploring code, design, technology, AI, and digital creativity. This is my little world.</p>
                        <div class="flex gap-1.5 mt-3">
                            <span class="text-[10px] px-2.5 py-1 rounded-full bg-white text-black font-bold">ICON = PP</span>
                            <span class="text-[10px] px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-white/60 font-mono">PORTFOLIO EDITION</span>
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-3 gap-2 mt-4">
                    <div class="rounded-xl bg-white/[0.04] border border-white/10 p-2.5"><p class="font-mono text-[11px] font-bold text-white">01</p><p class="text-[9px] uppercase tracking-wide text-white/50 mt-1">Universe</p></div>
                    <div class="rounded-xl bg-white/[0.04] border border-white/10 p-2.5"><p class="font-mono text-[11px] font-bold text-white">PP</p><p class="text-[9px] uppercase tracking-wide text-white/50 mt-1">Icon</p></div>
                    <div class="rounded-xl bg-white/[0.04] border border-white/10 p-2.5"><p class="font-mono text-[11px] font-bold text-white">∞</p><p class="text-[9px] uppercase tracking-wide text-white/50 mt-1">Ideas</p></div>
                </div>
            </section>

            <!-- Portfolio link -->
            <section class="rounded-xl border border-white/10 bg-[#0e0e12] p-3.5 flex items-center justify-between gap-3">
                <div class="flex items-center gap-2.5 min-w-0">
                    <div class="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center"><i data-lucide="orbit" class="w-4 h-4 text-white/70"></i></div>
                    <div class="min-w-0">
                        <p class="text-xs font-bold text-white leading-tight">protofolioriki.my.id</p>
                        <p class="text-[10px] text-white/50 font-mono">My digital world</p>
                    </div>
                </div>
                <a href="https://protofolioriki.my.id" target="_blank" rel="noopener noreferrer" class="px-3.5 py-1.5 rounded-full bg-white text-black text-[11px] font-bold shrink-0">Visit ↗</a>
            </section>

            <!-- Theme quick -->
            <section class="rounded-xl border border-white/10 bg-[#0e0e12] p-3.5">
                <div class="flex justify-between items-start mb-3">
                    <div><p class="riki-eyebrow">PERSONALIZE</p><h3 class="text-xs font-bold text-white mt-1 flex items-center gap-1.5"><i data-lucide="sparkles" class="w-3.5 h-3.5"></i> Choose your pulse</h3></div>
                    <button onclick="Theme.open()" class="text-[10px] font-mono uppercase text-white/50 hover:text-white">View all ↗</button>
                </div>
                <div class="grid grid-cols-8 gap-1.5">${swatches}</div>
                <div class="flex items-center gap-1.5 mt-2.5 text-[10px] text-white/40 font-mono"><span class="w-1.5 h-1.5 rounded-full bg-white"></span> ACTIVE: <b class="text-white/80" data-riki-theme-label></b> • ICON: <b class="text-white">profile.jpg</b></div>
            </section>

            <!-- App info -->
            <section class="rounded-xl border border-white/10 bg-[#0e0e12] p-3.5">
                <div class="flex justify-between items-start mb-3">
                    <div><p class="riki-eyebrow">THE APP</p><h3 class="text-xs font-bold text-white mt-1">RIKI Music</h3></div>
                    <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-white/60">v3.1 PORTFOLIO</span>
                </div>
                <div class="space-y-0 text-[11px]">
                    <div class="flex justify-between py-2.5 border-t border-white/10"><span class="text-white/50">Icon sumber</span><span class="font-bold text-white flex items-center gap-1.5"><img src="/profile.jpg" class="w-4 h-4 rounded-full border border-white/20" /> profile.jpg</span></div>
                    <div class="flex justify-between py-2.5 border-t border-white/10"><span class="text-white/50">Desain</span><span class="text-white">Portfolio like</span></div>
                    <div class="flex justify-between py-2.5 border-t border-white/10"><span class="text-white/50">Animasi</span><span class="text-white flex items-center gap-1"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Optimized 60fps</span></div>
                    <div class="flex justify-between py-2.5 border-t border-white/10"><span class="text-white/50">Cache</span><button onclick="if(typeof clearPwaCache==='function') clearPwaCache();" class="text-white underline decoration-white/20 underline-offset-4">Clear</button></div>
                </div>
            </section>

            <div class="grid grid-cols-2 gap-2">
                <button id="pwa-install-btn" onclick="installPWA()" class="${standalone ? 'hidden ' : ''}h-[2.7rem] bg-white text-black font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 active:scale-95"><i data-lucide="download" class="w-4 h-4"></i> Install app</button>
                <a href="https://protofolioriki.my.id" target="_blank" class="h-[2.7rem] bg-white/10 border border-white/10 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 active:scale-95"><i data-lucide="external-link" class="w-4 h-4"></i> Portfolio</a>
            </div>

            <p class="text-center text-[10px] text-white/30 font-mono pt-2">RIKI • Digital Sound Universe • Icon = PP • Portfolio Edition</p>
        </main>`;

        if (typeof Theme !== 'undefined' && Theme.apply) Theme.apply(Theme.current, false);
        lucide.createIcons();
    }
};
var Dev = Profile;
