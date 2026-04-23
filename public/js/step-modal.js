/*
 * Step modal overlay:
 *  Opens a modal with an iframe when clicking on scheme cards.
 *  Uses query param ?step=X for state syncing.
 *  Provides Prev / Next navigation across the 10 steps.
 */
(function() {
  var stepTitles = {
    1: 'Запись в регистратуру',
    2: 'Вызов пациента в окно',
    3: 'Уведомление пациента',
    4: 'Оформление услуг',
    5: 'Завершение обслуживания',
    6: 'Запись на Профосмотр',
    7: 'Вызов пациента в кабинет',
    8: 'Уведомление пациента',
    9: 'Осмотр пациента',
    10: 'Завершение обслуживания'
  };

  var stepFrameRoute = {
    1: '#/step/1',
    2: '#/step/2',
    3: '#/step/3',
    4: '#/step/4',
    5: '#/step/5',
    6: '#/step/6',
    7: '#/step/7',
    8: '#/step/8',
    9: '#/step/9',
    10: '#/step/10'
  };

  var stepLabels = {
    1: { text: 'ВнеОчереди', color: '#E91E8C' },
    2: { text: 'ВнеОчереди', color: '#E91E8C' },
    3: { text: 'ВнеОчереди', color: '#E91E8C' },
    4: { text: 'ЕЦП МИС', color: '#0052CC' },
    5: { text: 'ВнеОчереди', color: '#E91E8C' },
    6: { text: 'ЕЦП МИС → ВнеОчереди', color: '#2EC4B6' },
    7: { text: 'ВнеОчереди', color: '#E91E8C' },
    8: { text: 'ВнеОчереди', color: '#E91E8C' },
    9: { text: 'ЕЦП МИС', color: '#0052CC' },
    10: { text: 'ВнеОчереди', color: '#E91E8C' }
  };

  var modal = document.getElementById('step-modal-overlay');
  var modalKicker = document.getElementById('step-modal-kicker');
  var modalTitle = document.getElementById('step-modal-title');
  var modalLabel = document.getElementById('step-modal-label');
  var modalFrame = document.getElementById('step-modal-frame');
  var modalClose = document.getElementById('step-modal-close');
  var modalPrev = document.getElementById('step-modal-prev');
  var modalNext = document.getElementById('step-modal-next');
  var stepOrder = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  var currentStep = null;

  function openStep(step) {
    if (!stepTitles[step]) return;
    currentStep = step;

    var url = new URL(window.location.href);
    url.searchParams.set('step', String(step));
    history.replaceState({ miacStepModal: step }, '', url.toString());

    modalKicker.textContent = 'Шаг ' + step;
    modalTitle.textContent = stepTitles[step];

    var label = stepLabels[step] || stepLabels[1];
    modalLabel.textContent = label.text;
    modalLabel.style.color = label.color;
    modalLabel.style.background = label.color + '1A';
    modalLabel.style.borderColor = label.color + '2E';

    modalFrame.src = window.location.pathname + '?embedded=1' + stepFrameRoute[step];
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    var index = stepOrder.indexOf(step);
    var prev = index > 0 ? stepOrder[index - 1] : null;
    var next = index < stepOrder.length - 1 ? stepOrder[index + 1] : null;

    modalPrev.disabled = !prev;
    modalPrev.textContent = 'Назад';
    modalPrev.style.display = 'inline-flex';
    modalPrev.style.opacity = modalPrev.disabled ? '0.45' : '1';
    modalPrev.style.cursor = modalPrev.disabled ? 'default' : 'pointer';

    modalNext.disabled = !next;
    modalNext.textContent = 'Дальше';
    modalNext.style.display = 'inline-flex';
    modalNext.style.opacity = modalNext.disabled ? '0.45' : '1';
    modalNext.style.cursor = modalNext.disabled ? 'default' : 'pointer';
  }

  function closeStep() {
    currentStep = null;
    var url = new URL(window.location.href);
    url.searchParams.delete('step');
    history.replaceState({}, '', url.pathname + url.search + url.hash);
    modal.style.display = 'none';
    modalFrame.src = 'about:blank';
    document.body.style.overflow = '';
  }

  function nextStep() {
    var index = stepOrder.indexOf(currentStep);
    if (index < 0 || index >= stepOrder.length - 1) {
      closeStep();
      return;
    }
    openStep(stepOrder[index + 1]);
  }

  function prevStep() {
    var index = stepOrder.indexOf(currentStep);
    if (index <= 0) return;
    openStep(stepOrder[index - 1]);
  }

  function syncStepModal() {
    var step = new URL(window.location.href).searchParams.get('step');
    if (step && stepTitles[step]) {
      openStep(Number(step));
    } else {
      closeStep();
    }
  }

  modalClose.addEventListener('click', closeStep);
  modalPrev.addEventListener('click', prevStep);
  modalNext.addEventListener('click', nextStep);

  window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      closeStep();
    }
  });
  window.addEventListener('popstate', syncStepModal);
  window.addEventListener('hashchange', syncStepModal);
  window.addEventListener('load', syncStepModal);

  function bindGroup(node, step) {
    if (!node || node.dataset.stepModalBound === String(step)) return;
    node.dataset.stepModalBound = String(step);
    node.style.cursor = 'pointer';
    node.setAttribute('role', 'button');
    node.setAttribute('tabindex', '0');

    node.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      if (e.stopImmediatePropagation) e.stopImmediatePropagation();
      openStep(step);
    });
    node.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openStep(step);
      }
    });
  }

  function bindCards() {
    var groups = document.querySelectorAll('svg g[code-path="src/pages/Home.tsx:163:17"]');
    var steps = [1, 2, 3, 4, 5, 7, 8, 9, 10];
    groups.forEach(function(group, index) {
      if (steps[index]) bindGroup(group, steps[index]);
    });
    var banner = document.querySelector('svg g[code-path="src/pages/Home.tsx:184:17"]');
    bindGroup(banner, 6);
  }

  var observer = new MutationObserver(bindCards);
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener('load', bindCards);
  window.addEventListener('hashchange', bindCards);
  bindCards();
})();
