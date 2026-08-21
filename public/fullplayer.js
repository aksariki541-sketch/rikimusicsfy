var FullPlayer={
    init(){
        gid('full-container').innerHTML=`
        <div id="full-player" class="fixed flex flex-col justify-between z-[170] text-white p-4 pt-safe sm:p-6 sm:pt-safe" style="display:none;transition:transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);will-change:transform;transform:translate3d(0,100%,0);top:0;left:0;right:0;bottom:0;overflow:hidden;touch-action:none;">
            
            <!-- Blurred Artwork Background Container -->
            <div class="player-bg-container">
                <img id="full-bg-artwork" src="" class="player-bg-blur-img" alt="" />
                <img id="full-bg-artwork-next" src="" class="player-bg-blur-img transition-opacity duration-300" style="opacity:0; z-index:2;" alt="" />
                <div id="full-bg-glow"></div>
                <div class="player-bg-vignette"></div>
            </div>

            <!-- Top Header -->
            <div class="relative z-10 flex justify-between items-center flex-shrink-0 pt-1 pb-1">
                <button onclick="FullPlayer.close()" class="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full active:scale-90 transition-all cursor-pointer" title="Tutup Player"><i data-lucide="chevron-down" class="w-7 h-7"></i></button>
                <div class="text-center min-w-0 px-2">
                    <p id="full-header-tag" class="text-[9px] uppercase tracking-[0.22em] text-[#a0a5b0] font-bold transition-all duration-300">Sedang Diputar</p>
                    <p id="full-header-artist" class="text-xs font-bold text-white/90 truncate max-w-[180px] mt-0.5 transition-all duration-300"></p>
                </div>
                <button onclick="FullPlayer.openMoreSheet()" class="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full active:scale-90 transition-all cursor-pointer" title="Opsi Lainnya"><i data-lucide="more-vertical" class="w-5 h-5"></i></button>
            </div>

            <!-- Cover Artwork / Compact Lyrics -->
            <div class="relative z-10 flex-1 flex items-center justify-center my-1 px-2" style="min-height:0;overflow:hidden;">
                <div id="full-cover-view" class="fp-cover-wrap flex items-center justify-center" style="width:min(74vw, 46vh, 340px); aspect-ratio:1/1;">
                    <div class="w-full h-full relative flex items-center justify-center">
                        <img id="full-cover" src="" class="w-full h-full object-cover rounded-3xl transition-transform duration-300 border border-white/10 shadow-2xl" style="box-shadow:0 24px 70px rgba(0,0,0,0.65);" />
                        
                        <!-- Next Cover Overlay for Smooth Transition -->
                        <div id="full-cover-next-overlay" class="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none opacity-0 z-10">
                            <img id="full-cover-next-img" src="" class="w-full h-full object-cover rounded-3xl border border-white/10 shadow-2xl" />
                        </div>

                        <!-- Loading & Overlay -->
                        <div id="full-cover-overlay" class="absolute inset-0 rounded-3xl flex flex-col items-center justify-center bg-black/65 backdrop-blur-md p-4 transition-opacity duration-200 opacity-0 pointer-events-none z-20">
                            <div id="full-cover-icon" class="mb-3 text-white flex items-center justify-center"></div>
                            <span id="full-cover-text" class="text-xs font-bold text-white leading-relaxed text-center drop-shadow-md px-2"></span>
                        </div>
                    </div>

                    <!-- Compact Inline Lyrics View -->
                    <div id="full-lyrics-view" class="hidden absolute inset-0 rounded-3xl bg-black/50 backdrop-blur-2xl border border-white/15 p-3.5 overflow-hidden flex flex-col shadow-2xl z-10">
                        <div id="full-inline-lyrics-scroll" class="flex-1 w-full overflow-y-auto no-scrollbar scroll-smooth relative z-10">
                            <div id="full-inline-lyrics-loading" class="hidden h-full flex flex-col items-center justify-center text-white/50 text-xs gap-2 py-8">
                                <div class="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                <span>Memuat lirik...</span>
                            </div>
                            <div id="full-inline-lyrics-empty" class="hidden h-full flex flex-col items-center justify-center text-white/50 text-xs text-center py-8">
                                <svg class="w-8 h-8 opacity-40 mb-2 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                                <span>Lirik tidak tersedia</span>
                            </div>
                            <div id="full-inline-lyrics-content" class="min-h-full flex flex-col justify-center text-left"></div>
                        </div>

                        <div class="relative z-20 shrink-0 pt-2 flex items-center justify-between border-t border-white/10 mt-1 gap-2">
                            <div class="flex items-center gap-1.5 bg-white/10 rounded-full px-2.5 py-1 border border-white/10">
                                <span class="text-[10px] text-white/60 font-semibold mr-0.5">Sync</span>
                                <button onclick="lyricSyncPrev()" class="w-5 h-5 rounded-full bg-white/15 hover:bg-white/30 text-white font-bold text-xs flex items-center justify-center active:scale-90 transition cursor-pointer" title="Lirik Mundur 1 Baris">-</button>
                                <span id="full-inline-sync-badge" class="hidden text-[10px] font-bold text-rose-400"></span>
                                <button onclick="lyricSyncNext()" class="w-5 h-5 rounded-full bg-white/15 hover:bg-white/30 text-white font-bold text-xs flex items-center justify-center active:scale-90 transition cursor-pointer" title="Lirik Maju 1 Baris">+</button>
                            </div>
                            <button onclick="toggleLyrics()" class="px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-white text-[11px] font-bold border border-white/20 backdrop-blur-md flex items-center gap-1.5 transition-all shadow-md cursor-pointer" title="Buka Lirik Penuh">
                                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
                                <span>Lirik Penuh</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Output device label (small, under cover) -->
            <div class="relative z-10 flex justify-center flex-shrink-0 -mt-1 mb-1">
                <button id="full-output-label" onclick="FullPlayer.openOutput()" class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 backdrop-blur-md text-white/80 hover:text-white text-[11px] font-semibold active:scale-95 transition-all cursor-pointer">
                    <i data-lucide="airplay" class="w-3.5 h-3.5"></i>
                    <span id="full-output-text">Perangkat ini</span>
                </button>
            </div>

            <!-- Cover / Lyrics toggle -->
            <div class="relative z-10 flex justify-center items-center my-1 flex-shrink-0">
                <div class="inline-flex items-center bg-black/40 backdrop-blur-xl p-1 rounded-full border border-white/15 shadow-inner">
                    <button id="full-tab-cover" onclick="FullPlayer.switchView('cover')" class="px-4 py-1 rounded-full text-xs font-bold transition-all text-white bg-white/20 shadow-md cursor-pointer">
                        Cover
                    </button>
                    <button id="full-tab-lyrics" onclick="FullPlayer.switchView('lyrics')" class="px-4 py-1 rounded-full text-xs font-bold transition-all text-white/60 hover:text-white bg-transparent cursor-pointer">
                        Lirik
                    </button>
                </div>
            </div>

            <!-- Song Info + Progress + Controls -->
            <div class="relative z-10 flex-shrink-0 w-full max-w-md mx-auto space-y-2.5 pb-2">
                <!-- Song Info -->
                <div class="flex items-center justify-between gap-3 px-1">
                    <div class="flex-1 min-w-0 truncate relative" id="full-meta-container">
                        <div id="full-meta-current" class="transition-opacity duration-300">
                            <div class="flex items-center gap-2">
                                <h2 id="full-title" class="text-xl sm:text-2xl font-black text-white truncate leading-tight">Pilih lagu</h2>
                                <span id="full-status-tag" class="hidden px-2 py-0.5 rounded-full text-[9px] font-extrabold tracking-wider uppercase border border-white/20 text-white bg-white/10 shrink-0"></span>
                            </div>
                            <p id="full-artist" class="text-white/70 text-xs sm:text-sm font-medium truncate cursor-pointer hover:text-white mt-1" onclick="FullPlayer.openArtist()"></p>
                        </div>

                        <div id="full-meta-next" class="absolute inset-0 flex flex-col justify-center pointer-events-none transition-opacity duration-300 opacity-0 z-10">
                            <div class="flex items-center gap-2">
                                <h2 id="full-title-next" class="text-xl sm:text-2xl font-black text-white truncate leading-tight"></h2>
                                <span id="full-next-countdown-badge" class="px-2 py-0.5 rounded-full text-[9px] font-extrabold tracking-wider uppercase border border-white/30 text-white bg-white/20 shrink-0">NEXT</span>
                            </div>
                            <p id="full-artist-next" class="text-white/80 text-xs sm:text-sm font-medium truncate mt-1"></p>
                        </div>
                    </div>
                    <div class="flex items-center gap-2 shrink-0">
                        <button id="full-offline-btn" onclick="toggleCurrentOffline(); if(typeof event !== 'undefined') event.stopPropagation();" class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white flex items-center justify-center active:scale-90 transition-all shrink-0 cursor-pointer shadow-md" title="Simpan ke Mode Offline PWA">
                            <i data-lucide="wifi-off" class="w-5 h-5"></i>
                        </button>
                        <button id="full-like-btn" onclick="toggleCurrentLike(); if(typeof event !== 'undefined') event.stopPropagation();" class="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white flex items-center justify-center active:scale-90 transition-all shrink-0 cursor-pointer shadow-md" title="Sukai Lagu">
                            <i data-lucide="heart" class="w-5 h-5"></i>
                        </button>
                    </div>
                </div>

                <!-- Progress Bar -->
                <div class="flex items-center gap-3 px-1 my-1">
                    <span id="time-curr" class="text-[11px] text-white/70 font-mono shrink-0 w-8 text-right font-semibold">0:00</span>
                    <div class="relative flex-1 h-1.5 bg-white/20 rounded-full flex items-center group cursor-pointer">
                        <input type="range" id="seek-bar" min="0" max="100" value="0" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" oninput="SK(this.value)" />
                        <div id="full-progress" class="relative h-full rounded-full" style="width:0%; background:#ffffff; transition:width 0.08s linear;">
                            <div class="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                    </div>
                    <span id="time-dur" class="text-[11px] text-white/70 font-mono shrink-0 w-8 font-semibold">0:00</span>
                </div>

                <!-- Music Controls -->
                <div class="flex items-center justify-between px-1 py-1">
                    <button id="full-shuffle-btn" onclick="SF()" class="relative text-white/60 hover:text-white active:scale-90 w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer" title="Acak (Shuffle)">
                        <i data-lucide="shuffle" class="w-5 h-5"></i>
                        <span id="full-shuffle-dot" class="hidden absolute top-2 right-2 w-1.5 h-1.5 bg-white rounded-full"></span>
                    </button>
                    <button id="full-prev-btn" onclick="PV()" class="text-white/85 hover:text-white active:scale-90 w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer" title="Lagu Sebelumnya">
                        <i data-lucide="skip-back" class="w-7 h-7 fill-current"></i>
                    </button>
                    <button onclick="TP()" id="full-play-btn-wrap" class="relative bg-white text-black rounded-full hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center w-[68px] h-[68px] shrink-0" style="box-shadow:0 10px 30px rgba(0,0,0,0.5);">
                        <div id="full-play-btn" class="flex items-center justify-center">
                            <i data-lucide="play" class="w-8 h-8 fill-current ml-0.5"></i>
                        </div>
                    </button>
                    <button id="full-next-btn" onclick="NX()" class="text-white/85 hover:text-white active:scale-90 w-12 h-12 rounded-full flex items-center justify-center transition-all cursor-pointer" title="Lagu Berikutnya">
                        <i data-lucide="skip-forward" class="w-7 h-7 fill-current"></i>
                    </button>
                    <button onclick="TR()" id="btn-repeat" class="relative text-white/60 hover:text-white active:scale-90 w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer" title="Ulang (Repeat)">
                        <i data-lucide="repeat" class="w-5 h-5"></i>
                        <span id="repeat-one" class="hidden absolute top-0.5 left-1/2 -translate-x-1/2 text-[8px] font-black text-white">1</span>
                    </button>
                </div>

                <!-- Volume + Output -->
                <div class="flex items-center gap-3 px-1 pt-1 pb-1.5">
                    <button id="full-vol-icon-btn" onclick="toggleMute()" class="text-white/70 hover:text-white transition cursor-pointer p-1 rounded-full active:scale-90 shrink-0" title="Mute / Unmute">
                        <i id="full-vol-icon" data-lucide="volume-2" class="w-5 h-5"></i>
                    </button>
                    <div class="relative flex-1 h-1.5 bg-white/20 rounded-full flex items-center group cursor-pointer">
                        <input type="range" id="vol-bar" min="0" max="100" value="100" class="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" oninput="setVolume(this.value)" />
                        <div id="full-vol-progress" class="relative h-full rounded-full" style="width:100%; background:#ffffff; transition:width 0.08s linear;">
                            <div class="absolute -right-1.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                    </div>
                    <button id="full-airplay-btn" onclick="FullPlayer.openOutput()" class="text-white/70 hover:text-white hover:bg-white/10 p-1.5 rounded-full active:scale-90 transition-all cursor-pointer shrink-0" title="Output Audio / AirPlay">
                        <i data-lucide="airplay" class="w-5 h-5"></i>
                    </button>
                </div>

            </div>
        </div>`;

        gid('lyrics-container').innerHTML=`
        <div id="lyrics-overlay" class="fixed flex flex-col z-[200] text-white" style="display:none;transition:transform 0.35s ease-out;transform:translateY(100%);top:0;left:0;width:100%;height:100%;overflow:hidden;touch-action:none;">
            
            <!-- Blurred Artwork Background Container -->
            <div class="player-bg-container">
                <img id="lyrics-bg-blur" src="" class="player-bg-blur-img" alt="" />
                <div id="lyrics-bg-glow" class="player-bg-glow"></div>
                <div class="player-bg-vignette"></div>
            </div>

            <!-- Mobile Header -->
            <div class="md:hidden flex justify-between items-center p-4 pt-safe flex-shrink-0 bg-black/30 backdrop-blur-md border-b border-white/10 relative z-20">
                <div class="flex items-center gap-3 overflow-hidden">
                    <img id="lyrics-header-cover" src="" class="w-12 h-12 rounded-md object-cover shadow-md flex-shrink-0 bg-white/5" />
                    <div class="flex flex-col min-w-0">
                        <span id="lyrics-header-title" class="font-bold text-white text-base truncate">Lirik</span>
                        <span id="lyrics-header-artist" class="text-white/70 text-sm truncate"></span>
                    </div>
                </div>
                <button onclick="toggleLyrics()" class="text-white/70 hover:text-white p-2 rounded-full active:scale-90 flex-shrink-0 transition-all bg-white/10 ml-3"><i data-lucide="chevron-down" class="w-6 h-6"></i></button>
            </div>

            <!-- Floating Sync Controls -->
            <div class="md:hidden absolute top-[100px] right-6 z-30 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                <button onclick="lyricSyncPrev()" class="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 w-8 h-8 rounded-full active:scale-90 flex items-center justify-center transition-all"><i data-lucide="minus" class="w-4 h-4"></i></button>
                <p id="lyric-sync-badge-mobile" class="hidden text-xs font-bold text-white tracking-wide">+0</p>
                <button onclick="lyricSyncNext()" class="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 w-8 h-8 rounded-full active:scale-90 flex items-center justify-center transition-all"><i data-lucide="plus" class="w-4 h-4"></i></button>
            </div>

            <!-- Desktop Close Button -->
            <button onclick="toggleLyrics()" class="hidden md:flex absolute top-8 right-8 z-50 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white p-3 rounded-full active:scale-90 transition-all cursor-pointer">
                <i data-lucide="chevron-down" class="w-8 h-8"></i>
            </button>
            
            <div class="flex-1 flex flex-col md:flex-row w-full h-full overflow-hidden relative z-10">
                <!-- Left Side: Lyrics Scroll -->
                <div id="lyrics-scroll-container" class="w-full md:w-3/5 h-full overflow-y-auto px-6 md:px-16 hide-scrollbar z-10 relative">
                    <div class="pt-[30vh] pb-[60vh] w-full max-w-3xl mx-auto md:mx-0">
                        <div id="lyrics-loading" class="flex justify-center items-center h-[30vh] w-full">
                            <div class="w-10 h-10 border-4 border-[#cfd3d8] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <div id="lyrics-content" class="hidden w-full"></div>
                        <div id="lyrics-empty" class="hidden flex justify-center items-center h-[30vh] w-full text-white/50">
                            <div class="text-center">
                                <i data-lucide="music" class="w-20 h-20 mx-auto mb-4 opacity-30"></i>
                                <p class="text-lg">Lirik tidak tersedia</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Side: Cover & Info -->
                <div class="hidden md:flex w-2/5 flex-col justify-center items-start p-12 z-10 pl-16">
                    <img id="lyrics-desktop-cover" src="" class="w-[350px] max-w-full aspect-square rounded-2xl mb-8 object-cover bg-white/5 shadow-2xl border border-white/10" />
                    <h2 id="lyrics-desktop-title" class="font-bold text-white text-3xl mb-2 line-clamp-2 leading-tight">Lirik</h2>
                    <p id="lyrics-desktop-artist" class="text-white/70 text-lg line-clamp-1"></p>
                    <div class="flex items-center justify-start gap-3 mt-8">
                        <button onclick="lyricSyncPrev()" title="Sinkron mundur 1 lirik" class="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 w-12 h-12 rounded-full active:scale-90 flex items-center justify-center transition-all"><i data-lucide="minus" class="w-5 h-5"></i></button>
                        <p id="lyric-sync-badge-desktop" class="text-xs font-bold text-white tracking-wide">+0</p>
                        <button onclick="lyricSyncNext()" title="Sinkron lanjut 1 lirik" class="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 w-12 h-12 rounded-full active:scale-90 flex items-center justify-center transition-all"><i data-lucide="plus" class="w-5 h-5"></i></button>
                    </div>
                </div>
            </div>
        </div>`;
        lucide.createIcons();
    },
    currentViewMode: 'cover',
    switchView(mode) {
        FullPlayer.currentViewMode = mode;
        var coverView = gid('full-cover-view');
        var lyricsView = gid('full-lyrics-view');
        var tabCover = gid('full-tab-cover');
        var tabLyrics = gid('full-tab-lyrics');

        if (mode === 'lyrics') {
            if (lyricsView) lyricsView.classList.remove('hidden');

            if (tabCover) {
                tabCover.className = 'px-4 py-1 rounded-full text-xs font-bold transition-all text-white/60 hover:text-white bg-transparent cursor-pointer';
            }
            if (tabLyrics) {
                tabLyrics.className = 'px-4 py-1 rounded-full text-xs font-bold transition-all text-white bg-white/20 shadow-md cursor-pointer';
            }

            if (typeof setupLyricScrollListener === 'function') {
                setupLyricScrollListener();
            }
            if (typeof ULH === 'function') {
                ULH(typeof S !== 'undefined' ? (S.pt || 0) : 0, true);
            }
        } else {
            if (lyricsView) lyricsView.classList.add('hidden');

            if (tabCover) {
                tabCover.className = 'px-4 py-1 rounded-full text-xs font-bold transition-all text-white bg-white/20 shadow-md cursor-pointer';
            }
            if (tabLyrics) {
                tabLyrics.className = 'px-4 py-1 rounded-full text-xs font-bold transition-all text-white/60 hover:text-white bg-transparent cursor-pointer';
            }
        }
    },
    isOpen: false,
    open(){
        var fp=gid('full-player');
        if(!fp) return;
        FullPlayer.isOpen = true;
        fp.style.display='flex';
        document.body.style.overflow='hidden';
        void fp.offsetHeight;
        fp.style.transform='translate3d(0,0,0)';
        if(typeof MP !== 'undefined' && MP.hide) MP.hide();
        requestAnimationFrame(function(){
            try{
                updateSleepBadge();
                updateSpeedBadge();
                if(typeof UB==='function')UB();
                if(typeof updateLikeButtons==='function')updateLikeButtons();
                if(typeof updateOfflineButtons==='function')updateOfflineButtons();
                if(typeof updateVolumeUI==='function')updateVolumeUI();
                if(S.ct && typeof FullPlayer.updateBeats === 'function') FullPlayer.updateBeats(S.ct);
            }catch(e){}
        });
    },
    close(){
        var fp=gid('full-player');
        if(!fp) return;
        FullPlayer.isOpen = false;
        fp.style.transform='translate3d(0,100%,0)';
        document.body.style.overflow='';
        setTimeout(function(){
            fp.style.display='none';
            if(typeof S!=='undefined'&&!S.lo&&typeof MP!=='undefined')MP.show();
        },350);
    },
    openArtist(){if(S.ct&&S.ct.artistId){FullPlayer.close();setTimeout(function(){Artist.open(S.ct.artistId,S.ct.artist);},400);}},
    openAlbum(){
        if(!S.ct) return;
        FullPlayer.closeMoreSheet();
        var t = S.ct;
        if (t.albumId) {
            FullPlayer.close();
            setTimeout(function(){ Album.open(t.albumId, t.cover); }, 400);
            return;
        }
        FullPlayer.close();
        if (typeof showToast === 'function') showToast('Mencari album...');
        var query = ((t.artist && t.artist !== 'Unknown') ? t.artist + ' ' : '') + (t.title || '');
        fetch(API.search + '?query=' + encodeURIComponent(query)).then(function(r){ return r.json(); }).then(function(d){
            if (d && d.status && d.result && d.result.albums && d.result.albums.length) {
                var al = d.result.albums[0];
                Album.open(al.id, al.cover);
            } else {
                if (typeof showToast === 'function') showToast('Album tidak ditemukan');
            }
        }).catch(function(){
            if (typeof showToast === 'function') showToast('Gagal mencari album');
        });
    },
    closeMoreSheet(){
        var existing = gid('full-more-sheet');
        if (existing) existing.remove();
    },
    openMoreSheet() {
        FullPlayer.closeMoreSheet();

        var title = (S.ct && S.ct.title) ? S.ct.title : 'Pilih Lagu';
        var artist = (S.ct && S.ct.artist) ? S.ct.artist : '';
        var cover = (S.ct && S.ct.cover) ? S.ct.cover : FI;

        var isLiked = (typeof isLikedSong === 'function') ? isLikedSong(S.ct ? (S.ct.videoId || S.ct.id) : '') : false;
        var isShuffle = S.isShuffle === true;
        var isRepeatOne = S.rm === 'one';
        var isAutoNext = S.autoNext !== false;
        var isOffline = (typeof isOfflineSong === 'function') ? isOfflineSong(S.ct) : false;

        function row(icon, label, sub, onClick, active) {
            var activeCls = active ? 'text-white' : 'text-white/80';
            var iconCls = active ? 'text-white' : 'text-white/70';
            return '<button onclick="' + onClick + '" class="w-full flex items-center gap-3.5 px-2 py-3 rounded-xl hover:bg-white/10 active:bg-white/15 active:scale-[0.99] transition-all text-left cursor-pointer">' +
                '<span class="w-8 h-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center shrink-0 ' + iconCls + '"><i data-lucide="' + icon + '" class="w-[18px] h-[18px]"></i></span>' +
                '<span class="flex-1 min-w-0">' +
                    '<span class="block text-[14px] font-semibold ' + activeCls + ' truncate">' + label + '</span>' +
                    (sub ? '<span class="block text-[11px] text-white/45 truncate">' + sub + '</span>' : '') +
                '</span>' +
                (active ? '<i data-lucide="check" class="w-4 h-4 text-white/80 shrink-0"></i>' : '') +
            '</button>';
        }

        var sheet = document.createElement('div');
        sheet.id = 'full-more-sheet';
        sheet.className = 'fixed inset-0 z-[250] flex items-end justify-center bg-black/60 fp-sheet-overlay';
        sheet.onclick = function(e) { if (e.target === sheet) FullPlayer.closeMoreSheet(); };

        sheet.innerHTML = `
        <div id="full-more-sheet-panel" class="fp-sheet-panel w-full max-w-md rounded-t-3xl px-4 pt-3 pb-6 border-t border-white/15" style="max-height:88vh; display:flex; flex-direction:column;">
            <div class="w-10 h-1 bg-white/20 rounded-full mx-auto mb-4 shrink-0"></div>

            <div class="flex items-center gap-3 mb-4 p-3 rounded-2xl bg-white/5 border border-white/10 shrink-0">
                <img src="${cover}" class="w-12 h-12 rounded-xl object-cover border border-white/10" onerror="this.src='${FI}'" />
                <div class="min-w-0 flex-1">
                    <h4 class="font-bold text-white text-sm truncate">${es(title)}</h4>
                    <p class="text-xs text-white/50 truncate">${es(artist)}</p>
                </div>
                <button onclick="FullPlayer.closeMoreSheet()" class="text-white/50 hover:text-white p-2 rounded-full hover:bg-white/10 active:scale-90 transition-all cursor-pointer shrink-0" title="Tutup"><i data-lucide="x" class="w-5 h-5"></i></button>
            </div>

            <div class="overflow-y-auto hide-scrollbar flex-1 -mx-1 px-1">
                ${row('download', 'Download', 'Unduh lagu ini (audio)', "FullPlayer.closeMoreSheet();downloadCurrentSong();", false)}
                ${row('heart', 'Tambahkan ke Disukai', isLiked ? 'Lagu ini disukai' : 'Simpan ke lagu favorit', "FullPlayer.closeMoreSheet();toggleCurrentLike();", isLiked)}
                ${row('list-plus', 'Tambahkan ke Playlist', 'Simpan ke playlist kamu', "FullPlayer.closeMoreSheet();addCurrentToPlaylist();", false)}
                ${row('user', 'Lihat Artist', es(artist) || 'Buka halaman artist', "FullPlayer.openArtist();", false)}
                ${row('disc-3', 'Lihat Album', 'Buka album lagu ini', "FullPlayer.openAlbum();", false)}
                ${row('share-2', 'Bagikan', 'Bagikan lagu ini ke teman', "FullPlayer.closeMoreSheet();openShareCard();", false)}

                <div class="h-px bg-white/10 my-3 mx-1"></div>

                ${row('shuffle', 'Acak (Shuffle)', isShuffle ? 'Mode acak aktif' : 'Putar secara acak', "FullPlayer.closeMoreSheet();SF();", isShuffle)}
                ${row('repeat', 'Ulang', isRepeatOne ? 'Ulang satu lagu' : 'Ulang daftar', "FullPlayer.closeMoreSheet();TR();if(S.rm==='one')showToast('Ulang satu lagu');else showToast('Ulang semua');", isRepeatOne)}
                ${row('skip-forward', 'Auto Next', isAutoNext ? 'Lanjut otomatis aktif' : 'Lanjut otomatis nonaktif', "FullPlayer.closeMoreSheet();toggleAutoNext();", isAutoNext)}
                ${row('sliders', 'Equalizer', 'Atur frekuensi suara', "FullPlayer.closeMoreSheet();openEqualizer();", false)}
                ${row('clock', 'Timer Tidur', 'Hentikan musik otomatis', "FullPlayer.closeMoreSheet();openSleepTimer();", false)}
                ${row('gauge', 'Kecepatan Putar', 'Ubah kecepatan lagu', "FullPlayer.closeMoreSheet();openPlaybackSpeed();", false)}
                ${row('list-music', 'Antrian', 'Lihat daftar antrian', "FullPlayer.closeMoreSheet();openQueue();", false)}
                ${row('wifi-off', 'Simpan Offline', isOffline ? 'Tersimpan offline' : 'Simpan untuk offline', "FullPlayer.closeMoreSheet();toggleCurrentOffline();", isOffline)}
            </div>

            <button onclick="FullPlayer.closeMoreSheet()" class="w-full mt-3 py-3 bg-white/10 text-white font-bold rounded-full border border-white/10 active:scale-95 transition-all cursor-pointer shrink-0">Tutup</button>
        </div>`;

        document.body.appendChild(sheet);
        lucide.createIcons();

        // Swipe-down to close
        var panel = gid('full-more-sheet-panel');
        if (panel) {
            var startY = null;
            panel.addEventListener('touchstart', function(e){
                startY = e.touches[0].clientY;
                panel.style.animation = 'none';
                panel.style.transition = 'none';
            }, { passive: true });
            panel.addEventListener('touchmove', function(e){
                if (startY === null) return;
                var dy = e.touches[0].clientY - startY;
                if (dy > 0) { panel.style.transform = 'translateY(' + dy + 'px)'; }
            }, { passive: true });
            panel.addEventListener('touchend', function(e){
                if (startY === null) return;
                var dy = (e.changedTouches[0].clientY - startY);
                startY = null;
                if (dy > 90) { FullPlayer.closeMoreSheet(); return; }
                panel.style.transition = 'transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)';
                panel.style.transform = 'translateY(0)';
            });
        }
    },
    openOutput(){
        var existing = gid('full-output-sheet');
        if (existing) { existing.remove(); return; }

        var devices = [{ id: 'default', label: 'Perangkat ini', icon: 'smartphone' }];
        var sheet = document.createElement('div');
        sheet.id = 'full-output-sheet';
        sheet.className = 'fixed inset-0 z-[255] flex items-end justify-center bg-black/60 fp-sheet-overlay';
        sheet.onclick = function(e){ if(e.target === sheet) sheet.remove(); };

        sheet.innerHTML = `
        <div class="fp-sheet-panel w-full max-w-md rounded-t-3xl p-6 border-t border-white/15">
            <div class="w-10 h-1 bg-white/20 rounded-full mx-auto mb-5"></div>
            <div class="flex justify-between items-center mb-3">
                <h3 class="font-black text-white text-lg">Output Audio</h3>
                <button onclick="document.getElementById('full-output-sheet').remove()" class="text-white/50 hover:text-white p-1"><i data-lucide="x" class="w-5 h-5"></i></button>
            </div>
            <p class="text-[#6b7280] text-xs mb-4">Pilih perangkat output untuk memutar musik.</p>
            <div class="space-y-2" id="full-output-list">
                ${devices.map(function(d){
                    return '<button class="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-left">' +
                        '<span class="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center"><i data-lucide="' + d.icon + '" class="w-[18px] h-[18px] text-white"></i></span>' +
                        '<span class="flex-1 text-sm font-semibold text-white">' + d.label + '</span>' +
                        '<i data-lucide="check" class="w-4 h-4 text-white"></i>' +
                    '</button>';
                }).join('')}
            </div>
            <p class="text-[10px] text-white/35 mt-4 text-center">AirPlay &amp; pemilihan speaker eksternal belum tersedia penuh di browser.</p>
        </div>`;
        document.body.appendChild(sheet);
        lucide.createIcons();

        // Try to list real audio output devices
        if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
            navigator.mediaDevices.enumerateDevices().then(function(devs){
                var outs = devs.filter(function(d){ return d.kind === 'audiooutput' && d.deviceId && d.deviceId !== 'default'; });
                if (!outs.length) return;
                var listEl = gid('full-output-list');
                if (!listEl) return;
                var html = outs.map(function(d){
                    var label = d.label || 'Speaker';
                    return '<div class="w-full flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 transition-all text-left">' +
                        '<span class="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center"><i data-lucide="speaker" class="w-[18px] h-[18px] text-white/70"></i></span>' +
                        '<span class="flex-1 text-sm font-semibold text-white/80">' + es(label) + '</span>' +
                    '</div>';
                }).join('');
                listEl.insertAdjacentHTML('beforeend', html);
                lucide.createIcons();
            }).catch(function(){});
        }
    },
    parseRGB(str) {
        if (!str) return null;
        str = String(str);
        var m = str.match(/rgba?\(\s*(\d+)\s*[, ]\s*(\d+)\s*[, ]\s*(\d+)/);
        if (m) return { r: +m[1], g: +m[2], b: +m[3] };

        m = str.match(/hsla?\(\s*([\d.]+)\s*[, ]\s*([\d.]+)%\s*[, ]\s*([\d.]+)%/);
        if (m) {
            var h = ((+m[1]) % 360) / 360;
            var s = (+m[2]) / 100;
            var l = (+m[3]) / 100;
            var r, g, b;
            if (s === 0) {
                r = g = b = l;
            } else {
                var hue2rgb = function(p, q, t) {
                    if (t < 0) t += 1;
                    if (t > 1) t -= 1;
                    if (t < 1 / 6) return p + (q - p) * 6 * t;
                    if (t < 1 / 2) return q;
                    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                    return p;
                };
                var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                var p = 2 * l - q;
                r = hue2rgb(p, q, h + 1 / 3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1 / 3);
            }
            return { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) };
        }
        return null;
    },
    mixRGB(c1, c2, t) {
        return {
            r: Math.round(c1.r + (c2.r - c1.r) * t),
            g: Math.round(c1.g + (c2.g - c1.g) * t),
            b: Math.round(c1.b + (c2.b - c1.b) * t)
        };
    },
    rgba(c, a) {
        return 'rgba(' + c.r + ',' + c.g + ',' + c.b + ',' + (a == null ? 1 : a) + ')';
    },
    applyColors(colors) {
        var primary = FullPlayer.parseRGB(colors && colors[0]) || { r: 244, g: 63, b: 94 };
        var secondary = FullPlayer.parseRGB(colors && colors[1]) || primary;
        var dark = { r: 7, g: 8, b: 12 };

        // Keep text readable: darken the dominant colors for the background
        var bg1 = FullPlayer.mixRGB(primary, dark, 0.82);
        var bg2 = FullPlayer.mixRGB(secondary, dark, 0.9);
        var accent = FullPlayer.mixRGB(primary, { r: 255, g: 255, b: 255 }, 0.3);
        var accentSoft = FullPlayer.rgba(primary, 0.35);
        var glow = FullPlayer.rgba(primary, 0.55);

        if (typeof S !== 'undefined') {
            S.currentAccentColor = FullPlayer.rgba(accent, 1);
        }

        var fp = gid('full-player');
        if (fp) {
            fp.style.setProperty('--fp-accent', FullPlayer.rgba(accent, 1));
            fp.style.setProperty('--fp-accent-soft', accentSoft);
            fp.style.setProperty('--fp-glow', glow);
        }

        // Dynamic color tint layer over the blurred cover
        var fullGlow = gid('full-bg-glow');
        if (fullGlow) {
            fullGlow.style.background =
                'radial-gradient(circle at 50% 30%, ' + glow + ' 0%, transparent 62%),' +
                'linear-gradient(180deg, ' + FullPlayer.rgba(bg1, 0.55) + ' 0%, ' + FullPlayer.rgba(bg2, 0.5) + ' 50%, rgba(6,7,10,0.88) 100%)';
        }

        // Progress bar accent
        var fullProgress = gid('full-progress');
        if (fullProgress) {
            fullProgress.style.backgroundColor = FullPlayer.rgba(accent, 1);
        }

        // Volume fill accent
        var volProgress = gid('full-vol-progress');
        if (volProgress) {
            volProgress.style.backgroundColor = FullPlayer.rgba(accent, 1);
        }

        // Play button: accent color (matches UB) with a soft colored halo
        var playBtn = gid('full-play-btn-wrap');
        if (playBtn) {
            playBtn.style.backgroundColor = FullPlayer.rgba(accent, 1);
            playBtn.style.boxShadow = '0 10px 34px ' + accentSoft;
        }

        // Lyrics overlay subtle tint
        var lyricsGlow = gid('lyrics-bg-glow');
        if (lyricsGlow) {
            lyricsGlow.style.background = 'radial-gradient(circle at 50% 30%, ' + FullPlayer.rgba(primary, 0.28) + ' 0%, transparent 60%)';
        }
    },
    updateBeats(track) {
        if (!track) return;

        if (track.cover) {
            ['full-bg-artwork', 'lyrics-bg-blur'].forEach(function(id) {
                var el = gid(id);
                if (el) el.src = track.cover;
            });
        }

        // Trigger cover scale-in pop animation
        var coverView = gid('full-cover-view');
        if (coverView) {
            coverView.classList.remove('fp-cover-pop');
            void coverView.offsetWidth;
            coverView.classList.add('fp-cover-pop');
        }

        // Delegate dynamic color pipeline to MP (which ends by calling FullPlayer.applyColors)
        if (typeof MP !== 'undefined' && MP.updateBeats) {
            MP.updateBeats(track);
        } else {
            FullPlayer.applyColors(null);
        }
    }
};
