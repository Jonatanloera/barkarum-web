/* Bandas sonoras: al pulsar play en una portada se carga ahí mismo el reproductor de YouTube
   (dominio youtube-nocookie). Hasta ese clic no se conecta nada con YouTube. */
(function () {
  var EMBED = 'https://www.youtube-nocookie.com/embed/';
  document.querySelectorAll('.ost-cover[data-yt-list]').forEach(function (cover) {
    var btn = cover.querySelector('.ost-play');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var frame = document.createElement('iframe');
      frame.src = EMBED + 'videoseries?list=' + encodeURIComponent(cover.getAttribute('data-yt-list')) +
        '&autoplay=1&rel=0&hl=' + (document.documentElement.lang || 'es');
      frame.title = cover.getAttribute('data-yt-title') || 'YouTube';
      frame.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
      frame.allowFullscreen = true;
      frame.loading = 'eager';
      cover.classList.add('is-playing');
      cover.replaceChildren(frame);
      frame.focus();
    });
  });
})();
