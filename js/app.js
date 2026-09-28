/* Bridgestone × Okamoto · Taiwan-exclusive Wild Adventure Map
   Landing page + mobile-first map app (vanilla JS + Leaflet). Concept prototype. */
(function () {
  'use strict';
  var D = window.WAM_DATA, R = window.WAM_ROUTES || {}, P = window.WAM_PHOTOS || {}, CR = window.WAM_CREDITS || [];
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var html = document.documentElement, app = $('#app');
  var spotsById = {}, centersById = {};
  D.spots.forEach(function (s) { spotsById[s.id] = s; });
  D.centers.forEach(function (c) { centersById[c.id] = c; });
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  /* ---------------- icons ---------------- */
  var sv = function (b, o) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' + ((o && o.w) || 2) + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + b + '</svg>'; };
  var I = {
    home: sv('<path d="M3 11 12 3l9 8"/><path d="M5 9.5V21h5v-6h4v6h5V9.5"/>'),
    tire: sv('<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3.6"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/>'),
    route: sv('<circle cx="6" cy="19" r="2.5"/><path d="M8.5 19H15a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h6.5"/><path d="M18 2.5c-1.7 0-3 1.3-3 3 0 2.2 3 5 3 5s3-2.8 3-5c0-1.7-1.3-3-3-3z"/>'),
    eyeoff: sv('<path d="M3 3l18 18"/><path d="M10.6 5.1A10.6 10.6 0 0 1 12 5c6 0 9.5 7 9.5 7a17.6 17.6 0 0 1-3.2 4.1M6.6 6.6C3.9 8.3 2.5 12 2.5 12S6 19 12 19c1.7 0 3.2-.5 4.5-1.2"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>'),
    search: sv('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>', { w: 2.2 }),
    back: sv('<path d="M15 5l-7 7 7 7"/>', { w: 2.4 }),
    x: sv('<path d="M6 6l12 12M18 6 6 18"/>', { w: 2.4 }),
    down: sv('<path d="M6 9l6 6 6-6"/>', { w: 2.4 }),
    globe: sv('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18"/>'),
    city: sv('<path d="M3 21h18M5 21V9l5-3v15M10 21V4l6 3v14M16 21V11l3 1.5V21"/>'),
    arrow: sv('<path d="M5 12h14M13 6l6 6-6 6"/>', { w: 2.4 }),
    nav: sv('<path d="M3 11 21 3l-8 18-2-8-8-2z"/>', { w: 2.2 }),
    heart: sv('<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.2a4.3 4.3 0 0 1 7.5 2.6C19.5 15.4 12 20 12 20z"/>'),
    share: sv('<path d="M12 3v12M7 8l5-5 5 5"/><path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/>'),
    road: sv('<path d="M7 21 10 3M17 21 14 3M12 6v2M12 11v2M12 16v2"/>'),
    clock: sv('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'),
    warn: sv('<path d="M12 3 2 20h20L12 3z"/><path d="M12 10v4M12 17v.5"/>'),
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/></svg>',
    ext: sv('<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>'),
    check: sv('<path d="M4 12l5 5L20 6"/>', { w: 2.6 })
  };
  var TIRE_PACK = { RE71RS: 'POTENZA', PSPORT: 'POTENZA', TURANZA6: 'TURANZA', DUELERAT: 'DUELER' };
  var PACK_IMG = { POTENZA: 'assets/pack-potenza-002.webp', DUELER: 'assets/pack-dueler.webp', TURANZA: 'assets/pack-turanza.webp' };
  Object.keys(PACK_IMG).forEach(function (k) { PACK_IMG[k] = (window.WAM_ASSETS && window.WAM_ASSETS[PACK_IMG[k]]) || PACK_IMG[k]; });
  // Deliberately unscientific "privacy score" (demo copy, not real reviews)
  var PRIV = { tamsui: 5.0, yangming: 4.9, datun: 4.8, qixing: 4.6, zhuzihu: 4.7, qingtiangang: 4.9, guandu: 4.5, neihu: 4.9, nangang: 5.0, dajia: 4.2, xianjiyan: 4.4, maokong: 4.6, fuzhou: 4.8,
    capybara: 4.7, laomei: 4.8, fenniaolin: 4.9, hehuan: 5.0, wangyou: 4.9, eryanping: 4.7, maolin: 5.0, longpan: 4.8, xuhai: 5.0, shitiping: 4.6, liushidan: 4.8, jinzun: 4.9 };
  function tireOf(s) { return D.tires[s.tire]; }
  function shortName(s) { return s.name.replace(/\s*\(.*\)/, '').replace(/,.*$/, '').replace(/ Stargazing Point/, '').replace(/ Grassland$/, ''); }
  function cityOf(s) { var a = s.area.split('·'); var c = a[a.length - 1].trim(); if (c === 'New Taipei') c = 'New Taipei City'; if (/^(Yilan|Nantou|Chiayi|Pingtung|Hualien|Taitung)$/.test(c)) c += ' County'; if (c === 'Kaohsiung') c += ' City'; return c + ', Taiwan'; }
  function A(p) { var m = window.WAM_ASSETS; return (m && m[p]) || p; } // asset resolver (single-file build inlines images)
  function photos(s) { return (P[s.id] || []).map(A); }
  function pinPhoto(s) { return (P[s.id] || []).length ? A('assets/photos/' + s.id + '-pin.webp') : null; }
  function stars(v) { var f = Math.round(v); return '★★★★★'.slice(0, f) + '<span style="opacity:.3">' + '★★★★★'.slice(f) + '</span>'; }
  function fmtDur(min) { var h = Math.floor(min / 60), m = min % 60; return h ? h + ' h' + (m ? ' ' + m + ' min' : '') : m + ' min'; }
  function fmtLeft(ms) { ms = Math.max(0, ms); var h = Math.floor(ms / 3600000), m = Math.floor(ms % 3600000 / 60000), s = Math.floor(ms % 60000 / 1000); return h + ':' + String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0'); }

  /* ---------------- tread pattern generator (deck "Designs" slide) ---------------- */
  var uid = 0;
  var TREADS = {
    POTENZA: { w: 48, h: 34, body: '<path d="M2 0v34M46 0v34" stroke="#fff" stroke-width="3.5"/><path d="M6 34 24 12 42 34" fill="none" stroke="#fff" stroke-width="5"/><path d="M14 17 24 5 34 17" fill="none" stroke="#fff" stroke-width="1.6"/>' },
    DUELER: { w: 44, h: 44, body: '<rect x="3" y="3" width="16" height="15" rx="2.5" fill="#fff"/><rect x="25" y="25" width="16" height="15" rx="2.5" fill="#fff"/><rect x="25" y="3" width="16" height="8" rx="2" fill="#fff" opacity=".7"/><rect x="3" y="25" width="16" height="8" rx="2" fill="#fff" opacity=".7"/>' },
    TURANZA: { w: 30, h: 24, body: '<path d="M1.5 0v24M16.5 0v24" stroke="#fff" stroke-width="3.2"/><path d="M4 21 14 4M19 21 29 4" stroke="#fff" stroke-width="1.6"/>' }
  };
  function tread(kind, color, o) {
    o = o || {}; var t = TREADS[kind] || TREADS.POTENZA, id = 'tr' + (++uid);
    var sc = o.scale || 1, rot = o.rotate || 0, gx = o.gx == null ? 85 : o.gx, gy = o.gy == null ? 15 : o.gy;
    return '<svg class="tread" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>' +
      '<pattern id="p' + id + '" width="' + t.w + '" height="' + t.h + '" patternUnits="userSpaceOnUse" patternTransform="rotate(' + rot + ') scale(' + sc + ')">' + t.body + '</pattern>' +
      '<radialGradient id="g' + id + '" cx="' + gx + '%" cy="' + gy + '%" r="95%"><stop offset="0" stop-color="' + color + '"/><stop offset=".45" stop-color="' + color + '" stop-opacity=".5"/><stop offset="1" stop-color="' + color + '" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="b' + id + '" cx="' + gx + '%" cy="' + gy + '%" r="120%"><stop offset="0" stop-color="' + color + '" stop-opacity=".4"/><stop offset=".6" stop-color="#050608"/><stop offset="1" stop-color="#000"/></radialGradient>' +
      '<mask id="m' + id + '"><rect width="200" height="200" fill="url(#p' + id + ')"/></mask></defs>' +
      (o.nobg ? '' : '<rect width="200" height="200" fill="url(#b' + id + ')"/>') +
      '<rect width="200" height="200" fill="#fff" opacity=".07" mask="url(#m' + id + ')"/><rect width="200" height="200" fill="url(#g' + id + ')" mask="url(#m' + id + ')"/></svg>';
  }
  function imgOrTread(src, s, cls, alt) {
    if (src) return '<img src="' + src + '" alt="' + esc(alt || '') + '" loading="lazy" decoding="async"' + (cls ? ' class="' + cls + '"' : '') + '>';
    var t = tireOf(s); return tread(TIRE_PACK[s.tire], t.color, { scale: .6, gx: 30, gy: 20 });
  }

  /* ======================================================================
     LANDING
     ====================================================================== */
  (function drawTire() {
    var svg = $('.hero-tire'); if (!svg) return; var blocks = '';
    for (var i = 0; i < 90; i++) {
      var a = i * 4 * Math.PI / 180, r1 = 238, r2 = 282, w = 1.1 * Math.PI / 180;
      var p = function (r, g) { return (300 + r * Math.cos(g)).toFixed(1) + ' ' + (300 + r * Math.sin(g)).toFixed(1); };
      blocks += '<path d="M' + p(r1, a - w) + 'L' + p(r2, a - w * 2.2) + 'L' + p(r2, a + w * 1.2) + 'L' + p(r1, a + w * 1.6) + 'Z"/>';
    }
    svg.innerHTML = '<defs><linearGradient id="rim" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#ff0033"/><stop offset=".3" stop-color="#c00020"/><stop offset=".62" stop-color="#5a0000" stop-opacity=".6"/><stop offset="1" stop-color="#000" stop-opacity="0"/></linearGradient>' +
      '<radialGradient id="tb" cx="50%" cy="50%" r="50%"><stop offset=".55" stop-color="#030000"/><stop offset=".92" stop-color="#120101"/><stop offset="1" stop-color="#2a0202"/></radialGradient></defs>' +
      '<circle cx="300" cy="300" r="296" fill="url(#tb)"/><g fill="url(#rim)" opacity=".5">' + blocks + '</g>' +
      '<circle cx="300" cy="300" r="293" fill="none" stroke="url(#rim)" stroke-width="7"/><circle cx="300" cy="300" r="232" fill="none" stroke="url(#rim)" stroke-width="1.5"/>' +
      '<circle cx="300" cy="300" r="205" fill="none" stroke="#1c0101" stroke-width="22"/>';
  })();
  $$('.feat__tread').forEach(function (el) { var k = el.getAttribute('data-kind'); el.innerHTML = tread(k, D.packs[k].color, { scale: 1.1, gx: 100, gy: 0, nobg: true }); });

  // sticky nav tint
  var nav = $('#topnav');
  function onScroll() { nav.classList.toggle('is-scrolled', window.scrollY > 20); }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  // reveal on scroll
  if ('IntersectionObserver' in window) {
    var ro = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); ro.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px' });
    $$('.reveal').forEach(function (el) { ro.observe(el); });
  } else $$('.reveal').forEach(function (el) { el.classList.add('is-in'); });

  // credits
  (function credits() {
    var host = function (u) { return u.replace(/^https?:\/\//, '').split('/')[0]; };
    $('#creditsData').innerHTML = [
      ['Base map', 'Esri World Dark Gray Canvas + World Hillshade (© Esri, HERE, Garmin, © OpenStreetMap contributors)', 'https://www.esri.com/'],
      ['Geodata & geocoding', '© OpenStreetMap contributors, via Nominatim (ODbL)', 'https://www.openstreetmap.org/copyright'],
      ['Routes', 'OSRM (Project OSRM demo server), precomputed', 'https://project-osrm.org/'],
      ['Map library', 'Leaflet 1.9.4 (BSD-2)', 'https://leafletjs.com/']
    ].map(function (r) { return '<li><b class="text-zinc-200">' + r[0] + ':</b> <a href="' + r[2] + '" target="_blank" rel="noopener">' + esc(r[1]) + '</a></li>'; }).join('') +
      '<li><b class="text-zinc-200">Spot facts:</b> ' + D.spots.map(function (s) { return '<a href="' + esc(s.sources[0]) + '" target="_blank" rel="noopener">' + esc(shortName(s)) + '</a>'; }).join(', ') + '</li>';
    $('#creditsCenters').innerHTML = D.centers.map(function (c) { return '<li><a href="' + esc(c.source) + '" target="_blank" rel="noopener">Bridgestone ' + esc(c.zh) + '</a>: ' + esc(c.address) + '</li>'; }).join('') +
      Object.keys(D.tires).map(function (k) { var t = D.tires[k]; return '<li><a href="' + esc(t.url) + '" target="_blank" rel="noopener">' + esc(t.name) + '</a> (official product page, ' + host(t.url) + ')</li>'; }).join('');
    $('#creditsPhotos').innerHTML = CR.map(function (c) { var s = spotsById[c.spot]; return '<li>' + esc(s ? shortName(s) : c.spot) + ': <a href="' + esc(c.source) + '" target="_blank" rel="noopener">' + esc(c.title.replace(/\.(jpe?g|png|tiff?)$/i, '')) + '</a> by ' + esc(c.author) + ', <a href="' + esc(c.licenseUrl) + '" target="_blank" rel="noopener">' + esc(c.license) + '</a></li>'; }).join('');
    $('#photoCount').textContent = CR.length;
  })();

  /* ---------------- persistent state ---------------- */
  var KEY = 'wam.v2';
  var state = (function () { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } })();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} }
  var now = Date.now();
  state.others = state.others || {}; state.saved = state.saved || [];
  if (state.stealth == null) state.stealth = true;
  if (!state.hideH) state.hideH = 3;
  var demoOffsets = [72, 125, 47];
  D.hiddenDemo.forEach(function (id, i) { if (!state.others[id] || state.others[id] < now) state.others[id] = now + demoOffsets[i % 3] * 60000; });
  if (state.journey && state.journey.until < now) state.journey = null;
  save();
  function isOccupied(id) { return !!state.others[id] && state.others[id] > Date.now() && !isMine(id); }
  function isMine(id) { return !!(state.journey && state.journey.spotId === id && state.journey.until > Date.now()); }

  // stealth toggles (landing + app stay in sync)
  function syncStealthUI() {
    $$('input[data-stealth], #landingStealth').forEach(function (i) { i.checked = !!state.stealth; });
    $$('[data-stealth-label]').forEach(function (b) { b.textContent = state.stealth ? 'ON' : 'OFF'; });
  }
  document.addEventListener('change', function (e) {
    if (e.target.id === 'landingStealth' || e.target.hasAttribute('data-stealth')) {
      state.stealth = e.target.checked; save(); syncStealthUI();
      if (html.classList.contains('app-open') || isDesktop()) toast(state.stealth ? '<b>Stealth Mode on</b>Spots you head to get hidden from other couples.' : '<b>Stealth Mode off</b>Bold choice. Other couples can see where you\'re heading.', I.eyeoff, 2600);
    }
  });
  syncStealthUI();

  /* ======================================================================
     APP SHELL
     ====================================================================== */
  var mqDesk = window.matchMedia('(min-width: 1024px)');
  function isDesktop() { return mqDesk.matches; }
  function openApp(cb) {
    if (isDesktop()) {
      $('#appSlot').scrollIntoView({ behavior: 'smooth', block: 'center' });
      ensureMap(cb); return;
    }
    if (!html.classList.contains('app-open')) { html.classList.add('app-open'); pushNav('app'); }
    ensureMap(function () { map.invalidateSize(); cb && cb(); });
  }
  function closeApp(silent) {
    if (!html.classList.contains('app-open')) return;
    html.classList.remove('app-open'); if (!silent) popNav('app');
  }
  $$('[data-open-app]').forEach(function (b) { b.addEventListener('click', function () { openApp(); }); });
  $('#appClose').innerHTML = I.down; $('#appClose').addEventListener('click', function () { closeApp(); });
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) { if (es[0].isIntersecting && isDesktop()) { ensureMap(); io.disconnect(); } }, { rootMargin: '300px' });
    io.observe($('#appSlot'));
  }

  $$('.tab').forEach(function (t) {
    var ic = t.querySelector('.tab__ic'); ic.innerHTML = I[ic.getAttribute('data-ic')];
    t.addEventListener('click', function () {
      var tab = t.getAttribute('data-tab');
      if (tab === 'map') { closeDetail(true); exitRoute(true); setView('map'); }
      else { closePeek(); setView(tab); }
    });
  });
  $('.search__icon').innerHTML = I.search; $('#routeBack').innerHTML = I.back;
  $('#myJourneyBtn').insertAdjacentHTML('afterbegin', I.route);
  $('#myJourneyBtn').addEventListener('click', function () { closePeek(); setView('journey'); });

  var view = 'map';
  function setView(v) {
    view = v; app.setAttribute('data-view', v);
    $('#routeTop').hidden = v !== 'route';
    $('#routeCard').hidden = v !== 'route';
    if (v !== 'map') closePeek(true);
    $('#toast').hidden = true;
    $$('.tab').forEach(function (t) { var k = t.getAttribute('data-tab'); t.classList.toggle('is-active', k === v || ((v === 'route' || v === 'detail') && k === 'map')); });
    if ((v === 'map' || v === 'route') && map) setTimeout(function () { map.invalidateSize(); }, 30);
    if (v === 'journey') renderJourney();
    if (v === 'tires') renderTires();
    if (v === 'stealth') renderStealth();
  }

  /* ---------------- map ---------------- */
  var map, markers = {}, centerMarkers = {}, dotMarkers = {}, routeLayer = null, filter = 'all', activeSpot = null, region = 'taipei';
  var TW_BOUNDS = [[21.88, 120.05], [25.32, 122.0]];
  function taipeiBounds() { return L.latLngBounds(D.spots.filter(function (s) { return s.region === 'Taipei'; }).map(function (s) { return [s.lat, s.lng]; })); }
  function whenLeaflet(cb) { if (window.L) return cb(); var n = 0, iv = setInterval(function () { if (window.L || ++n > 300) { clearInterval(iv); if (window.L) cb(); } }, 50); }
  var mapQueue = [];
  function ensureMap(cb) {
    if (map) { cb && cb(); return; }
    if (cb) mapQueue.push(cb);
    if (ensureMap.busy) return; ensureMap.busy = true;
    whenLeaflet(function () {
      map = L.map('map', { zoomControl: false, attributionControl: true, minZoom: 6.5, maxZoom: 16, zoomSnap: 0.25, zoomDelta: 0.5, wheelPxPerZoomLevel: 90, scrollWheelZoom: !isDesktop(), tapTolerance: 12, bounceAtZoomLimits: false });
      var E = 'https://server.arcgisonline.com/ArcGIS/rest/services/';
      var opt = { maxZoom: 16, maxNativeZoom: 16, keepBuffer: 3, updateWhenIdle: false };
      L.tileLayer(E + 'Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', Object.assign({ className: 'tiles-base', attribution: '© Esri, HERE, Garmin · © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> · OSRM' }, opt)).addTo(map);
      L.tileLayer(E + 'Elevation/World_Hillshade/MapServer/tile/{z}/{y}/{x}', Object.assign({ className: 'tiles-hs', maxNativeZoom: 15 }, opt)).addTo(map);
      map.createPane('labels'); map.getPane('labels').style.zIndex = 390; map.getPane('labels').style.pointerEvents = 'none';
      L.tileLayer(E + 'Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}', Object.assign({ pane: 'labels', className: 'tiles-ref' }, opt)).addTo(map);
      map.attributionControl.setPrefix(false);
      if (isDesktop()) { // don't hijack page scroll: wheel-zoom only after the user engages with the map
        map.on('click focus', function () { map.scrollWheelZoom.enable(); });
        map.getContainer().addEventListener('mouseleave', function () { map.scrollWheelZoom.disable(); });
      }
      fitRegion(false);
      D.centers.forEach(addCenter);
      D.spots.forEach(addSpot);
      map.on('zoomend', function () { zoomClass(); layoutPins(); });
      map.on('moveend', function () { layoutPins(); });
      map.on('click', function () { hideSearch(); if (view === 'map') closePeek(); });
      zoomClass(); layoutPins();
      var q = mapQueue; mapQueue = []; q.forEach(function (f) { f(); });
    });
  }
  function padTop() { return ($('#exploreTop').offsetHeight || 170) + 10; }
  function fitRegion(animate) {
    if (!map) return;
    var b = region === 'taipei' ? taipeiBounds() : L.latLngBounds(TW_BOUNDS);
    map.fitBounds(b, { paddingTopLeft: [24, padTop() + 10], paddingBottomRight: [24, (region === 'taipei' ? 100 : 80)], animate: animate !== false, maxZoom: 12.5 });
    updateRegionBtn();
  }
  function updateRegionBtn() {
    var b = $('#regionBtn'); b.innerHTML = region === 'taipei' ? I.globe : I.city;
    b.setAttribute('aria-label', region === 'taipei' ? 'Show all of Taiwan' : 'Back to Taipei');
    b.title = b.getAttribute('aria-label');
  }
  updateRegionBtn();
  $('#regionBtn').addEventListener('click', function () {
    region = region === 'taipei' ? 'taiwan' : 'taipei'; closePeek();
    ensureMap(function () { fitRegion(true); });
    toast(region === 'taiwan' ? '<b>All Taiwan</b>12 bonus hideaways island-wide. Road trip, anyone?' : '<b>Taipei</b>13 secret spots, all under an hour away.', I.globe, 2200);
  });
  function zoomClass() {
    var z = map.getZoom(), el = $('#map');
    el.classList.toggle('z-low', z < 9); el.classList.toggle('z-high', z >= 12.5);
  }
  function matches(s) { return filter === 'all' || s.tags.indexOf(filter) >= 0; }

  function pinHTML(s, n, noLabel, dx) {
    var occ = isOccupied(s.id), mine = isMine(s.id);
    var cls = 'ppin' + (occ ? ' is-hidden' : '') + (mine ? ' is-mine' : '') + (activeSpot === s.id ? ' is-active' : '') + (matches(s) ? '' : ' is-dim') + (noLabel ? ' no-label' : '');
    var label = occ ? 'Occupied' : (mine ? 'Yours · hidden' : shortName(s));
    return '<div class="' + cls + '" role="button" tabindex="-1" aria-label="' + esc(shortName(s) + (occ ? ', occupied' : '') + (n ? ', plus ' + n + ' nearby' : '')) + '">' +
      '<div class="ppin__ring">' + (pinPhoto(s) ? '<img src="' + pinPhoto(s) + '" alt="" loading="lazy" decoding="async" width="48" height="48">' : '<div class="ph">' + imgOrTread(null, s) + '</div>') +
      (occ ? '<div class="ppin__lock">' + I.lock + '</div>' : '') + '<i class="ppin__dot"></i>' + (n ? '<span class="ppin__n">+' + n + '</span>' : '') + '</div>' +
      '<span class="ppin__label"' + (dx ? ' style="transform:translateX(' + dx + 'px)"' : '') + '>' + esc(label) + '</span></div>';
  }
  var pinState = {};
  function addSpot(s) {
    var m = L.marker([s.lat, s.lng], { icon: L.divIcon({ className: 'pin-wrap', html: '', iconSize: [0, 0] }), keyboard: true, title: shortName(s), riseOnHover: true, zIndexOffset: 500 });
    m.on('click', function (e) {
      if (e.originalEvent) L.DomEvent.stopPropagation(e.originalEvent);
      var st = pinState[s.id];
      if (st && st.members.length && map.getZoom() < 14.5) {
        var b = L.latLngBounds([[s.lat, s.lng]]); st.members.forEach(function (o) { b.extend([o.lat, o.lng]); });
        map.flyToBounds(b, { paddingTopLeft: [70, padTop() + 40], paddingBottomRight: [70, 140], maxZoom: Math.max(map.getZoom() + 1.5, 13.5), duration: .6 });
      } else openPeek(s.id);
    });
    markers[s.id] = m; m.addTo(map);
    dotMarkers[s.id] = L.marker([s.lat, s.lng], { icon: L.divIcon({ className: 'pin-wrap', html: '<i class="mdot"></i>', iconSize: [0, 0] }), interactive: false, keyboard: false });
  }
  // declutter: greedy clustering in screen space + label collision
  function layoutPins() {
    if (!map || routeSpot) return;
    var TH = 58, kept = [], labels = [];
    var order = D.spots.slice().sort(function (a, b) { return prio(b) - prio(a); });
    function prio(s) { return (s.id === activeSpot ? 100 : 0) + (isMine(s.id) ? 50 : 0) + (matches(s) ? 20 : 0) + (s.region === 'Taipei' ? 5 : 0) + (PRIV[s.id] || 4); }
    order.forEach(function (s) {
      var p = map.latLngToLayerPoint([s.lat, s.lng]), host = null;
      for (var i = 0; i < kept.length; i++) { var k = kept[i]; if (Math.abs(k.p.x - p.x) < TH && Math.abs(k.p.y - p.y) < TH) { host = k; break; } }
      if (host && s.id !== activeSpot) { host.members.push(s); pinState[s.id] = { host: host.s.id, members: [] }; }
      else { var k2 = { s: s, p: p, members: [] }; kept.push(k2); pinState[s.id] = k2; }
    });
    kept.forEach(function (k) {
      var w = Math.min(130, shortName(k.s).length * 7.4 + 18), box = { x: k.p.x - w / 2, y: k.p.y + 31, w: w, h: 20 };
      var hit = labels.some(function (b) { return !(box.x + box.w < b.x || b.x + b.w < box.x || box.y + box.h < b.y || b.y + b.h < box.y); }) ||
        kept.some(function (o) { return o !== k && box.x < o.p.x + 28 && box.x + box.w > o.p.x - 28 && box.y < o.p.y + 28 && box.y + box.h > o.p.y - 28; });
      k.noLabel = hit && k.s.id !== activeSpot; if (!k.noLabel) labels.push(box);
      var cx = map.latLngToContainerPoint([k.s.lat, k.s.lng]).x, W = map.getSize().x;
      k.dx = (cx < 0 || cx > W) ? 0 : Math.round(Math.max(0, 6 - (cx - w / 2)) - Math.max(0, (cx + w / 2) - (W - 6)));
    });
    D.spots.forEach(function (s) {
      var st = pinState[s.id], m = markers[s.id];
      if (st.host) { if (map.hasLayer(m)) map.removeLayer(m); if (!map.hasLayer(dotMarkers[s.id])) dotMarkers[s.id].addTo(map); return; }
      if (map.hasLayer(dotMarkers[s.id])) map.removeLayer(dotMarkers[s.id]);
      if (!map.hasLayer(m)) m.addTo(map);
      var sig = [st.members.length, st.noLabel, st.dx, isOccupied(s.id), isMine(s.id), activeSpot === s.id, matches(s)].join('|');
      if (m._sig !== sig) { m._sig = sig; m.setIcon(L.divIcon({ className: 'pin-wrap', html: pinHTML(s, st.members.length, st.noLabel, st.dx), iconSize: [0, 0] })); }
      m.setZIndexOffset(activeSpot === s.id ? 1000 : 500);
    });
  }
  function centerIcon(c, pit) {
    return L.divIcon({ className: 'pin-wrap', iconSize: [0, 0], html: '<div class="bspin' + (pit ? ' is-pit' : '') + '" role="img" aria-label="Bridgestone tire center ' + esc(c.zh) + '"><span class="bspin__b">B</span>' +
      (pit ? '<div class="pitcallout"><b>PIT STOP</b>Bridgestone ' + esc(c.zh) + '</div>' : '<span class="bspin__label">' + esc(c.zh) + '</span>') + '</div>' });
  }
  function addCenter(c) {
    var m = L.marker([c.lat, c.lng], { icon: centerIcon(c, false), zIndexOffset: 0, title: 'Bridgestone ' + c.zh });
    m.on('click', function (e) { if (e.originalEvent) L.DomEvent.stopPropagation(e.originalEvent); toast('<b>Bridgestone ' + esc(c.zh) + '</b>' + esc(c.address) + ' · Official ' + esc(c.type) + '. Every route stops at one.', '<span class="nodeB">B</span>', 3600); });
    m.addTo(map); centerMarkers[c.id] = m;
  }

  /* filters */
  $$('#chips .chip').forEach(function (b) {
    b.addEventListener('click', function () {
      filter = b.getAttribute('data-filter');
      $$('#chips .chip').forEach(function (x) { x.classList.toggle('is-active', x === b); x.setAttribute('aria-selected', x === b); });
      ensureMap(layoutPins);
    });
  });

  /* search */
  var sInput = $('#searchInput'), sRes = $('#searchResults');
  function hideSearch() { sRes.hidden = true; }
  sInput.addEventListener('input', function () {
    var q = sInput.value.trim().toLowerCase(); if (!q) { hideSearch(); return; }
    var hits = D.spots.filter(function (s) { return (s.name + ' ' + s.zh + ' ' + s.area + ' ' + s.region + ' ' + s.category + ' ' + tireOf(s).name).toLowerCase().indexOf(q) >= 0; });
    sRes.innerHTML = hits.length ? hits.map(function (s) {
      return '<button type="button" data-id="' + s.id + '">' + (pinPhoto(s) ? '<img src="' + pinPhoto(s) + '" alt="">' : '<span class="ph">' + imgOrTread(null, s) + '</span>') + '<span>' + esc(shortName(s)) + '<small>' + esc(s.zh) + ' · ' + esc(cityOf(s)) + (isOccupied(s.id) ? ' · Occupied' : '') + '</small></span></button>';
    }).join('') : '<div class="search__empty">No secret spot by that name. Yet.</div>';
    sRes.hidden = false;
  });
  sRes.addEventListener('click', function (e) { var b = e.target.closest('button[data-id]'); if (!b) return; sInput.value = ''; hideSearch(); sInput.blur(); openPeek(b.getAttribute('data-id')); });
  sInput.addEventListener('keydown', function (e) { if (e.key === 'Escape') { sInput.value = ''; hideSearch(); sInput.blur(); } if (e.key === 'Enter') { var f = sRes.querySelector('button[data-id]'); if (f) f.click(); } });

  /* ---------------- peek card (tap a pin) ---------------- */
  var peek = $('#peek');
  function cardHead(s, btn) {
    var t = tireOf(s), occ = isOccupied(s.id), v = PRIV[s.id] || 4.8;
    return '<div class="card__row"><button class="card__hit" type="button" data-open="' + s.id + '"><div class="card__thumb">' + imgOrTread(pinPhoto(s), s, '', '') + (occ ? '<div class="ppin__lock">' + I.lock + '</div>' : '') + '</div>' +
      '<div class="card__main">' + (occ ? '<div class="occline"><b>Occupied</b> · <span class="timer" data-until="' + state.others[s.id] + '">' + fmtLeft(state.others[s.id] - Date.now()) + '</span></div>'
        : '<div class="rating"><b>' + v.toFixed(1) + '</b><span class="stars" aria-label="Privacy score ' + v + ' of 5">' + stars(v) + '</span><small>privacy</small></div>') +
      '<strong class="card__name">' + esc(shortName(s)) + '</strong><span class="card__loc">' + esc(cityOf(s)) + '</span></div></button>' + btn + '</div>';
  }
  function openPeek(id) {
    var s = spotsById[id]; if (!s) return;
    if (view !== 'map') setView('map');
    activeSpot = id; hideSearch(); layoutPins();
    var t = tireOf(s), occ = isOccupied(id), c = centersById[s.pit];
    var h;
    if (occ) {
      var alt = nearestAlt(s);
      h = cardHead(s, '<button class="roundbtn" type="button" data-peek="' + alt.id + '" aria-label="Try ' + esc(shortName(alt)) + ' instead">' + I.arrow + '</button>') +
        '<div class="card__occ">Another couple is already en route, so we\'ve hidden this spot to avoid awkward encounters. <b style="color:#fff">' + esc(shortName(alt)) + '</b> is just as private →</div>';
      peek.classList.add('is-occ');
    } else {
      h = cardHead(s, '<button class="roundbtn' + (isMine(id) ? ' is-live' : '') + '" type="button" data-open="' + id + '" aria-label="View ' + esc(shortName(s)) + ' details">' + (isMine(id) ? I.eyeoff : I.arrow) + '</button>') +
        '<div class="card__tire"><i style="background:' + t.color + ';box-shadow:0 0 8px ' + t.color + '"></i><span><b>' + esc(t.name) + '</b> for the ' + esc(s.roadShort) + ' · pit stop <b>' + esc(c.zh) + '</b></span></div>';
      peek.classList.remove('is-occ');
    }
    peek.innerHTML = h; peek.hidden = false; app.classList.add('has-peek');
    peek.style.animation = 'none'; void peek.offsetWidth; peek.style.animation = '';
    focusOn(s, peek.offsetHeight + 90);
  }
  function closePeek(keepActive) {
    if (!peek.hidden) { peek.hidden = true; app.classList.remove('has-peek'); }
    if (!keepActive && activeSpot) { activeSpot = null; layoutPins(); }
  }
  peek.addEventListener('click', function (e) {
    var a = e.target.closest('[data-peek]'); if (a) { openPeek(a.getAttribute('data-peek')); return; }
    var o = e.target.closest('[data-open]'); if (o) {
      var id = o.getAttribute('data-open');
      if (isOccupied(id)) { openPeek(nearestAlt(spotsById[id]).id); return; }
      if (isMine(id)) { showRoute(id); return; }
      openDetail(id);
    }
  });
  function nearestAlt(s) {
    var best = null, bd = 1e9;
    D.spots.forEach(function (o) { if (o.id === s.id || isOccupied(o.id)) return; var d = Math.pow(o.lat - s.lat, 2) + Math.pow(o.lng - s.lng, 2); if (d < bd) { bd = d; best = o; } });
    return best;
  }
  function focusOn(s, bottomPx) {
    if (!map) return;
    var size = map.getSize(), z = Math.max(map.getZoom(), s.region === 'Taipei' ? 12 : 10);
    var p = map.project([s.lat, s.lng], z), top = padTop();
    var visibleCenterY = top + (size.y - bottomPx - top) / 2;
    map.flyTo(map.unproject(p.add([0, size.y / 2 - visibleCenterY]), z), z, { duration: .6 });
  }

  /* ---------------- detail (full screen, like the Yangmingshan reference) ---------------- */
  var detail = $('#detail'), detailBody = $('#detailBody'), detailCta = $('#detailCta'), detailId = null;
  var DIFF = ['', 'Easy', 'Moderate', 'Tricky', 'Demanding', 'Expert'];
  function openDetail(id) {
    var s = spotsById[id]; if (!s) return;
    detailId = id; activeSpot = id;
    var t = tireOf(s), c = centersById[s.pit], r = R[id], ph = photos(s), occ = isOccupied(id), mine = isMine(id), v = PRIV[id] || 4.8;
    var pk = TIRE_PACK[s.tire], pack = D.packs[pk], saved = state.saved.indexOf(id) >= 0;
    var thumbs = ph.slice(1, 4);
    var credit = CR.filter(function (x) { return x.spot === id; });
    var h = '<div class="dhero">' + (ph[0] ? '<img src="' + ph[0] + '" alt="' + esc(shortName(s)) + '" decoding="async">' : tread(pk, t.color, { scale: 1.2, rotate: 90, gx: 80, gy: 20 })) +
      '<div class="dhero__shade"></div><div class="dhero__top"><button class="circbtn" type="button" data-act="back" aria-label="Back to map">' + I.back + '</button><span class="sp"></span>' +
      '<button class="circbtn' + (saved ? ' is-on' : '') + '" type="button" data-act="save" aria-pressed="' + saved + '" aria-label="Save spot">' + I.heart + '</button>' +
      '<button class="circbtn" type="button" data-act="share" aria-label="Share spot">' + I.share + '</button></div>' +
      (thumbs.length ? '<div class="dthumbs">' + thumbs.map(function (src, i) {
        var last = i === thumbs.length - 1;
        return '<button type="button" class="dthumb' + (last ? ' dthumb--more' : '') + '" data-act="gallery" data-i="' + (i + 1) + '" aria-label="' + (last ? 'View all ' + ph.length + ' photos' : 'Photo ' + (i + 2)) + '"><img src="' + src + '" alt="" loading="lazy">' + (last ? '<span>+' + ph.length + '</span>' : '') + '</button>';
      }).join('') + '</div>' : '') + '</div>' +
      '<div class="dbody"><div class="dtitle"><h2>' + esc(shortName(s)) + '</h2>' + (r ? '<span class="dist">' + r.km + ' km</span>' : '') + '</div>' +
      '<p class="dloc">' + esc(cityOf(s).replace(', Taiwan', '')) + ' · <span lang="zh-Hant">' + esc(s.zh) + '</span></p>' +
      '<div class="rating"><b>' + v.toFixed(1) + '</b><span class="stars">' + stars(v) + '</span><small>privacy score*</small></div>';
    if (occ) {
      var alt = nearestAlt(s);
      h += '<div class="occbox"><div class="lockring">' + I.lock + '</div><h3>Temporarily hidden</h3><p>The system detected another couple already en route. To avoid awkward encounters, this spot is off the map for a while.</p>' +
        '<span class="timer" data-until="' + state.others[id] + '">' + fmtLeft(state.others[id] - Date.now()) + '</span><p style="margin-top:2px">until it reappears</p>' +
        '<button class="bigbtn bigbtn--ghost" type="button" data-alt="' + alt.id + '">Try ' + esc(shortName(alt)) + ' instead →</button></div>';
    }
    h += '<ul class="info">' +
      '<li><span class="ic">' + I.road + '</span><div><small>Road to adventure</small><b>' + esc(s.roadShort) + '</b></div></li>' +
      '<li><span class="ic" style="color:' + t.color + '">' + I.tire + '</span><div><small>Recommended tire</small><b>' + esc(t.name) + '</b></div></li>' +
      '<li><span class="ic is-b">B</span><div><small>Pit stop on the way</small><b>Bridgestone ' + esc(c.zh) + '</b></div></li>' +
      (r ? '<li><span class="ic">' + I.clock + '</span><div><small>From Da\'an, via pit stop</small><b>' + fmtDur(r.min) + ' · ' + r.km + ' km</b></div></li>' : '') +
      '</ul>' +
      '<p class="ddesc">' + esc(s.desc) + '</p>' +
      '<section class="tcard" style="--c:' + t.color + '">' + tread(pk, t.color, { scale: 1, gx: 50, gy: 50, nobg: true }) + '<div class="tcard__in">' +
      '<div class="tcard__eyebrow">OPTIMAL TIRE FOR THIS ROUTE</div><div class="tcard__name">' + esc(t.name) + '</div><div class="tcard__tag">' + esc(t.tagline) + '</div>' +
      '<ul>' + t.claims.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
      '<div class="tcard__why"><b>WHY THIS ROAD NEEDS IT</b>' + esc(s.why) + '</div>' +
      '<div class="tcard__pair"><img src="' + PACK_IMG[pk] + '" alt="" loading="lazy"><p>Pairs with the <b>' + esc(pack.name) + ' · ' + esc(pack.tagline.charAt(0) + pack.tagline.slice(1).toLowerCase()) + '</b> box. ' + esc(pack.claims[0]) + '.</p></div>' +
      '<a href="' + esc(t.url) + '" target="_blank" rel="noopener">Official ' + esc(t.name) + ' page ↗</a></div></section>' +
      '<div class="dfacts"><div class="dfact"><small>Difficulty</small><p>' + diffDots(s.difficulty) + DIFF[s.difficulty] + '</p></div><div class="dfact"><small>Best time</small><p>' + esc(s.bestTime) + '</p></div>' +
      '<div class="dfact dfact--wide"><small>The road</small><p>' + esc(s.road) + '</p></div></div>' +
      '<div class="caution">' + I.warn + '<span>' + esc(s.caution) + '</span></div>' +
      '<p class="srcs">Sources: ' + s.sources.map(function (u, i) { return '<a href="' + esc(u) + '" target="_blank" rel="noopener">[' + (i + 1) + '] ' + esc(u.replace(/^https?:\/\//, '').split('/')[0]) + '</a>'; }).join(' ') +
      (credit.length ? '<br>Photos: ' + credit.map(function (x) { return '<a href="' + esc(x.source) + '" target="_blank" rel="noopener">' + esc(x.author) + '</a> (' + esc(x.license) + ')'; }).join(', ') : '') +
      '<br>*Privacy score: a completely unscientific demo metric.</p></div>';
    detailBody.innerHTML = h; detailBody.scrollTop = 0; app.scrollTop = 0;
    detailCta.innerHTML = occ ? '<button class="pillcta pillcta--ghost" type="button" disabled>Hidden · back in <span class="timer" data-until="' + state.others[id] + '">' + fmtLeft(state.others[id] - Date.now()) + '</span></button>'
      : mine ? '<button class="pillcta pillcta--live" type="button" data-act="route">' + I.eyeoff.replace('<svg', '<svg width="22" height="22"') + 'You\'re en route · view map</button>'
        : '<button class="pillcta" type="button" data-act="route" id="startAdventure">Start Adventure <span class="arr" aria-hidden="true">→</span></button>';
    if (detail.hidden) { detail.hidden = false; pushNav('detail'); }
    closePeek(true); setView('detail');
  }
  function diffDots(n) { var h = '<span class="diff" aria-label="Difficulty ' + n + ' of 5">'; for (var i = 1; i <= 5; i++) h += '<i class="' + (i <= n ? 'on' : '') + '"></i>'; return h + '</span>'; }
  function closeDetail(silent) {
    if (detail.hidden) return;
    detail.hidden = true; if (!silent) popNav('detail');
    if (view === 'detail') { setView('map'); if (detailId) openPeek(detailId); }
  }
  detail.addEventListener('click', function (e) {
    var b = e.target.closest('[data-act],[data-alt]'); if (!b) return;
    var act = b.getAttribute('data-act'), s = spotsById[detailId];
    if (b.hasAttribute('data-alt')) { openDetail(b.getAttribute('data-alt')); return; }
    if (act === 'back') closeDetail();
    else if (act === 'route') { var id = detailId; detail.hidden = true; popNav('detail'); showRoute(id); }
    else if (act === 'save') {
      var i = state.saved.indexOf(detailId); if (i >= 0) state.saved.splice(i, 1); else state.saved.push(detailId); save();
      var on = i < 0; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', on);
      toast(on ? '<b>Saved</b>Added to your shortlist. We won\'t tell.' : '<b>Removed</b>Off the shortlist.', I.heart, 1800);
    } else if (act === 'share') {
      var url = location.href.split('#')[0] + '#spot=' + detailId;
      if (navigator.share) navigator.share({ title: shortName(s) + ' · Wild Adventure Map', text: 'Secret spot, very scenic. Bring the right tires.', url: url }).catch(function () {});
      else { try { navigator.clipboard.writeText(url); } catch (x) {} toast('<b>Link copied</b>Send it to the one person who needs it.', I.share, 2000); }
    } else if (act === 'gallery') openGallery(s, +b.getAttribute('data-i'));
  });

  /* gallery */
  var lb = $('#lightbox');
  function openGallery(s, start) {
    var ph = photos(s), cr = CR.filter(function (x) { return x.spot === s.id; });
    lb.innerHTML = '<button class="circbtn" type="button" aria-label="Close photos">' + I.x + '</button><div class="lightbox__strip">' + ph.map(function (src, i) {
      var c = cr.filter(function (x) { return x.file.replace(/-\d\.webp$/, '') === src.replace(/-\d\.webp$/, '') && x.file === src; })[0] || cr[i];
      return '<figure><img src="' + src.replace(/-(\d)\.webp$/, function (m, d) { return d === '0' ? m : m; }) + '" alt="' + esc(shortName(s)) + ' photo ' + (i + 1) + '" loading="lazy"><figcaption>' + (i + 1) + ' / ' + ph.length + (c ? ' · <a href="' + esc(c.source) + '" target="_blank" rel="noopener">' + esc(c.author) + '</a>, ' + esc(c.license) : '') + '</figcaption></figure>';
    }).join('') + '</div>';
    lb.hidden = false;
    var strip = lb.querySelector('.lightbox__strip'); strip.scrollLeft = strip.clientWidth * (start || 0);
    lb.querySelector('.circbtn').onclick = function () { lb.hidden = true; };
  }

  /* ---------------- route ---------------- */
  function decode(str) {
    var i = 0, lat = 0, lng = 0, out = [];
    while (i < str.length) {
      var b, sh = 0, res = 0; do { b = str.charCodeAt(i++) - 63; res |= (b & 31) << sh; sh += 5; } while (b >= 32); lat += (res & 1) ? ~(res >> 1) : (res >> 1);
      sh = 0; res = 0; do { b = str.charCodeAt(i++) - 63; res |= (b & 31) << sh; sh += 5; } while (b >= 32); lng += (res & 1) ? ~(res >> 1) : (res >> 1);
      out.push([lat / 1e5, lng / 1e5]);
    }
    return out;
  }
  var routeSpot = null;
  var DROP = '<div class="droppin"><svg viewBox="0 0 40 52"><path d="M20 51C20 51 3 31.5 3 19.5a17 17 0 0 1 34 0C37 31.5 20 51 20 51z" fill="#ff0033" stroke="#fff" stroke-width="2"/><circle cx="20" cy="19.5" r="7" fill="#fff"/></svg></div>';
  function showRoute(id) {
    ensureMap(function () { drawRoute(id); });
  }
  function drawRoute(id) {
    var s = spotsById[id], c = centersById[s.pit], r = R[id];
    if (routeSpot) clearRoute();
    routeSpot = id; activeSpot = id;
    closePeek(true); setView('route'); pushNav('route');
    $('#routeTitle').textContent = shortName(s);
    $('#routeSub').textContent = 'via Bridgestone ' + c.zh + ' pit stop';
    D.spots.forEach(function (o) { map.removeLayer(markers[o.id]); map.removeLayer(dotMarkers[o.id]); });
    D.centers.forEach(function (o) { map.removeLayer(centerMarkers[o.id]); });
    var pts = r ? decode(r.poly) : [[D.start.lat, D.start.lng], [c.lat, c.lng], [s.lat, s.lng]];
    routeLayer = L.layerGroup().addTo(map);
    L.polyline(pts, { color: '#ff0033', weight: 16, opacity: .18, lineCap: 'round', lineJoin: 'round', interactive: false }).addTo(routeLayer);
    var main = L.polyline(pts, { color: '#ff1f4d', weight: 6.5, opacity: 1, lineCap: 'round', lineJoin: 'round', className: 'route-main', interactive: false }).addTo(routeLayer);
    L.polyline(pts, { color: '#ffffff', weight: 2, opacity: .6, dashArray: '2 18', className: 'route-flow', interactive: false }).addTo(routeLayer);
    L.marker([D.start.lat, D.start.lng], { icon: L.divIcon({ className: 'pin-wrap', iconSize: [0, 0], html: '<div class="startpin"><span>You</span></div>' }), interactive: false }).addTo(routeLayer);
    L.marker([c.lat, c.lng], { icon: centerIcon(c, true), zIndexOffset: 800, interactive: false }).addTo(routeLayer);
    L.marker([s.lat, s.lng], { icon: L.divIcon({ className: 'pin-wrap', iconSize: [0, 0], html: DROP }), zIndexOffset: 900, interactive: false }).addTo(routeLayer);
    try { var path = main._path, len = path.getTotalLength(); path.style.strokeDasharray = len; path.style.strokeDashoffset = len; path.getBoundingClientRect(); path.style.transition = 'stroke-dashoffset 1.4s ease-in-out'; path.style.strokeDashoffset = '0'; setTimeout(function () { path.style.strokeDasharray = ''; path.style.transition = ''; }, 1500); } catch (e) {}
    renderRouteCard();
    var rch = $('#routeCard').offsetHeight;
    map.once('moveend', function () { placeCallout(c); });
    map.fitBounds(L.latLngBounds(pts), { paddingTopLeft: [40, ($('#routeTop').offsetHeight || 90) + 30], paddingBottomRight: [60, rch + 90], maxZoom: 14, animate: true });
    setTimeout(function () { placeCallout(c); }, 50);
  }
  function placeCallout(c) {
    var el = $('#map .pitcallout'); if (!el || !map) return;
    var x = map.latLngToContainerPoint([c.lat, c.lng]).x;
    el.classList.toggle('is-left', x + 26 + el.offsetWidth > map.getSize().x - 8);
  }
  function renderRouteCard() {
    var id = routeSpot, s = spotsById[id], c = centersById[s.pit], r = R[id], t = tireOf(s), mine = isMine(id);
    var rc = $('#routeCard'); rc.hidden = false;
    var btn = mine ? '<button class="roundbtn is-live" type="button" id="endJourney" aria-label="End journey and unhide spot">' + I.eyeoff + '</button>'
      : '<button class="roundbtn" type="button" id="startJourney" aria-label="Start journey">' + I.nav + '</button>';
    rc.innerHTML = cardHead(s, btn) +
      '<div class="legs"><span class="leg"><i class="nodeU" title="You (Da\'an)"></i></span><span class="bar"></span>' +
      '<span class="leg"><i class="nodeB">B</i><span>' + esc(c.zh.replace('輪胎館', '')) + (r ? ' <em>' + r.leg1km + ' km</em>' : '') + '</span></span><span class="bar"></span>' +
      '<span class="leg"><span>' + esc(shortName(s)) + (r ? ' <em>+' + r.leg2km + ' km</em>' : '') + '</span></span></div>' +
      (mine ? (state.journey.hidden ? '<div class="live">' + I.eyeoff + '<div><b>Hidden from other couples</b><small>Reappears in <span class="timer" data-until="' + state.journey.until + '">' + fmtLeft(state.journey.until - Date.now()) + '</span></small></div></div>'
        : '<div class="live">' + I.nav + '<div><b>En route · Stealth Mode off</b><small>Brave. Other couples can see you\'re coming.</small></div></div>') +
        '<button class="linkbtn" type="button" id="endJourney2">We\'re done here · unhide spot</button>'
        : '<div class="card__tire"><i style="background:' + t.color + ';box-shadow:0 0 8px ' + t.color + '"></i><span>' + (r ? '<b>' + fmtDur(r.min) + '</b> · ' : '') + 'fitted with <b>' + esc(t.name) + '</b>. Tap <b style="color:var(--red)">➤</b> to go' + (state.stealth ? ' and hide the spot' : '') + '.</span></div>');
    var sj = $('#startJourney'); if (sj) sj.addEventListener('click', function () { startJourney(id); });
    [$('#endJourney'), $('#endJourney2')].forEach(function (b) { if (b) b.addEventListener('click', endJourney); });
    rc.onclick = function (e) { var o = e.target.closest('[data-open]'); if (o) { var i2 = routeSpot; exitRoute(); openDetail(i2); } };
  }
  function clearRoute() {
    if (routeLayer) { map.removeLayer(routeLayer); routeLayer = null; }
    D.centers.forEach(function (o) { if (!map.hasLayer(centerMarkers[o.id])) centerMarkers[o.id].addTo(map); });
  }
  function exitRoute(silent) {
    if (!routeSpot) return null;
    clearRoute(); var id = routeSpot; routeSpot = null;
    D.spots.forEach(function (o) { markers[o.id]._sig = null; });
    $('#routeCard').hidden = true;
    setView('map'); layoutPins();
    if (!silent) popNav('route');
    return id;
  }
  $('#routeBack').addEventListener('click', function () { var id = exitRoute(); if (id) { openPeek(id); } });

  /* ---------------- journey + stealth ---------------- */
  function startJourney(id) {
    var s = spotsById[id], hide = !!state.stealth;
    state.journey = { spotId: id, startedAt: Date.now(), until: Date.now() + state.hideH * 3600000, hidden: hide }; save();
    if (!hide) { renderRouteCard(); updateBadge(); toast('<b>Journey started</b>Stealth Mode is off, so ' + esc(shortName(s)) + ' stays visible to everyone.', I.nav, 3600); return; }
    var st = $('#stealth');
    st.innerHTML = '<div><div class="stealthfx__rings"><i></i><i></i><i></i><div class="stealthfx__core">' + I.eyeoff + '</div></div>' +
      '<h3>' + esc(shortName(s)) + ' is now hidden</h3><p>We detected you\'re en route. The spot is hidden from other couples for the next ' + state.hideH + ' hours to avoid awkward encounters.</p><div class="welcome">You\'re welcome.</div></div>';
    st.hidden = false;
    if (navigator.vibrate) try { navigator.vibrate([30, 60, 30]); } catch (e) {}
    var done = function () { if (st.hidden) return; st.hidden = true; renderRouteCard(); updateBadge(); toast('<b>Stealth Mode on</b>This spot is hidden from other couples for ' + state.hideH + ' h. Drive safe, arrive safer.', I.eyeoff, 4200); };
    setTimeout(done, 2400); st.onclick = done;
  }
  function endJourney() {
    state.journey = null; save(); updateBadge();
    if (routeSpot) renderRouteCard();
    D.spots.forEach(function (o) { if (markers[o.id]) markers[o.id]._sig = null; }); layoutPins();
    if (view === 'journey') renderJourney();
    toast('<b>Spot released</b>It\'s visible to other couples again. Hope the view was worth it.', I.heart, 3200);
  }
  function updateBadge() { var on = !!(state.journey && state.journey.until > Date.now()); $('#tabBadge').hidden = !on; $('#topBadge').hidden = !on; }
  function occupiedList() {
    return D.spots.filter(function (s) { return isOccupied(s.id); }).map(function (s) {
      return '<div><span>' + esc(shortName(s)) + '</span><span>Hidden · <span class="timer" data-until="' + state.others[s.id] + '">' + fmtLeft(state.others[s.id] - Date.now()) + '</span></span></div>';
    }).join('');
  }
  function renderJourney() {
    var p = $('#journeyPage'), j = state.journey && state.journey.until > Date.now() ? state.journey : null;
    var head = '<header class="page__head"><h2>My Journey</h2></header>';
    var savedH = state.saved.length ? '<div class="panel"><h3>Shortlist</h3><div class="chiprow">' + state.saved.map(function (id) { return '<button type="button" data-spot="' + id + '">♥ ' + esc(shortName(spotsById[id])) + '</button>'; }).join('') + '</div></div>' : '';
    if (!j) {
      p.innerHTML = head + '<div class="panel" style="text-align:center"><div style="width:56px;height:56px;margin:4px auto 8px;color:var(--red)">' + I.route + '</div><h3>No journey yet</h3><p>Pick a secret spot, tap <b>Start Adventure</b>, then hit go. With Stealth Mode on, we hide the spot from every other couple while you\'re there.</p><button class="bigbtn" type="button" data-goto="map">Find a spot →</button></div>' +
        savedH + '<div class="panel"><h3>Hidden right now</h3><p>Other couples are en route to these spots:</p><div class="rowlist">' + occupiedList() + '</div><p style="font-size:13px;color:var(--muted)">Demo data: simulated couples.</p></div>';
    } else {
      var s = spotsById[j.spotId], c = centersById[s.pit], r = R[s.id], t = tireOf(s);
      p.innerHTML = head + '<div class="panel" style="border-color:rgba(255,0,51,.45)"><h3>' + esc(shortName(s)) + '</h3><p style="margin-top:2px">' + esc(s.zh) + ' · ' + esc(cityOf(s)) + '</p>' +
        (j.hidden ? '<div class="live">' + I.eyeoff + '<div><b>Hidden from other couples</b><small>Reappears in <span class="timer" data-until="' + j.until + '">' + fmtLeft(j.until - Date.now()) + '</span></small></div></div>' : '<div class="live">' + I.nav + '<div><b>En route</b><small>Stealth Mode off</small></div></div>') +
        '<div class="rowlist"><div><span>Pit stop</span><span>Bridgestone ' + esc(c.zh) + '</span></div>' + (r ? '<div><span>Distance</span><span>' + r.km + ' km · ' + fmtDur(r.min) + '</span></div>' : '') +
        '<div><span>Tire for this road</span><span style="color:' + t.color + ';font-weight:700">' + esc(t.name) + '</span></div><div><span>Started</span><span>' + new Date(j.startedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + '</span></div></div>' +
        '<button class="bigbtn" type="button" data-route="' + s.id + '">View route →</button><button class="bigbtn bigbtn--ghost" type="button" data-end>We\'re done here · unhide spot</button></div>' + savedH;
    }
  }
  function renderStealth() {
    $('#stealthPage').innerHTML = '<header class="page__head"><h2>Stealth Mode</h2></header>' +
      '<div class="stealthhero"><div class="eye">' + I.eyeoff + '</div><blockquote>If the system detects you\'re already en route, the spot will be temporarily hidden from others to avoid awkward encounters.</blockquote>' +
      '<label class="toggle"><input type="checkbox" data-stealth' + (state.stealth ? ' checked' : '') + '><span class="toggle__ui" aria-hidden="true"></span><span class="toggle__txt">Stealth Mode <b data-stealth-label>' + (state.stealth ? 'ON' : 'OFF') + '</b></span></label></div>' +
      '<div class="panel"><h3>Hide the spot for</h3><div class="segs" role="radiogroup" aria-label="Hide duration">' + [1, 3, 8].map(function (h) { return '<button type="button" role="radio" aria-checked="' + (state.hideH === h) + '" class="' + (state.hideH === h ? 'is-on' : '') + '" data-h="' + h + '">' + (h === 8 ? 'All night' : h + ' h') + '</button>'; }).join('') + '</div>' +
      '<p>Timer starts when you hit go. It ends early if you tap "We\'re done here". No judgement either way.</p></div>' +
      '<div class="panel"><h3>Currently hidden near you</h3><div class="rowlist">' + occupiedList() + '</div><p style="font-size:13px;color:var(--muted)">Demo: simulated couples. A real build would use anonymous, opt-in trip status only; no locations are shared.</p></div>';
  }
  function renderTires() {
    var order = ['RE71RS', 'PSPORT', 'TURANZA6', 'DUELERAT'];
    $('#tiresPage').innerHTML = '<header class="page__head"><h2>The right tire for every route</h2></header><p class="page__lead">Real Bridgestone Taiwan tires, matched to real roads. Tap a spot to see where each one shines.</p>' +
      '<div class="tiregrid">' + order.map(function (k) {
        var t = D.tires[k], sp = D.spots.filter(function (s) { return s.tire === k; });
        return '<section class="tcard" style="--c:' + t.color + '">' + tread(TIRE_PACK[k], t.color, { scale: 1, gx: 50, gy: 50, nobg: true }) + '<div class="tcard__in"><div class="tcard__eyebrow">' + esc(t.line) + '</div><div class="tcard__name">' + esc(t.name) + '</div><div class="tcard__tag">' + esc(t.tagline) + '</div>' +
          '<ul>' + t.claims.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
          '<div class="chiprow">' + sp.map(function (s) { return '<button type="button" data-spot="' + s.id + '">' + esc(shortName(s)) + '</button>'; }).join('') + '</div>' +
          '<a href="' + esc(t.url) + '" target="_blank" rel="noopener">Official page ↗</a></div></section>';
      }).join('') + '</div>' +
      '<div class="panel"><h3>The box set</h3><p>Same tread DNA, different kind of ride.</p><div class="packrow">' + ['POTENZA', 'DUELER', 'TURANZA'].map(function (k) { var pk = D.packs[k]; return '<figure><img src="' + PACK_IMG[k] + '" alt="' + esc(pk.name + ' ' + pk.tagline) + ' box" loading="lazy"><figcaption><b style="color:' + pk.color + '">' + esc(pk.name) + '</b><br>' + esc(pk.box) + '</figcaption></figure>'; }).join('') + '</div></div>' +
      '<p class="page__lead" style="text-align:center;margin-top:18px;font-style:italic">To experience the ultimate passion, you must first arrive safely.</p>';
  }
  app.addEventListener('click', function (e) {
    var sp = e.target.closest('.pageview [data-spot]'); if (sp) { setView('map'); ensureMap(function () { openPeek(sp.getAttribute('data-spot')); }); return; }
    var g = e.target.closest('.pageview [data-goto]'); if (g) { setView('map'); return; }
    var rt = e.target.closest('.pageview [data-route]'); if (rt) { showRoute(rt.getAttribute('data-route')); return; }
    var en = e.target.closest('.pageview [data-end]'); if (en) { endJourney(); return; }
    var h = e.target.closest('.segs [data-h]'); if (h) { state.hideH = +h.getAttribute('data-h'); save(); renderStealth(); }
  });

  /* ---------------- toast ---------------- */
  var toastT;
  function toast(msg, icon, ms) {
    var t = $('#toast'); t.innerHTML = (icon || '') + '<div>' + msg + '</div>'; t.hidden = false;
    t.style.animation = 'none'; void t.offsetWidth; t.style.animation = '';
    var cardEl = view === 'route' ? $('#routeCard') : (!peek.hidden ? peek : null);
    var tabH = $('#tabbar').offsetHeight || 62;
    t.style.bottom = (cardEl ? (cardEl.offsetHeight + tabH + 20) : (tabH + 12)) + 'px';
    clearTimeout(toastT); toastT = setTimeout(function () { t.hidden = true; }, ms || 3000);
  }
  $('#toast').addEventListener('click', function () { $('#toast').hidden = true; });

  /* ---------------- timers ---------------- */
  setInterval(function () {
    var n = Date.now();
    $$('.timer[data-until]').forEach(function (el) { el.textContent = fmtLeft(+el.getAttribute('data-until') - n); });
    if (state.journey && state.journey.until <= n) { state.journey = null; save(); updateBadge(); layoutPins(); }
  }, 1000);
  updateBadge();

  /* ---------------- back button (Android / browser) ---------------- */
  var navStack = [], ignorePop = 0;
  function pushNav(k) { navStack.push(k); try { history.pushState({ k: k }, ''); } catch (e) {} }
  function popNav(k) { var i = navStack.lastIndexOf(k); if (i >= 0) { navStack.splice(i, 1); ignorePop++; try { history.back(); } catch (e) { ignorePop--; } } }
  window.addEventListener('popstate', function () {
    if (ignorePop) { ignorePop--; return; }
    if (!lb.hidden) { lb.hidden = true; }
    var k = navStack.pop();
    if (k === 'detail') closeDetail(true);
    else if (k === 'route') { var id = exitRoute(true); if (id) openPeek(id); }
    else if (k === 'app') closeApp(true);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    if (!lb.hidden) lb.hidden = true; else if (!detail.hidden) closeDetail(); else if (routeSpot) $('#routeBack').click(); else if (!peek.hidden) closePeek(); else closeApp();
  });

  /* ---------------- deep links: #app #peek=id #spot=id #route=id #tires #journey #stealth #taiwan ---------------- */
  function deepLink() {
    var h = location.hash.replace('#', ''); if (!h) return;
    var kv = h.split('='), k = kv[0], v = kv[1];
    if (['app', 'peek', 'spot', 'route', 'tires', 'journey', 'stealth', 'taiwan'].indexOf(k) < 0) return;
    openApp(function () {
      setTimeout(function () {
        if (k === 'peek' && spotsById[v]) openPeek(v);
        else if (k === 'spot' && spotsById[v]) openDetail(v);
        else if (k === 'route' && spotsById[v]) showRoute(v);
        else if (k === 'taiwan') $('#regionBtn').click();
        else if (k === 'tires' || k === 'journey' || k === 'stealth') setView(k);
      }, 250);
    });
  }
  deepLink();
  window.WAM = { openApp: openApp, closeApp: closeApp, openPeek: openPeek, openDetail: openDetail, showRoute: showRoute, exitRoute: exitRoute, startJourney: startJourney, endJourney: endJourney, setView: setView,
    region: function (r) { region = r; ensureMap(function () { fitRegion(false); }); }, map: function () { return map; } };
})();
