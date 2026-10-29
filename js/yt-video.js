/* Videos alojados en YouTube (decisión del dueño, 29 oct 2026: el arte nuevo va a YouTube y la web lo enlaza).
   Cada .yt-video[data-yt-id] muestra su póster y un botón de play; al pulsarlo se carga ahí mismo el reproductor
   de YouTube (dominio youtube-nocookie) con subtítulos en el idioma del sitio. Hasta ese clic no se conecta nada
   con YouTube. herramientas/pasar_a_youtube.py convierte un <video> del sitio en este bloque. */
(function () {
  var EMBED = 'https://www.youtube-nocookie.com/embed/';
  document.querySelectorAll('.yt-video[data-yt-id]').forEach(function (box) {
    var btn = box.querySelector('.yt-play');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var lang = document.documentElement.lang || 'es';
      var frame = document.createElement('iframe');
      frame.src = EMBED + encodeURIComponent(box.getAttribute('data-yt-id')) +
        '?autoplay=1&rel=0&cc_load_policy=1&hl=' + lang + '&cc_lang_pref=' + lang;
      frame.title = box.getAttribute('data-yt-title') || 'YouTube';
      frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      frame.allowFullscreen = true;
      box.classList.add('is-playing');
      box.replaceChildren(frame);
      frame.focus();
    });
  });
})();
