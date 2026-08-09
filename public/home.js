var Home = {
    activeCategory: null,
    categories: [
        { name: 'Semua' },
        { name: 'Riki World', icon: 'code' },
        { name: 'Chill', icon: 'coffee' },
        { name: 'Focus', icon: 'brain' },
        { name: 'Commute', icon: 'car' },
        { name: 'Gaming', icon: 'gamepad-2' },
        { name: 'Energize', icon: 'zap' },
        { name: 'Party', icon: 'party-popper' },
        { name: 'Romance', icon: 'heart' },
        { name: 'Sad', icon: 'cloud-rain' },
        { name: 'Pop', icon: 'music' },
        { name: 'Acoustic', icon: 'guitar' }
    ],

    render() {
        var chipsHtml = Home.categories.map(function(c){
            var isActive = (Home.activeCategory === c.name) || (!Home.activeCategory && c.name === 'Semua');
            return '<button onclick="Home.selectCategory(\''+c.name+'\')" class="home-chip-btn px-3.5 py-1.8 rounded-full text-[11px] whitespace-nowrap flex items-center gap-1.5 cursor-pointer shrink-0 border transition-all duration-200 will-change-transform '+
                (isActive ? 'bg-white text-black border-white font-bold scale-[1.02]' : 'bg-white/[0.06] text-white/70 border-white/10 hover:border-white/20 hover:text-white')+'">'+
                (c.icon ? '<i data-lucide="'+c.icon+'" class="w-3 h-3"></i>' : '')+'<span>'+es(c.name)+'</span></button>';
        }).join('');

        gid('view-home').innerHTML = `
        <div class="riki-topbar pt-[max(1.6rem,env(safe-area-inset-top))] pb-3.5 px-4 sticky top-0 z-30 border-b relative">
            <div class="flex justify-between items-center gap-3 mb-3">
                <div class="riki-brand-row min-w-0 flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 shadow-[0_0_0_4px_rgba(255,255,255,0.06)] bg-white/10 shrink-0 relative flex items-center justify-center">
                        <span class="text-white font-bold text-sm select-none">R</span>
                        <img src="/profile.jpg" alt="PP" class="absolute inset-0 w-full h-full object-cover z-10" onerror="handlePPError(this)" />
                    </div>
                    <div class="min-w-0">
                        <p class="riki-eyebrow text-[9px] leading-none">RIKI // DIGITAL UNIVERSE</p>
                        <h1 class="riki-brand-name text-[1.45rem] font-extrabold tracking-tight leading-none mt-1">RIKI<span>.</span></h1>
                        <p class="text-[10px] text-white/50 font-mono tracking-tight mt-0.5">ICON = PP • Portfolio</p>
                    </div>
                </div>
                <div class="flex items-center gap-1.5 shrink-0">
                    <button onclick="App.switch('search')" class="riki-icon-button w-9 h-9 rounded-full" aria-label="Search"><i data-lucide="search" class="w-4 h-4"></i></button>
                    <button onclick="Theme.open()" class="riki-icon-button w-9 h-9 rounded-full" aria-label="Theme"><i data-lucide="palette" class="w-4 h-4"></i></button>
                    <button onclick="App.switch('dev')" class="riki-icon-button w-9 h-9 rounded-full overflow-hidden p-0 border-white/15 relative flex items-center justify-center bg-white/10" aria-label="Profile">
                        <span class="text-white font-bold text-xs select-none">R</span>
                        <img src="/profile.jpg" alt="PP" class="absolute inset-0 w-full h-full object-cover z-10" onerror="handlePPError(this)" />
                    </button>
                </div>
            </div>
            <!-- Category - portfolio style, single line scroll, no blur -->
            <div id="home-category-bar" class="flex gap-1.5 overflow-x-auto hide-scrollbar -mx-4 px-4 py-0.5 scroll-smooth">
                ${chipsHtml}
            </div>
        </div>

        <div class="px-4 mt-5" id="home-main-content">
            <div id="home-default-view">
                <div class="space-y-8">
                    <!-- Intro like portfolio -->
                    <div class="relative rounded-[1.2rem] border border-white/[0.08] bg-[#0e0e12] p-4 overflow-hidden">
                        <div class="absolute top-0 right-0 w-32 h-32 border border-white/[0.06] rounded-full translate-x-10 -translate-y-10 pointer-events-none"></div>
                        <p class="riki-eyebrow mb-1.5">HELLO, I'M</p>
                        <h2 class="text-[1.75rem] font-black tracking-tight leading-[0.9]">RIKI AKSA<span class="text-white/30">.</span></h2>
                        <p class="text-[11px] text-white/55 mt-1.5 leading-relaxed font-normal max-w-[36ch]">Exploring code, design, technology, AI, and digital sound. Welcome to my universe.</p>
                        <div class="mt-3 flex gap-2">
                            <span class="text-[10px] px-2.5 py-1 rounded-full bg-white text-black font-bold">14 YO</span>
                            <span class="text-[10px] px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-white/70 font-mono tracking-wide">SMP 4 SIGI • ∞ IDEAS</span>
                        </div>
                    </div>

                    <div>
                        <div class="flex items-end justify-between mb-3">
                            <div>
                                <p class="riki-eyebrow">LIVE CREATIONS</p>
                                <h2 class="text-[15px] font-bold tracking-tight text-white mt-0.5 flex items-center gap-1.5">Quick Picks <span class="text-white/30 font-normal text-[11px]">• Things I've shipped</span></h2>
                            </div>
                        </div>
                        <div id="home-grid" class="grid grid-cols-1 sm:grid-cols-2 gap-2"></div>
                    </div>

                    <div>
                        <div class="flex items-end justify-between mb-3">
                            <div>
                                <p class="riki-eyebrow">MY WORLD</p>
                                <h2 class="text-[15px] font-bold tracking-tight text-white mt-0.5">Popular Playlists</h2>
                            </div>
                        </div>
                        <div id="home-scroll" class="flex gap-2.5 overflow-x-auto hide-scrollbar pb-1"></div>
                    </div>

                    <div>
                        <div class="flex items-end justify-between mb-3">
                            <div>
                                <p class="riki-eyebrow">PART OF JOURNEY</p>
                                <h2 class="text-[15px] font-bold tracking-tight text-white mt-0.5">Top Artists</h2>
                            </div>
                        </div>
                        <div id="home-artists" class="flex gap-2.5 overflow-x-auto hide-scrollbar pb-1"></div>
                    </div>
                </div>
            </div>
            <div id="home-category-view" style="display:none;"></div>
        </div>`;

        lucide.createIcons();

        if (Home.activeCategory && Home.activeCategory !== 'Semua') {
            if (Home.activeCategory === 'Riki World') Home.renderDeveloperProfileView();
            else Home.displayCategoryView();
        } else {
            var defView = gid('home-default-view'), catView = gid('home-category-view');
            if (defView) defView.style.display = 'block';
            if (catView) catView.style.display = 'none';
            if (S.ht && S.ht.length > 0) Home.show();
            else { Home.showSkeleton(); Home.fetch(); }
        }
    },

    selectCategory(catName){
        if (Home.activeCategory === catName && catName !== 'Semua') catName = 'Semua';
        if (!catName || catName === 'Semua'){
            Home.activeCategory = null;
            var bar=gid('home-category-bar');
            if(bar){
                bar.querySelectorAll('.home-chip-btn').forEach(function(btn,i){
                    var c=Home.categories[i];
                    var isAct=c&&c.name==='Semua';
                    btn.className = 'home-chip-btn px-3.5 py-1.8 rounded-full text-[11px] whitespace-nowrap flex items-center gap-1.5 cursor-pointer shrink-0 border transition-all duration-200 '+
                        (isAct ? 'bg-white text-black border-white font-bold scale-[1.02]' : 'bg-white/[0.06] text-white/70 border-white/10 hover:border-white/20');
                });
            }
            var defView=gid('home-default-view'), catView=gid('home-category-view');
            if(defView) defView.style.display='block';
            if(catView) catView.style.display='none';
            if(!S.ht||S.ht.length===0) Home.fetch(); else Home.show();
            return;
        }
        Home.activeCategory=catName;
        var bar=gid('home-category-bar');
        if(bar){
            bar.querySelectorAll('.home-chip-btn').forEach(function(btn,i){
                var c=Home.categories[i];
                var isAct=c&&c.name===catName;
                btn.className='home-chip-btn px-3.5 py-1.8 rounded-full text-[11px] whitespace-nowrap flex items-center gap-1.5 cursor-pointer shrink-0 border transition-all duration-200 '+
                    (isAct ? 'bg-white text-black border-white font-bold scale-[1.02]' : 'bg-white/[0.06] text-white/70 border-white/10 hover:border-white/20');
            });
        }
        Home.fetchCategoryData(catName);
    },

    async fetchCategoryData(catName){
        var defView=gid('home-default-view'), catView=gid('home-category-view');
        if(defView) defView.style.display='none';
        if(catView){
            catView.style.display='block';
            catView.innerHTML=`<div class="mb-4 flex justify-between items-center bg-white/[0.04] p-3 rounded-xl border border-white/10"><div class="flex items-center gap-2"><span class="text-[10px] text-white/50 font-mono uppercase">Kategori:</span><span class="font-bold text-xs text-white">${es(catName)}</span></div><button onclick="Home.selectCategory('Semua')" class="text-[11px] px-3 py-1 rounded-full bg-white/10 text-white/60">Reset</button></div><div class="text-center py-14"><div class="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-3"></div><p class="text-[11px] text-white/50 font-mono">Memuat ${es(catName)}...</p></div>`;
            lucide.createIcons();
        }
        if(catName==='Riki World'){
            try{
                var r=await fetch(API.search+'?query='+encodeURIComponent('XXXTENTACION')+'&type=all');
                var d=await r.json();
                if(d.status&&d.result){
                    S.hc=d.result.songs ? d.result.songs.map(function(s){return{id:s.videoId,videoId:s.videoId,title:cn(s.title),artist:cn(s.artist),artistId:s.artistId||'',cover:toHDCover(s.thumbnail,s.videoId),ytUrl:s.url};}):[];
                    S.hcp=[].concat(d.result.albums||[]).concat(d.result.playlists||[]);
                } else { S.hc=[]; S.hcp=[]; }
            }catch(e){ S.hc=[]; S.hcp=[]; }
            Home.renderDeveloperProfileView();
            return;
        }
        var query=catName+' Music hits';
        try{
            var r=await fetch(API.search+'?query='+encodeURIComponent(query)+'&type=all');
            var d=await r.json();
            if(d.status){
                S.hc=d.result.songs ? d.result.songs.map(function(s){return{id:s.videoId,videoId:s.videoId,title:cn(s.title),artist:cn(s.artist),artistId:s.artistId||'',cover:toHDCover(s.thumbnail,s.videoId),ytUrl:s.url};}):[];
                S.hcp=[].concat(d.result.playlists||[]).concat(d.result.albums||[]);
                S.hca=d.result.artists||[];
            }
        }catch(e){ S.hc=[]; S.hcp=[]; S.hca=[]; }
        Home.displayCategoryView();
    },

    renderDeveloperProfileView(){
        var defView=gid('home-default-view'), catView=gid('home-category-view');
        if(defView) defView.style.display='none';
        if(catView) catView.style.display='block';
        if(!catView) return;
        var songsHtml='';
        if(S.hc&&S.hc.length>0){
            songsHtml=S.hc.map(function(t,i){
                var isCur=S.ct&&((S.ct.id===t.id)||(S.ct.videoId===t.id)||(S.ct.title===t.title&&S.ct.artist===t.artist));
                var isPlay=isCur&&S.ip; var isLoad=isCur&&S.il;
                var icon=isLoad?'<div class="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>': isPlay?'<div class="flex gap-[2px]"><span class="w-[2px] h-3 bg-black rounded-full animate-eq-1"></span><span class="w-[2px] h-3 bg-black rounded-full animate-eq-2"></span><span class="w-[2px] h-3 bg-black rounded-full animate-eq-3"></span></div>':'<i data-lucide="play" class="w-3 h-3 fill-current"></i>';
                var cardBg=isPlay?'bg-white border-white text-black':'bg-[#101015] border-white/10 hover:border-white/15';
                return '<div onclick="PK(\'homecat\','+i+')" class="home-cat-card group '+cardBg+' rounded-xl flex items-center gap-3 p-2.5 cursor-pointer active:scale-[0.98] transition-all border"><img src="'+t.cover+'" class="w-11 h-11 rounded-lg object-cover border border-white/10" onerror="this.src=\''+FI+'\'" /><div class="min-w-0 flex-1"><h3 class="font-semibold text-xs truncate '+(isPlay?'text-black':'text-white')+'">'+es(t.title)+'</h3><p class="text-[10px] truncate '+(isPlay?'text-black/60':'text-white/50')+'">'+es(t.artist)+'</p></div><div class="w-7 h-7 rounded-full '+(isPlay?'bg-black text-white':'bg-white/10 text-white')+' flex items-center justify-center shrink-0">'+icon+'</div></div>';
            }).join('');
        } else songsHtml='<p class="text-white/50 text-xs py-4">Memuat...</p>';

        var plistHtml='';
        if(S.hcp&&S.hcp.length>0){
            plistHtml=S.hcp.slice(0,10).map(function(p){
                return '<div onclick="Album.open(\''+p.id+'\', \''+(p.cover||FI)+'\')" class="flex-shrink-0 w-32 cursor-pointer group"><div class="w-full aspect-square rounded-xl overflow-hidden border border-white/10 bg-[#101015] mb-1.5"><img src="'+(p.cover||FI)+'" class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300" /></div><h3 class="font-semibold text-[11px] truncate text-white">'+es(p.title)+'</h3><p class="text-[10px] text-white/50 truncate">'+es(p.artist)+'</p></div>';
            }).join('');
        }

        catView.innerHTML=`<div class="space-y-6 pb-6">
            <div class="rounded-[1.2rem] border border-white/10 bg-[#0e0e12] p-4 relative overflow-hidden">
                <div class="flex gap-3.5 items-start">
                    <img src="/profile.jpg" class="w-16 h-16 rounded-full border border-white/15 object-cover" />
                    <div class="flex-1 min-w-0">
                        <p class="riki-eyebrow">WELCOME TO MY WORLD</p>
                        <h2 class="text-xl font-black tracking-tight leading-none mt-1">RIKI.</h2>
                        <p class="text-[11px] text-white/60 mt-1.5 leading-relaxed">Code, design, technology, and the tracks that make this universe alive.</p>
                        <div class="flex gap-1.5 mt-3 flex-wrap">
                            <a href="https://protofolioriki.my.id" target="_blank" class="px-3 py-1.5 rounded-full bg-white text-black text-[11px] font-bold">Portfolio ↗</a>
                            <button onclick="App.switch('dev')" class="px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-[11px] text-white/70">My Universe</button>
                            <button onclick="Home.selectCategory('Semua')" class="px-3 py-1.5 rounded-full bg-transparent border border-white/10 text-[11px] text-white/50">Reset</button>
                        </div>
                    </div>
                </div>
            </div>
            <div><p class="riki-eyebrow mb-2">LAGU YANG DISUKAI — XXXTENTACION</p><div class="grid grid-cols-1 gap-2.5">${songsHtml}</div></div>
            ${plistHtml?'<div><p class="riki-eyebrow mb-2">PLAYLIST YANG DISUKAI</p><div class="flex gap-2.5 overflow-x-auto hide-scrollbar pb-1">'+plistHtml+'</div></div>':''}
        </div>`;
        lucide.createIcons();
        Home.renderActive();
        if(typeof hideSplashScreen==='function') setTimeout(hideSplashScreen, 80);
    },

    displayCategoryView(){
        var defView=gid('home-default-view'), catView=gid('home-category-view');
        if(defView) defView.style.display='none';
        if(catView) catView.style.display='block';
        if(!catView) return;
        var catName=Home.activeCategory||'Kategori';
        var songsHtml='';
        if(S.hc&&S.hc.length>0){
            songsHtml=S.hc.map(function(t,i){
                var isCur=S.ct&&((S.ct.id===t.id)||(S.ct.videoId===t.id)||(S.ct.title===t.title&&S.ct.artist===t.artist));
                var isPlay=isCur&&S.ip; var isLoad=isCur&&S.il;
                var icon=isLoad?'<div class="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>': isPlay?'<div class="flex gap-[2px]"><span class="w-[2px] h-3 bg-black rounded-full animate-eq-1"></span><span class="w-[2px] h-3 bg-black rounded-full animate-eq-2"></span><span class="w-[2px] h-3 bg-black rounded-full animate-eq-3"></span></div>':'<i data-lucide="play" class="w-3 h-3 fill-current"></i>';
                var cardBg=isPlay?'bg-white text-black border-white':'bg-[#101015] border-white/10 hover:border-white/15';
                return '<div onclick="PK(\'homecat\','+i+')" class="home-cat-card border '+cardBg+' rounded-xl flex items-center gap-3 p-2.5 cursor-pointer active:scale-[0.98] transition-all animate-card-up" style="animation-delay:'+Math.min(i*22, 240)+'ms"><img src="'+t.cover+'" class="w-11 h-11 rounded-lg object-cover border border-white/10" onerror="this.src=\''+FI+'\'" /><div class="min-w-0 flex-1"><h3 class="font-semibold text-xs truncate '+(isPlay?'text-black':'text-white')+'">'+es(t.title)+'</h3><p class="text-[10px] truncate '+(isPlay?'text-black/60':'text-white/50')+'">'+es(t.artist)+'</p></div><div class="w-7 h-7 rounded-full '+(isPlay?'bg-black text-white':'bg-white/10 text-white')+' flex items-center justify-center">'+icon+'</div></div>';
            }).join('');
        } else songsHtml='<p class="text-center text-white/50 text-xs py-8">Tidak ada lagu</p>';

        catView.innerHTML=`<div class="space-y-5">
            <div class="flex justify-between items-center bg-white/[0.04] p-2.5 rounded-xl border border-white/10">
                <span class="text-[11px] font-mono text-white/60">KATEGORI: <b class="text-white">${es(catName)}</b></span>
                <button onclick="Home.selectCategory('Semua')" class="text-[11px] px-3 py-1 rounded-full bg-white text-black font-bold">Reset</button>
            </div>
            <div><p class="riki-eyebrow mb-2">LAGU POPULER — ${es(catName)}</p><div class="grid grid-cols-1 gap-2.5">${songsHtml}</div></div>
        </div>`;
        lucide.createIcons();
        Home.renderActive();
        if(typeof hideSplashScreen==='function') setTimeout(hideSplashScreen, 80);
    },

    showSkeleton(){
        var g=gid('home-grid'), s=gid('home-scroll'), a=gid('home-artists');
        if(g) g.innerHTML=Array(4).fill(0).map(function(){return '<div class="bg-[#0e0e12] border border-white/10 rounded-xl p-2.5 flex gap-3 animate-pulse"><div class="w-11 h-11 rounded-lg bg-white/5"></div><div class="flex-1 space-y-2"><div class="h-3 bg-white/10 rounded w-3/4"></div><div class="h-2 bg-white/5 rounded w-1/2"></div></div></div>';}).join('');
        if(s) s.innerHTML=Array(4).fill(0).map(function(){return '<div class="w-32 h-32 rounded-xl bg-white/5 animate-pulse"></div>';}).join('');
        if(a) a.innerHTML=Array(4).fill(0).map(function(){return '<div class="w-20 h-20 rounded-full bg-white/5 animate-pulse"></div>';}).join('');
    },

    async fetch(){
        Home.showSkeleton();
        if(!navigator.onLine){
            var offline=typeof getOfflineSongs==='function'?getOfflineSongs():[];
            S.ht=offline; S.ha=[]; S.hp=[];
            Home.show(); return;
        }
        try{
            var r=await fetch(API.search+'?query='+encodeURIComponent('Trend Indonesia')+'&type=songs');
            var d=await r.json();
            if(d.status&&d.result.songs){
                S.ht=d.result.songs.map(function(s){return{id:s.videoId,videoId:s.videoId,title:cn(s.title),artist:cn(s.artist),artistId:s.artistId||'',cover:toHDCover(s.thumbnail,s.videoId),ytUrl:s.url};});
                var plist=[].concat(d.result.playlists||[]).concat(d.result.albums||[]);
                S.hp=plist.sort(function(){return 0.5-Math.random();});
            }
        }catch(e){}
        S.ha=[
            {name:'XXXTENTACION', id:'UC8E6Rlb6pPspk1KkLInmPBA', cover:'https://i.scdn.co/image/ab6761610000e5eb806a16d223847e335e2e8e3c'},
            {name:'Juice WRLD', id:'UC0BletW9py84h0beCD26WHQ', cover:'https://i.scdn.co/image/ab6761610000e5eb1e345853b015b6d510006767'},
            {name:'Hindia', id:'UCzhVLh7xVyH3MpqO_KY6SYg', cover:'/profile.jpg'}
        ];
        Home.show();
    },

    show(){
        if(Home.activeCategory&&Home.activeCategory!=='Semua'){
            if(Home.activeCategory==='Riki World') Home.renderDeveloperProfileView();
            else Home.displayCategoryView();
            return;
        }
        var defView=gid('home-default-view'), catView=gid('home-category-view');
        if(defView) defView.style.display='block';
        if(catView) catView.style.display='none';
        var g=gid('home-grid'), s=gid('home-scroll'); if(!g||!s) return;

        if((!S.ht||S.ht.length===0)&&!navigator.onLine){
            g.innerHTML='<div class="col-span-2 bg-[#0e0e12] border border-white/10 rounded-xl p-4 text-center"><p class="text-white text-xs font-bold">Offline</p><p class="text-white/50 text-[11px] mt-1">Buka tab Offline</p><button onclick="App.switch(\'offline\')" class="mt-2 px-3 py-1.5 rounded-full bg-white text-black text-[11px] font-bold">Buka Offline</button></div>';
        } else {
            g.innerHTML=(S.ht||[]).slice(0,4).map(function(t,i){
                var isCur=S.ct&&((S.ct.id===t.id)||(S.ct.videoId===t.id)||(S.ct.title===t.title&&S.ct.artist===t.artist));
                var isPlay=isCur&&S.ip; var isLoad=isCur&&S.il;
                var icon=isLoad?'<div class="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>': isPlay?'<div class="flex gap-[2px]"><span class="w-[2px] h-3 bg-black rounded-full animate-eq-1"></span><span class="w-[2px] h-3 bg-black rounded-full animate-eq-2"></span><span class="w-[2px] h-3 bg-black rounded-full animate-eq-3"></span></div>': isCur?'<i data-lucide="pause" class="w-3 h-3 fill-current"></i>':'<i data-lucide="play" class="w-3 h-3 fill-current ml-px"></i>';
                var bg=isPlay?'bg-white text-black border-white':'bg-[#101015] border-white/10 hover:border-white/15';
                return '<div onclick="PK(\'home1\','+i+')" class="home-grid-card border '+bg+' rounded-xl p-2.5 flex items-center gap-3 cursor-pointer active:scale-[0.98] transition-all group">'+
                    '<img src="'+t.cover+'" class="w-11 h-11 rounded-lg object-cover border border-white/10" onerror="this.src=\''+FI+'\'" />'+
                    '<div class="min-w-0 flex-1"><h3 class="home-grid-title font-semibold text-xs truncate '+(isPlay?'text-black':'text-white')+'">'+es(t.title)+'</h3><p class="text-[10px] truncate '+(isPlay?'text-black/60':'text-white/50')+'">'+es(t.artist)+'</p></div>'+
                    '<div class="w-7 h-7 rounded-full '+(isPlay?'bg-black text-white':'bg-white/10 text-white')+' flex items-center justify-center">'+icon+'</div></div>';
            }).join('');
        }

        var pls=typeof getUserPlaylists==='function'?getUserPlaylists():[];
        var plHtml='';
        pls.forEach(function(p){
            plHtml+='<div onclick="Library.open(\''+p.id+'\')" class="flex-shrink-0 w-32 cursor-pointer group"><div class="w-full aspect-square rounded-xl overflow-hidden border border-white/10 bg-[#101015] mb-1.5"><img src="'+(p.image||(p.songs.length>0?p.songs[0].cover:FI))+'" class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300" /></div><h3 class="font-semibold text-[11px] truncate text-white">'+es(p.name)+'</h3><p class="text-[10px] text-white/50">'+p.songs.length+' lagu</p></div>';
        });
        plHtml+='<div onclick="Library.createNew()" class="flex-shrink-0 w-32 cursor-pointer"><div class="w-full aspect-square rounded-xl border border-dashed border-white/15 bg-[#0e0e12] flex flex-col items-center justify-center gap-1"><i data-lucide="plus" class="w-6 h-6 text-white/50"></i><span class="text-[10px] text-white/50">Buat Playlist</span></div><h3 class="font-medium text-[11px] text-white/60 mt-1.5">Buat Baru</h3></div>';
        if(S.hp&&S.hp.length>0){
            S.hp.slice(0,8).forEach(function(p){
                plHtml+='<div onclick="Album.open(\''+p.id+'\', \''+(p.cover||FI)+'\')" class="flex-shrink-0 w-32 cursor-pointer group"><div class="w-full aspect-square rounded-xl overflow-hidden border border-white/10 bg-[#101015] mb-1.5"><img src="'+(p.cover||FI)+'" class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300" /></div><h3 class="font-semibold text-[11px] truncate text-white">'+es(p.title)+'</h3><p class="text-[10px] text-white/50 truncate">'+es(p.artist)+'</p></div>';
            });
        }
        s.innerHTML=plHtml;

        var a=gid('home-artists');
        if(a){
            if(S.ha&&S.ha.length>0){
                a.innerHTML=S.ha.slice(0,10).map(function(p){
                    return '<div onclick="Artist.open(\''+p.id+'\', \''+esJs(p.name||p.title)+'\')" class="flex-shrink-0 w-[84px] cursor-pointer flex flex-col items-center gap-2 group"><div class="w-[64px] h-[64px] rounded-full overflow-hidden border border-white/10 bg-[#101015] group-hover:border-white/20 transition-all"><img src="'+(p.cover||'/profile.jpg')+'" class="w-full h-full object-cover" onerror="this.src=\'/profile.jpg\'" /></div><span class="text-[10px] font-semibold text-white/80 truncate w-full text-center">'+es(p.name||p.title)+'</span></div>';
                }).join('');
                a.parentElement.style.display='block';
            } else a.parentElement.style.display='none';
        }
        lucide.createIcons();
        Home.renderActive();
        if(typeof hideSplashScreen==='function') setTimeout(hideSplashScreen, 80);
    },

    renderActive(){
        if(Home.activeCategory&&Home.activeCategory!=='Semua'){ Home.renderActiveCategory(); return; }
        var g=gid('home-grid');
        if(g&&S.ht){
            var items=S.ht.slice(0,4);
            g.querySelectorAll('.home-grid-card').forEach(function(el,i){
                var t=items[i]; if(!t) return;
                var isCur=S.ct&&((S.ct.id===t.id)||(S.ct.videoId===t.id)||(S.ct.title===t.title&&S.ct.artist===t.artist));
                var isPlay=isCur&&S.ip; var isLoad=isCur&&S.il;
                var icon=isLoad?'<div class="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>': isPlay?'<div class="flex gap-[2px]"><span class="w-[2px] h-3 bg-black rounded-full animate-eq-1"></span><span class="w-[2px] h-3 bg-black rounded-full animate-eq-2"></span><span class="w-[2px] h-3 bg-black rounded-full animate-eq-3"></span></div>': isCur?'<i data-lucide="pause" class="w-3 h-3 fill-current"></i>':'<i data-lucide="play" class="w-3 h-3 fill-current ml-px"></i>';
                el.className='home-grid-card border '+(isPlay?'bg-white border-white text-black':'bg-[#101015] border-white/10 hover:border-white/15')+' rounded-xl p-2.5 flex items-center gap-3 cursor-pointer active:scale-[0.98] transition-all';
                var title=el.querySelector('.home-grid-title');
                if(title) title.className='home-grid-title font-semibold text-xs truncate '+(isPlay?'text-black':'text-white');
                var btn=el.querySelector('.w-7');
                if(btn){
                    btn.className='w-7 h-7 rounded-full '+(isPlay?'bg-black text-white':'bg-white/10 text-white')+' flex items-center justify-center shrink-0';
                    btn.innerHTML=icon;
                }
            });
        }
        lucide.createIcons();
    },

    renderActiveCategory(){
        var catView=gid('home-category-view');
        if(!catView||!S.hc) return;
        catView.querySelectorAll('.home-cat-card').forEach(function(el,i){
            var t=S.hc[i]; if(!t) return;
            var isCur=S.ct&&((S.ct.id===t.id)||(S.ct.videoId===t.id)||(S.ct.title===t.title&&S.ct.artist===t.artist));
            var isPlay=isCur&&S.ip;
            el.className='home-cat-card border '+(isPlay?'bg-white border-white':'bg-[#101015] border-white/10')+' rounded-xl flex items-center gap-3 p-2.5 cursor-pointer active:scale-[0.98] transition-all';
        });
        lucide.createIcons();
    },

    refresh(){
        if(Home.activeCategory&&Home.activeCategory!=='Semua') Home.fetchCategoryData(Home.activeCategory);
        else Home.fetch();
        var m=gid('main-area'); if(m) m.scrollTop=0;
    }
};
