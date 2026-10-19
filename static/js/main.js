// Formulář: demo režim neodesílá nic, ostrý režim posílá na endpoint ze site.json (data-endpoint).
(function () {
  document.querySelectorAll('form.formular').forEach(function (f) {
    var stav = f.querySelector('.formular-stav');
    f.addEventListener('submit', function (e) {
      var endpoint = f.getAttribute('data-endpoint');
      var demo = f.getAttribute('data-demo') === '1';
      if (f.querySelector('.past input').value) { e.preventDefault(); return; }   // robot
      if (demo || !endpoint) {
        e.preventDefault();
        stav.textContent = 'Ukážka formulára: nič sa neodosiela. Po spustení webu príde správa na e-mail firmy.';
        return;
      }
      e.preventDefault();
      stav.textContent = 'Odosielam…';
      fetch(endpoint, { method: 'POST', body: new FormData(f), headers: { Accept: 'application/json' } })
        .then(function (r) { if (!r.ok) throw new Error(r.status); f.reset(); stav.textContent = 'Ďakujeme, správa bola odoslaná.'; })
        .catch(function () { stav.textContent = 'Odoslanie sa nepodarilo. Napíšte nám prosím e-mailom.'; });
    });
  });
})();

// Libela v hero: bublinka sa vychyľuje podľa posunu stránky.
(function () {
  var b = document.querySelector('.bublina');
  if (!b || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var t = false;
  function upd() { t = false; var y = window.scrollY, h = Math.max(1, window.innerHeight);
    b.style.setProperty('--dx', (Math.sin(y / h * 3.1) * 55) + 'px'); }
  window.addEventListener('scroll', function () { if (!t) { t = true; requestAnimationFrame(upd); } }, { passive: true });
})();

// Dopredu načíta aj rozšírenú latinku (ě š č ř ž ů), aby sa diakritika nikdy nekreslila náhradným písmom.
if (document.fonts && document.fonts.load) {
  ['400 1em "Barlow"', '600 1em "Barlow"', '700 1em "Barlow Condensed"'].forEach(function (f) { document.fonts.load(f, 'ěščřžýáíéůúĚŠČŘŽ'); });
}
