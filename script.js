
(function () {
  const btn      = document.getElementById('toggleBtn');
  const video    = document.getElementById('wildlifeVideo');
  const wrapper  = document.querySelector('.video-wrapper');

  // Icons 
  const ICON_PLAY = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
      fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z"/></svg>`;

  const ICON_PAUSE = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
      fill="currentColor" aria-hidden="true">
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;

  const ICON_SHOW = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
      fill="currentColor" aria-hidden="true">
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5
               11 7.5s9.27-3.11 11-7.5C21.27 7.61 17 4.5 12
               4.5zm0 12.5a5 5 0 1 1 0-10 5 5 0 0 1 0 10zm0-8a3
               3 0 1 0 0 6 3 3 0 0 0 0-6z"/></svg>`;

  function setButtonState(state) {
    // state
    const labels = {
      playing: { icon: ICON_PAUSE, text: 'Pause Video' },
      paused:  { icon: ICON_PLAY,  text: 'Play Video'  },
      hidden:  { icon: ICON_SHOW,  text: 'Show Video'  },
    };
    const { icon, text } = labels[state];
    btn.innerHTML = icon + text;
    btn.setAttribute('aria-label', text);
  }

  btn.addEventListener('click', function () {
    const isHidden = wrapper.getAttribute('aria-hidden') === 'true';

    if (isHidden) {
      // Show and play
      wrapper.style.display = 'block';
      wrapper.setAttribute('aria-hidden', 'false');
      video.play();
      setButtonState('playing');
      return;
    }

    if (video.paused) {
      video.play();
      setButtonState('playing');
    } else {
      video.pause();
      wrapper.style.display = 'none';
      wrapper.setAttribute('aria-hidden', 'true');
      setButtonState('hidden');
    }
  });

  // Keep button in sync incase of native controls
  video.addEventListener('play',  () => setButtonState('playing'));
  video.addEventListener('pause', () => {
    const isHidden = wrapper.getAttribute('aria-hidden') === 'true';
    if (!isHidden) setButtonState('paused');
  });

  
  setButtonState('paused');
})();