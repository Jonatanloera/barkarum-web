/*
 * Efectos holográficos de barkarum.com: fondo de energía, paneles que reaccionan
 * al cursor, aparición al desplazarse, visor 3D con pestañas y carrete 3D.
 * Con prefers-reduced-motion todo queda quieto y el carrete pasa a cuadrícula.
 */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.remove('no-js');

  /* ---------- Fondo de energía: partículas que fluyen por un campo de corrientes ---------- */
  function energy() {
    var c = document.getElementById('energy');
    if (!c || !c.getContext) return;
    var ctx = c.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    var w, h, parts = [], t = 0, running = true;
    var colors = (c.dataset.colors || '0,216,240|139,92,246|240,0,192').split('|');
    function spawn(any) {
      var r = Math.random();
      return { x: Math.random() * w, y: any ? Math.random() * h : h + 10, life: 0, max: 200 + Math.random() * 300,
        c: colors[r < .65 ? 0 : r < .87 ? 1 : 2], s: (0.5 + Math.random()) * dpr };
    }
    function size() {
      w = c.width = Math.floor(innerWidth * dpr);
      h = c.height = Math.floor(innerHeight * dpr);
      var n = Math.round(Math.min(140, (innerWidth * innerHeight) / 11000));
      parts = [];
      for (var i = 0; i < n; i++) parts.push(spawn(true));
    }
    function field(x, y) { return Math.sin(x * 0.0016 + t * 0.6) * 1.4 + Math.cos(y * 0.0021 - t * 0.4) * 1.1 - 1.57; }
    function frame() {
      if (!running) return;
      t += 0.01;
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(5,6,10,0.16)';
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i], a = field(p.x, p.y), sp = 1.1 * dpr;
        var nx = p.x + Math.cos(a) * sp, ny = p.y + Math.sin(a) * sp - 0.35 * dpr;
        var k = Math.sin(Math.PI * p.life / p.max);
        ctx.strokeStyle = 'rgba(' + p.c + ',' + (0.55 * k).toFixed(3) + ')';
        ctx.lineWidth = p.s;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(nx, ny); ctx.stroke();
        p.x = nx; p.y = ny; p.life++;
        if (p.life > p.max || p.x < -20 || p.x > w + 20 || p.y < -20) parts[i] = spawn(false);
      }
      if (!reduce) requestAnimationFrame(frame);
    }
    size();
    addEventListener('resize', size);
    if (reduce) { for (var k = 0; k < 90; k++) frame(); return; }
    document.addEventListener('visibilitychange', function () {
      running = !document.hidden;
      if (running) requestAnimationFrame(frame);
    });
    requestAnimationFrame(frame);
  }

  /* ---------- Paneles: brillo bajo el cursor e inclinación leve ---------- */
  function tilt() {
    if (!window.matchMedia('(hover: hover)').matches) return;
    document.querySelectorAll('[data-tilt]').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        el.style.setProperty('--mx', (x * 100).toFixed(1) + '%');
        el.style.setProperty('--my', (y * 100).toFixed(1) + '%');
        el.style.setProperty('--sheen', ((x - .5) * 60).toFixed(1) + '%');
        if (!reduce) {
          el.style.setProperty('--rx', ((x - .5) * 6).toFixed(2) + 'deg');
          el.style.setProperty('--ry', ((.5 - y) * 6).toFixed(2) + 'deg');
        }
      });
      el.addEventListener('pointerleave', function () {
        el.style.setProperty('--rx', '0deg');
        el.style.setProperty('--ry', '0deg');
        el.style.setProperty('--sheen', '-30%');
      });
    });
  }

  /* ---------- Aparición al entrar en pantalla ---------- */
  function reveal() {
    var els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || reduce) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { threshold: .12 });
    els.forEach(function (e) { io.observe(e); });
  }

  /* ---------- Visor 3D con pestañas: cada pestaña cambia el modelo y el panel de texto ---------- */
  function stages() {
    document.querySelectorAll('.stage-wrap').forEach(function (wrap) {
      var viewer = wrap.querySelector('model-viewer');
      var tabs = [].slice.call(wrap.querySelectorAll('[role="tab"]'));
      if (reduce && viewer) viewer.removeAttribute('auto-rotate');
      function select(tab) {
        tabs.forEach(function (t) {
          var on = t === tab;
          t.setAttribute('aria-selected', String(on));
          t.tabIndex = on ? 0 : -1;
          var panel = document.getElementById(t.getAttribute('aria-controls'));
          if (panel) panel.hidden = !on;
        });
        viewer.setAttribute('src', tab.dataset.model);
        if (tab.dataset.poster) viewer.setAttribute('poster', tab.dataset.poster);
        viewer.setAttribute('camera-orbit', tab.dataset.orbit || '0deg 82deg 105%');
        viewer.setAttribute('alt', tab.querySelector('strong').textContent);
      }
      tabs.forEach(function (tab, i) {
        tab.addEventListener('click', function () { select(tab); });
        tab.addEventListener('keydown', function (e) {
          var d = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0;
          if (!d) return;
          e.preventDefault();
          var next = tabs[(i + d + tabs.length) % tabs.length];
          select(next); next.focus();
        });
      });
    });
  }

  /* ---------- Carrete 3D que gira con el desplazamiento ---------- */
  function reels() {
    var dlg = document.getElementById('lightbox');
    document.querySelectorAll('.reel').forEach(function (sec) {
      var ring = sec.querySelector('.reel-ring');
      var cards = [].slice.call(sec.querySelectorAll('.reel-card'));
      var cap = sec.querySelector('.reel-caption strong');
      var kind = sec.querySelector('.reel-caption span');
      var bar = sec.querySelector('.reel-progress');
      var n = cards.length, step = 360 / n, radius = 0, current = -1;
      function title(card) { return card.querySelector('figcaption').textContent; }
      function open(card) {
        if (!dlg) return;
        var img = dlg.querySelector('img');
        img.src = card.dataset.full;
        img.alt = card.querySelector('img').alt;
        dlg.querySelector('p').textContent = title(card) + ' · ' + kind.textContent;
        dlg.showModal();
      }
      cards.forEach(function (c) {
        c.addEventListener('click', function () { open(c); });
        c.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(c); } });
      });
      if (reduce) { sec.classList.add('reel-static'); return; }
      function update() {
        var r = sec.getBoundingClientRect();
        var total = Math.max(1, r.height - innerHeight);
        var p = Math.min(1, Math.max(0, -r.top / total));
        var angle = p * 360 * (n - 1) / n;
        ring.style.transform = 'translateZ(' + (-radius) + 'px) rotateY(' + (-angle) + 'deg)';
        bar.style.setProperty('--p', (p * 100).toFixed(1) + '%');
        var best = 0, bestCos = -2;
        cards.forEach(function (c, i) {
          var d = ((i * step - angle) % 360 + 540) % 360 - 180;
          var cos = Math.cos(d * Math.PI / 180);
          c.style.filter = 'brightness(' + (0.25 + 0.75 * Math.max(0, cos)).toFixed(2) + ') blur(' + (Math.max(0, 1 - cos) * 2.2).toFixed(1) + 'px)';
          c.style.zIndex = Math.round(cos * 100);
          c.tabIndex = cos > .9 ? 0 : -1;
          if (cos > bestCos) { bestCos = cos; best = i; }
        });
        if (best !== current) { current = best; cap.textContent = title(cards[best]); }
      }
      function layout() {
        var cw = parseFloat(getComputedStyle(cards[0]).width);
        radius = Math.round((cw / 2) / Math.tan(Math.PI / n) * 1.12);
        cards.forEach(function (c, i) { c.style.transform = 'rotateY(' + (i * step) + 'deg) translateZ(' + radius + 'px)'; });
        update();
      }
      addEventListener('scroll', update, { passive: true });
      addEventListener('resize', layout);
      document.addEventListener('langchange', function () { current = -1; update(); });
      layout();
    });
    if (dlg) {
      dlg.querySelector('button').addEventListener('click', function () { dlg.close(); });
      dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    }
  }

  // Subtítulos de los videos en el idioma del sitio.
  function films() {
    var vids = document.querySelectorAll('video[data-subs]');
    if (!vids.length) return;
    function sync() {
      var lang = document.documentElement.lang || 'es';
      vids.forEach(function (v) {
        for (var i = 0; i < v.textTracks.length; i++) {
          v.textTracks[i].mode = v.textTracks[i].language === lang ? 'showing' : 'disabled';
        }
      });
    }
    sync();
    document.addEventListener('langchange', sync);
  }

  // Botón fijo de la demo en celular: aparece entre secciones y se esconde en la portada, las bandas de la demo y el cierre.
  function stickyCta() {
    var cta = document.querySelector('.sticky-cta');
    if (!cta || !('IntersectionObserver' in window)) return;
    var seen = new Set();
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) seen.add(e.target); else seen.delete(e.target); });
      cta.classList.toggle('show', seen.size === 0);
    });
    document.querySelectorAll('[data-hide-sticky]').forEach(function (el) { io.observe(el); });
  }

  energy(); tilt(); reveal(); stages(); reels(); films(); stickyCta();
})();
