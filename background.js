// background.js — minimal background swapper.
// Changes the #bg-layer background based on clicked category
// and returns to default after 60 seconds.

(function () {
  const bgLayer = document.getElementById("bg-layer");

  // Default background (your main wallpaper GIF)
  const DEFAULT_BG = 'media/background.gif';

  // Map category keys -> background images or video poster frames
  const BG_MAP = {
    cgi:        'media/cgi.gif',
    arcade:     'media/arcade.gif',
    characters: 'media/characters.gif',
    story:      'media/story.gif',
    publication:'media/publication.gif',
    animation:  'media/animation.gif'
  };

  let resetTimer = null;

  function setBackground(key) {
    const newBg = BG_MAP[key] || DEFAULT_BG;
    bgLayer.style.backgroundImage = `url("${newBg}")`;

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

  // Attach listeners to all category links
  document.addEventListener("DOMContentLoaded", () => {
    const links = document.querySelectorAll(".category-link[data-key]");
    links.forEach((link) => {
      link.addEventListener("click", onCategoryClick);
    });

    // Ensure default background on load
    bgLayer.style.backgroundImage = `url("${DEFAULT_BG}")`;
  });
})();
