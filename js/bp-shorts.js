/* Barkarum Project · Las cuatro en vertical: al reproducir un Short se pausan los demás. */
(function () {
  var vids = document.querySelectorAll('.bp-shorts video');
  vids.forEach(function (v) {
    v.addEventListener('play', function () {
      vids.forEach(function (o) { if (o !== v && !o.paused) o.pause(); });
    });
  });
})();
