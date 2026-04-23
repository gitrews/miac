/*
 * Step placeholder overlay:
 *  Shows a full-screen placeholder for steps accessed directly via hash URL
 *  (e.g. #/step/2 → loads step2.html, #/step/3,5-10 → generic stub).
 *  Steps 1 and 4 are NOT handled here; they rely on the React app / modal.
 */
(function() {
  var overlay = document.getElementById('step-placeholder-overlay');
  var title = document.getElementById('step-placeholder-title');
  var copy = document.getElementById('step-placeholder-copy');

  function checkHash() {
    var step = location.hash.split('/').pop();
    var contentDiv = overlay.querySelector('div[style*="border-radius:28px"]');

    if (step === '2') {
      if (!contentDiv.dataset.originalHtml) {
        contentDiv.dataset.originalHtml = contentDiv.innerHTML;
      }
      contentDiv.innerHTML = '<iframe src="./step2.html" style="width:100%;height:85vh;border:1px solid rgba(26,43,60,0.08);border-radius:12px;background:#fff;"></iframe>';
      overlay.style.display = 'block';
      document.body.style.overflow = 'hidden';
    } else if (/^#\/step\/(3|5|6|7|8|9|10)$/.test(location.hash)) {
      if (contentDiv.dataset.originalHtml) {
        contentDiv.innerHTML = contentDiv.dataset.originalHtml;
        delete contentDiv.dataset.originalHtml;
      }
      title.textContent = 'Шаг ' + step + ' - Заглушка';
      copy.textContent = 'Здесь будет полноценный экран шага ' + step + '. Пока оставляем этот маршрут как временную заглушку.';
      overlay.style.display = 'block';
      document.body.style.overflow = 'hidden';
    } else {
      if (contentDiv.dataset.originalHtml) {
        contentDiv.innerHTML = contentDiv.dataset.originalHtml;
        delete contentDiv.dataset.originalHtml;
      }
      overlay.style.display = 'none';
      document.body.style.overflow = '';
    }
  }

  window.addEventListener('hashchange', checkHash);
  window.addEventListener('load', checkHash);
  checkHash();
})();
