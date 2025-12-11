// background.js — minimal background swapper.
// Changes the #bg-layer background based on clicked category
// and returns to default after 60 seconds.

(function () {
  const bgLayer = document.getElementById("bg-layer");

  // Default background (your main wallpaper GIF)
  const DEFAULT_BG = 'media/background.gif';

  // Map category keys -> background images
  const BG_MAP = {
    cgi:         'media/cgi.gif',
    arcade:      'media/arcade.gif',
    characters:  'media/characters.gif',
    story:       'media/story.gif',
    publication: 'media/publication.gif',
    animation:   'media/animation.gif'
  };

  let resetTimer = null;

  // Preload images + fallback if 404 (GitHub pages sometimes slow)
  function preload(src, callback) {
    const img = new Image();
    img.onload = () => callback(true, src);
    img.onerror = () => callback(false, src);
    img.src = src;
  }

  function setBackground(key) {
    const newBg = BG_MAP[key] || DEFAULT_BG;

    preload(newBg, (ok) => {
      const finalImage = ok ? newBg : DEFAULT_BG;
      bgLayer.style.backgroundImage = `url("${finalImage}")`;
    });

    // Clear any previous timer
    if (resetTimer) {
      clearTimeout(resetTimer);
    }

    // Reset to default after 60 seconds
    resetTimer = setTimeout(() => {
      bgLayer.style.backgroundImage = `url("${DEFAULT_BG}")`;
    }, 60000);
  }

  function onCategoryClick(event) {
    event.preventDefault();
    const key = event.currentTarget.getAttribute("data-key");
    setBackground(key);
  }

  // Attach listeners when DOM loads
  document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".category-link[data-key]");
    links.forEach((link) => {
      link.addEventListener("click", onCategoryClick);
    });

    // Default background on load
    bgLayer.style.backgroundImage = `url("${DEFAULT_BG}")`;
  });
})();
