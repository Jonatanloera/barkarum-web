/*
 * Idioma y menú del sitio.
 * El español está escrito en el HTML; al cargar se guarda una copia y el
 * inglés sale del diccionario de la página (js/en-*.js). Cada clave corresponde
 * a un atributo data-i18n* del HTML (tools/check_site.py comprueba que coincidan).
 */
(function () {
  'use strict';

  // Cada página carga antes su diccionario (js/en-*.js) en window.BARKARUM_EN.
  var EN = window.BARKARUM_EN || {};

  var STORAGE_KEY = 'barkarum-lang';
  var ATTRS = [
    ['data-i18n', 'text'],
    ['data-i18n-html', 'html'],
    ['data-i18n-alt', 'alt'],
    ['data-i18n-aria', 'aria-label'],
    ['data-i18n-content', 'content']
  ];
  var spanish = [];

  function read(el, prop) {
    if (prop === 'text') return el.textContent;
    if (prop === 'html') return el.innerHTML;
    return el.getAttribute(prop);
  }

  function write(el, prop, value) {
    if (prop === 'text') el.textContent = value;
    else if (prop === 'html') el.innerHTML = value;
    else el.setAttribute(prop, value);
  }

  function snapshot() {
    ATTRS.forEach(function (pair) {
      var nodes = document.querySelectorAll('[' + pair[0] + ']');
      Array.prototype.forEach.call(nodes, function (el) {
        spanish.push({ el: el, prop: pair[1], key: el.getAttribute(pair[0]), value: read(el, pair[1]) });
      });
    });
  }

  function saved() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function save(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* sin almacenamiento: no se recuerda */ }
  }

  function initialLang() {
    var q = /[?&]lang=(es|en)\b/.exec(window.location.search);
    if (q) return q[1];
    var s = saved();
    if (s === 'es' || s === 'en') return s;
    var nav = (navigator.languages && navigator.languages[0]) || navigator.language || 'es';
    return /^es\b/i.test(nav) ? 'es' : 'en';
  }

  function setLang(lang) {
    spanish.forEach(function (item) {
      var value = lang === 'en' ? EN[item.key] : item.value;
      if (value != null) write(item.el, item.prop, value);
    });
    document.documentElement.lang = lang;
    var buttons = document.querySelectorAll('[data-lang]');
    Array.prototype.forEach.call(buttons, function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-lang') === lang));
    });
  }

  function setupLangButtons() {
    var buttons = document.querySelectorAll('[data-lang]');
    Array.prototype.forEach.call(buttons, function (b) {
      b.addEventListener('click', function () {
        var lang = b.getAttribute('data-lang');
        setLang(lang);
        save(lang);
      });
    });
  }

  function setupMenu() {
    var btn = document.getElementById('menuBtn');
    var nav = document.getElementById('nav');
    if (!btn || !nav) return;
    function close() {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) close();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  }

  function setupTopbar() {
    var bar = document.getElementById('topbar');
    if (!bar) return;
    function update() { bar.classList.toggle('scrolled', window.scrollY > 8); }
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  snapshot();
  setLang(initialLang());
  setupLangButtons();
  setupMenu();
  setupTopbar();
  window.setLang = setLang;
})();
