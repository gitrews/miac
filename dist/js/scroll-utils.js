/*
 * Scroll utilities:
 *  1. Click on the scroll-hint button smoothly scrolls to the scheme section.
 *  2. Saves/restores scroll position when navigating back from step links.
 */
(function() {
  // Smooth scroll to scheme section when clicking the scroll hint
  document.addEventListener('click', function(e) {
    if (e.target.closest('div[code-path="src/pages/Home.tsx:86:7"]')) {
      var target = document.querySelector('section[code-path="src/pages/Home.tsx:100:5"]');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });

  // Save scroll position before opening a step link (so we can restore on back navigation)
  document.addEventListener('click', function(e) {
    var a = e.target.closest('a[href*="/step/"]');
    if (a) {
      sessionStorage.setItem('miac_scroll_pos', window.scrollY);
    }
  });

  function restoreScroll() {
    var hash = location.hash;
    if (hash === '#/' || hash === '') {
      var pos = sessionStorage.getItem('miac_scroll_pos');
      if (pos) {
        setTimeout(function() {
          window.scrollTo(0, parseInt(pos));
          sessionStorage.removeItem('miac_scroll_pos');
        }, 100);
      }
    }
  }

  window.addEventListener('popstate', restoreScroll);
  restoreScroll();
})();
