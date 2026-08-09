var Search={
    render(){
        gid('view-search').innerHTML=`
        <div class="riki-topbar pt-[max(1.6rem,env(safe-area-inset-top))] pb-3 px-4 sticky top-0 z-30 border-b">
            <div class="flex items-center justify-between gap-3 mb-3">
                <div class="riki-brand-row min-w-0 flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 shadow-[0_0_0_4px_rgba(255,255,255,0.06)] bg-white/10 shrink-0 relative flex items-center justify-center">
                        <span class="text-white font-bold text-sm select-none">R</span>
                        <img src="/profile.jpg" alt="PP" class="absolute inset-0 w-full h-full object-cover z-10" onerror="handlePPError(this)" />
                    </div>
                    <div class="min-w-0">
                        <p class="riki-eyebrow text-[9px] leading-none">RIKI // EXPLORE UNIVERSE</p>
                        <h1 class="riki-brand-name text-[1.45rem] font-extrabold tracking-tight leading-none mt-1">RIKI<span>.</span></h1>
                        <p class="text-[10px] text-white/50 font-mono tracking-tight mt-0.5">ICON = PP • Portfolio</p>
                    </div>
                </div>
                <div class="flex items-center gap-1.5 shrink-0">
                    <button onclick="Theme.open()" class="riki-icon-button w-9 h-9 rounded-full" aria-label="Theme"><i data-lucide="palette" class="w-4 h-4"></i></button>
                    <button onclick="App.switch('dev')" class="riki-icon-button w-9 h-9 rounded-full overflow-hidden p-0 border-white/15 relative flex items-center justify-center bg-white/10" aria-label="Profile">
                        <span class="text-white font-bold text-xs select-none">R</span>
                        <img src="/profile.jpg" alt="PP" class="absolute inset-0 w-full h-full object-cover z-10" onerror="handlePPError(this)" />
                    </button>
                </div>
            </div>
            <form id="search-form" class="relative" autocomplete="off">
                <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center text-white/40 pointer-events-none"><i data-lucide="search" class="h-4 w-4"></i></div>
                <input type="text" id="search-input" class="w-full bg-[#0a0a0d] border border-white/10 text-white text-sm font-medium rounded-xl pl-10 pr-[84px] py-3 focus:outline-none focus:border-white/20 placeholder:text-white/30" placeholder="Cari lagu, artis, album..." autocomplete="off" />
                <button type="submit" class="absolute right-1.5 top-1/2 -translate-y-1/2 bg-white text-black text-xs font-bold px-4 py-2 rounded-lg active:scale-95">Cari</button>
            </form>
            <div id="suggestions" class="hidden mt-2 bg-[#0e0e12] rounded-xl max-h-72 overflow-y-auto hide-scrollbar border border-white/10"></div>
        </div>
        <div id="filter-tabs" class="hidden flex gap-1.5 p-1 bg-[#0e0e12] rounded-full mx-4 mt-4 mb-3 border border-white/10 w-fit">
            <button onclick="setFilter('songs')" id="f-songs" class="filter-tab active px-4 py-1.5 rounded-full text-[11px] font-bold bg-white text-black">Musik</button>
            <button onclick="setFilter('playlists')" id="f-playlists" class="filter-tab px-4 py-1.5 rounded-full text-[11px] font-medium text-white/60">Playlist</button>
            <button onclick="setFilter('artists')" id="f-artists" class="filter-tab px-4 py-1.5 rounded-full text-[11px] font-medium text-white/60">Artis</button>
        </div>
        <div class="px-4 mt-3" id="search-results"></div>
        <div id="search-recs" class="px-4 mt-3 space-y-7 pb-8"></div>`;
        lucide.createIcons(); Search.events();
    },
    query(q){ App.switch('search'); var si=gid('search-input'); if(si){ si.value=q; var sf=gid('search-form'); if(sf) sf.dispatchEvent(new Event('submit')); } },
    onShow(){ if(!S.sq) Search.renderRecs(); },
    REC_ROWS:[
        {key:'rec0',label:'Rilis Anyar',q:'baru rilis'},
        {key:'rec1',label:'Barat Top',q:'barat Top'},
        {key:'rec2',label:'Rapp Top',q:'Rapp Top'}
    ],
    renderRecs(){
        var rc=gid('search-recs'); if(!rc) return;
        if(S.rec0&&S.rec1&&S.rec2){ Search.showRecs(); return; }
        rc.innerHTML=Search.REC_ROWS.map(function(){ return '<div class="animate-pulse"><div class="h-4 w-28 bg-white/10 rounded mb-3"></div><div class="flex gap-2.5 overflow-x-auto pb-1"><div class="w-28 h-28 rounded-xl bg-white/5"></div><div class="w-28 h-28 rounded-xl bg-white/5"></div><div class="w-28 h-28 rounded-xl bg-white/5"></div></div></div>'; }).join('');
        Promise.all(Search.REC_ROWS.map(function(row){
            return fetch(API.search+'?query='+encodeURIComponent(row.q)+'&type=songs').then(function(r){return r.json();}).then(function(d){
                S[row.key]=d.status&&d.result.songs ? d.result.songs.map(function(s){return{id:s.videoId,videoId:s.videoId,title:cn(s.title),artist:cn(s.artist),artistId:s.artistId||'',cover:toHDCover(s.thumbnail,s.videoId),ytUrl:s.url};}):[];
            }).catch(function(){ S[row.key]=[]; });
        })).then(function(){ Search.showRecs(); });
    },
    showRecs(){
        var rc=gid('search-recs'); if(!rc) return;
        rc.innerHTML=Search.REC_ROWS.map(function(row){
            var list=(S[row.key]||[]).slice(0,6);
            if(list.length===0) return '';
            var cards=list.map(function(t,i){
                var isCur=S.ct&&((S.ct.id===t.id)||(S.ct.videoId===t.id)||(S.ct.title===t.title&&S.ct.artist===t.artist));
                var isPlay=isCur&&S.ip;
                var icon=isPlay?'<div class="flex gap-[2px]"><span class="w-[2px] h-2.5 bg-black rounded-full animate-eq-1"></span><span class="w-[2px] h-2.5 bg-black rounded-full animate-eq-2"></span></div>':'<i data-lucide="play" class="w-3 h-3 fill-current"></i>';
                var bg=isPlay?'bg-white text-black':'bg-[#101015] border-white/10';
                return '<div onclick="PK(\''+row.key+'\','+i+')" class="search-rec-item flex-shrink-0 w-28 cursor-pointer active:scale-95 group"><div class="w-full aspect-square rounded-xl overflow-hidden border bg-[#101015] border-white/10 mb-1.5 relative"><img src="'+t.cover+'" class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300" onerror="this.src=\''+FI+'\'" /><div class="absolute bottom-1.5 right-1.5 w-6 h-6 rounded-full '+(isPlay?'bg-black text-white':'bg-white text-black')+' flex items-center justify-center text-[10px]">'+icon+'</div></div><h3 class="font-semibold text-[11px] truncate text-white leading-tight">'+es(t.title)+'</h3><p class="text-[10px] text-white/50 truncate">'+es(t.artist)+'</p></div>';
            }).join('');
            return '<div><p class="riki-eyebrow mb-2.5">'+row.label+'</p><div class="flex gap-2.5 overflow-x-auto hide-scrollbar pb-1">'+cards+'</div></div>';
        }).join('');
        lucide.createIcons();
    },
    renderActive(){
        var c=gid('search-results');
        if(c&&S.sq&&S.filter==='songs'&&S.sr){
            c.querySelectorAll('.search-song-item').forEach(function(el,i){
                var t=S.sr[i]; if(!t) return;
                var isCur=S.ct&&((S.ct.id===t.id)||(S.ct.videoId===t.id)||(S.ct.title===t.title&&S.ct.artist===t.artist));
                var isPlay=isCur&&S.ip;
                el.className='search-song-item flex items-center gap-3 p-2.5 mb-2 rounded-xl border cursor-pointer active:scale-[0.98] transition-all '+(isPlay?'bg-white border-white':'bg-[#101015] border-white/10');
                var titleEl=el.querySelector('.search-song-title');
                if(titleEl) titleEl.className='search-song-title font-semibold text-xs truncate '+(isPlay?'text-black':'text-white');
            });
        }
        lucide.createIcons();
    },
    events(){
        var sf=gid('search-form'), si=gid('search-input'); if(!sf||!si) return;
        sf.addEventListener('submit', async function(e){
            e.preventDefault(); S.sq=si.value.trim(); gid('suggestions').classList.add('hidden');
            if(!S.sq){ S.ar=[]; S.pr=[]; S.sr=[]; Search.show(); return; }
            var url=location.origin+'/search/'+encodeURIComponent(S.sq);
            history.pushState({},'',url);
            Search.show(true);
            try{
                var r=await fetch(API.search+'?query='+encodeURIComponent(S.sq)+'&type=all');
                var d=await r.json();
                S.ar=d.status&&d.result.songs ? d.result.songs.map(function(s){return{id:s.videoId,videoId:s.videoId,title:cn(s.title),artist:cn(s.artist),artistId:s.artistId||'',cover:toHDCover(s.thumbnail,s.videoId),ytUrl:s.url};}):[];
                var pl=d.status&&d.result.playlists?d.result.playlists:[];
                var al=d.status&&d.result.albums?d.result.albums:[];
                S.pr=[].concat(pl).concat(al);
                S.art=d.status&&d.result.artists?d.result.artists:[];
                gid('filter-tabs').classList.remove('hidden');
                S.filter='songs'; Search.updateFilterUI(); Search.apply();
            }catch(e){ S.ar=[]; S.pr=[]; Search.show(); }
        });
        si.addEventListener('input', function(){
            var q=this.value.trim();
            if(!q){ gid('suggestions').classList.add('hidden'); return; }
            fetch(API.suggest+'?q='+encodeURIComponent(q)).then(function(r){return r.json();}).then(function(s){
                if(Array.isArray(s)&&s.length>0){
                    gid('suggestions').innerHTML=s.map(function(sg){
                        return '<div onclick="selectSuggestion(\''+es(sg).replace(/'/g,"\\'")+'\')" class="px-3.5 py-2.5 hover:bg-white/5 cursor-pointer text-xs flex items-center gap-2"><i data-lucide="search" class="w-3.5 h-3.5 text-white/40"></i><span>'+es(sg)+'</span></div>';
                    }).join('');
                    gid('suggestions').classList.remove('hidden');
                    lucide.createIcons();
                } else gid('suggestions').classList.add('hidden');
            });
        });
        document.addEventListener('click', function(e){ if(!e.target.closest('#search-form')&&!e.target.closest('#suggestions')) gid('suggestions').classList.add('hidden'); });
    },
    updateFilterUI(){
        document.querySelectorAll('.filter-tab').forEach(function(el){
            el.className='filter-tab px-4 py-1.5 rounded-full text-[11px] font-medium text-white/60 hover:text-white transition-all';
        });
        var a=gid('f-'+S.filter);
        if(a){ a.className='filter-tab active px-4 py-1.5 rounded-full text-[11px] font-bold bg-white text-black'; }
    },
    show(loading){
        var c=gid('search-results'), rc=gid('search-recs'); if(!c) return;
        if(!S.sq){ c.innerHTML=''; if(rc) rc.style.display=''; return; }
        if(rc) rc.style.display='none';
        if(loading){ c.innerHTML='<div class="text-center mt-12"><div class="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div></div>'; return; }
        if(S.sr.length===0){ c.innerHTML='<p class="text-center text-white/50 text-xs mt-10 font-mono">Tidak ada hasil</p>'; return; }

        if(S.filter==='songs'){
            c.innerHTML=S.sr.map(function(t,i){
                var isCur=S.ct&&((S.ct.id===t.id)||(S.ct.videoId===t.id)||(S.ct.title===t.title&&S.ct.artist===t.artist));
                var isPlay=isCur&&S.ip; var isLoad=isCur&&S.il;
                var btn=isLoad?'<div class="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>': isPlay?'<div class="flex gap-[2px]"><span class="w-[2px] h-3 bg-black rounded-full animate-eq-1"></span><span class="w-[2px] h-3 bg-black rounded-full animate-eq-2"></span></div>': isCur?'<i data-lucide="pause" class="w-3 h-3 fill-current"></i>':'<i data-lucide="play" class="w-3 h-3 fill-current ml-px"></i>';
                var bg=isPlay||isCur?'bg-white border-white text-black':'bg-[#101015] border-white/10 text-white';
                return '<div onclick="PK(\'search\','+i+')" class="search-song-item flex items-center gap-3 p-2.5 mb-2 rounded-xl border cursor-pointer active:scale-[0.98] transition-all '+bg+' animate-card-up" style="animation-delay:'+Math.min(i*18,200)+'ms">'+
                    '<img src="'+toWebp(t.cover)+'" class="w-10 h-10 rounded-lg object-cover border border-white/10" onerror="handleImgError(this)" />'+
                    '<div class="flex-1 min-w-0"><h3 class="search-song-title font-semibold text-xs truncate '+(isPlay||isCur?'text-black':'text-white')+'">'+es(t.title)+'</h3><p class="text-[10px] truncate '+(isPlay||isCur?'text-black/60':'text-white/50')+'">'+es(t.artist)+'</p></div>'+
                    '<div class="w-7 h-7 rounded-full '+(isPlay||isCur?'bg-black text-white':'bg-white/10 text-white')+' flex items-center justify-center shrink-0">'+btn+'</div></div>';
            }).join('');
            lucide.createIcons();
        } else if(S.filter==='artists'){
            c.innerHTML='<div class="grid grid-cols-3 sm:grid-cols-4 gap-2.5 pb-8">'+S.sr.map(function(p){
                return '<div onclick="Artist.open(\''+p.id+'\', \''+esJs(p.name||p.title)+'\')" class="bg-[#101015] border border-white/10 rounded-xl p-3 flex flex-col items-center gap-2 cursor-pointer active:scale-95"><div class="w-14 h-14 rounded-full overflow-hidden border border-white/10"><img src="'+toWebp(p.cover)+'" class="w-full h-full object-cover" onerror="handleImgError(this)" /></div><h3 class="font-bold text-[11px] truncate w-full text-center text-white">'+es(p.name||p.title)+'</h3></div>';
            }).join('')+'</div>';
        } else {
            c.innerHTML='<div class="grid grid-cols-2 gap-2.5 pb-8">'+S.sr.map(function(p){
                return '<div onclick="Album.open(\''+p.id+'\', \''+(p.cover||FI)+'\')" class="bg-[#101015] border border-white/10 rounded-xl p-2 cursor-pointer active:scale-95"><div class="w-full aspect-square rounded-lg overflow-hidden border border-white/10 mb-2"><img src="'+toWebp(p.cover)+'" class="w-full h-full object-cover" /></div><h3 class="font-semibold text-[11px] truncate text-white">'+es(p.title)+'</h3><p class="text-[10px] text-white/50 truncate">'+es(p.artist)+'</p></div>';
            }).join('')+'</div>';
        }
    },
    apply(){
        if(S.filter==='songs') S.sr=S.ar||[];
        else if(S.filter==='playlists') S.sr=S.pr||[];
        else if(S.filter==='artists') S.sr=S.art||[];
        Search.show();
    }
};
function selectSuggestion(t){ gid('suggestions').classList.add('hidden'); gid('search-input').value=t; gid('search-form').dispatchEvent(new Event('submit')); }
function setFilter(f){ S.filter=f; Search.updateFilterUI(); Search.apply(); }
