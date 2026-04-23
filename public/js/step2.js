(function() {
  const stage = document.getElementById('widgetStage');
  const frames = [
    document.getElementById('frame0'),
    document.getElementById('frame1'),
    document.getElementById('frame2')
  ];
  let current = 0;
  let isAnimating = false;

  stage.addEventListener('click', function() {
    if (isAnimating) return;
    isAnimating = true;

    const outgoing = frames[current];
    current = (current + 1) % frames.length;
    const incoming = frames[current];

    // Старый уходит вправо
    outgoing.classList.remove('active');
    outgoing.classList.add('exit-right');

    // Новый появляется слева
    incoming.classList.remove('exit-right');
    incoming.classList.add('active');

    setTimeout(function() {
      outgoing.classList.remove('exit-right');
      isAnimating = false;
    }, 500);
  });
})();
