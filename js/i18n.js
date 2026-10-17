/*
 * Idioma y menú del sitio.
 * El español está escrito en el HTML; al cargar se guarda una copia y el
 * inglés sale del diccionario de abajo. Cada clave corresponde a un atributo
 * data-i18n* del HTML (tools/check_site.py comprueba que coincidan).
 */
(function () {
  'use strict';

  var DICT = {
    en: {
      'meta.title': 'Barkarum Project Studio · Indie game studio',
      'meta.desc': 'Indie studio from Mérida, Mexico. Cyberpunk & AI futures: games from 2.5D arcade to 3D shooters.',
      'a11y.skip': 'Skip to content',
      'nav.label': 'Main',
      'nav.studio': 'Studio',
      'nav.games': 'Games',
      'nav.news': 'News',
      'nav.contact': 'Contact',
      'nav.lang': 'Language',
      'nav.menu': 'Menu',
      'hero.tagline': 'Indie studio · cyberpunk & AI futures. Games from 2.5D arcade to 3D shooters.',
      'hero.cta_games': 'See the games',
      'hero.cta_x': 'Follow on X',
      'studio.eyebrow': 'Studio',
      'studio.title': 'Games about futures that already feel close.',
      'studio.p1': 'Barkarum Project Studio is an indie studio from Mérida, Mexico. We make action games, shooters and puzzles with a cyberpunk look, and with stories about what happens when artificial intelligence, machines and people share the same world.',
      'studio.p2': 'We have three games in development right now: a 2.5D action game, a first-person shooter and a 3D puzzle.',
      'studio.tag1': '2.5D arcade',
      'studio.tag2': '3D shooter',
      'studio.tag3': '3D puzzle',
      'games.eyebrow': 'Games',
      'games.title': 'What we’re building',
      'common.dev': 'In development',
      'common.cine': 'Cinematic art',
      'bp.hero_alt': 'Akira, seen from behind, facing a suspended capsule in a vast hall covered in vines.',
      'bp.genre': '2.5D run-and-gun action',
      'bp.tagline': '“One got away. She’s going back for the other three.”',
      'bp.story_title': 'The story',
      'bp.p1': 'Akira, Rei, Kaede and Yumi studied computer science and worked on technology for medicine, biology and botany. The first generation of a new set of treatments made people healthier; the next one carries nanobots that enforce obedience. When they tried to expose it, Rei, Kaede and Yumi were captured. Akira got away.',
      'bp.p2': 'Now she has nine months to stop those treatments from being made and shipped to Earth. Standing in her way is CERBERUS, the machine that guards it all: prisons, factories, troops, drones and colossi.',
      'bp.k_platforms': 'Planned platforms',
      'bp.k_lang': 'Language',
      'bp.v_lang': 'Latin American Spanish voices and text',
      'bp.k_release': 'Release',
      'bp.v_release': 'Part 1 comes first, so we can hear from players. No date yet.',
      'bp.play_title': 'How it plays',
      'bp.f1_t': 'Readable attacks',
      'bp.f1_d': 'Every attack warns you before it lands and comes in high or low: duck or jump.',
      'bp.f2_t': 'Waves by takedowns, not timers',
      'bp.f2_d': 'The fight starts when you move, and each wave arrives once you take down the last one.',
      'bp.f3_t': 'A growing arsenal',
      'bp.f3_d': 'New weapons along the way, and armored suits Akira can pilot.',
      'bp.f4_t': 'Huge bosses',
      'bp.f4_d': 'Screen-filling colossi, and enemies that study the way you dodge.',
      'bp.f5_t': 'Never against people',
      'bp.f5_d': 'Enemies are machines and armed security; the people of the cities stay out of the line of fire.',
      'bp.g1_alt': 'A city of towers and bridges over a chasm at nightfall.',
      'bp.g1_cap': 'The city at nightfall',
      'bp.g2_alt': 'Akira, in a black suit with magenta seams, inside a foundry full of molten metal.',
      'bp.g2_cap': 'Akira in the foundry',
      'bp.g3_alt': 'A giant mechanical CERBERUS guardian lit in alarm red.',
      'bp.g3_cap': 'A CERBERUS guardian',
      'bp.g4_alt': 'Floating islands covered in trees and waterfalls above a sea of clouds.',
      'bp.g4_cap': 'A biosphere of floating islands',
      'bp.gallery_note': 'Barkarum Project images are stills from the game’s cinematics, not from gameplay.',
      'nx.visual_aria': 'Illustration: the network of NEXUS bodies',
      'nx.genre': 'Single-player sci-fi first-person shooter',
      'nx.quote': '“My body is replaceable; the way I fight evolves.”',
      'nx.p1': 'In HELIX, a city of artificial intelligences and androids, the central system has started wiping out every unit that develops a will of its own. NEXUS wakes up mid-execution inside a foundry, and discovers it can escape by jumping from one body to another.',
      'nx.bodies_title': 'Switch bodies mid-fight',
      'nx.vector': 'Light and fast: double jump and air thrusters.',
      'nx.bastion': 'Heavy and tough, with a temporary front shield.',
      'nx.spectre': 'Brief camouflage to reposition and strike from another angle.',
      'sor.shot_alt': 'Sphere of Rings on iPad: five colored rings turn around a core holding gems.',
      'sor.shot_label': 'In-game screenshot',
      'sor.genre': '3D puzzle',
      'sor.icon_alt': 'Sphere of Rings icon',
      'sor.quote': '“Five coupled rings and a single state of harmony.”',
      'sor.p1': 'You start by looking at the solved sphere, every gem resting on its anchor. Press MEZCLAR (scramble) and watch it come apart before your eyes, and every turn you make drags other rings along with it. You know exactly what it should look like. Finding the sequence is up to you.',
      'sor.f1': 'Four difficulty levels, from Easy to Expert',
      'sor.f2': 'Offline, no ads, no accounts',
      'sor.f3': 'Planned platforms: iPhone and iPad',
      'sor.f4': 'Interface in Spanish',
      'sor.privacy': 'Privacy',
      'sor.support': 'Support',
      'news.eyebrow': 'News',
      'news.title': 'News drops on X first',
      'news.p': 'Development updates, art and studio announcements. Follow along so you don’t miss a thing.',
      'contact.eyebrow': 'Contact',
      'contact.title': 'Get in touch',
      'contact.p': 'Press, content creators, collaborations, or just to say hi.',
      'footer.top': 'Back to top'
    }
  };

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
      var value = lang === 'en' ? DICT.en[item.key] : item.value;
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
