// The design replays the hero statement by remounting it on click. Vanilla
// equivalent: strip the animation, force a reflow, then let it run again.
(function () {
  var statement = document.getElementById('statement');
  if (!statement) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    statement.removeAttribute('tabindex');
    statement.removeAttribute('title');
    return;
  }

  function replay() {
    var parts = statement.querySelectorAll('.rise');
    for (var i = 0; i < parts.length; i++) parts[i].style.animation = 'none';
    void statement.offsetWidth; // force reflow so the restart is observed
    for (var j = 0; j < parts.length; j++) parts[j].style.animation = '';
  }

  statement.addEventListener('click', replay);
  statement.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      replay();
    }
  });
})();

// Hide a broken/missing portrait so the CSS initials fallback shows through.
(function () {
  var img = document.querySelector('.portrait img');
  if (!img) return;
  function fallback() {
    img.style.display = 'none';
    img.parentNode.classList.add('is-empty');
  }
  img.addEventListener('error', fallback);
  if (img.complete && img.naturalWidth === 0) fallback();
})();
