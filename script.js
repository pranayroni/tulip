document.addEventListener('DOMContentLoaded', () => {
  const tulipContainer = document.querySelector('.tulip-container');
  const stem = document.querySelector('.stem');
  const flower = document.querySelector('.flower');
  const message = document.querySelector('.message');
  const scrollIndicator = document.querySelector('.scroll-indicator');

  function handleScroll() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;

    // Calculate opacity based on scroll position
    const opacity = Math.min((scrollPosition - windowHeight / 2) / 300, 1);

    // Calculate background color transition
    const colorTransition = Math.min(scrollPosition / (document.body.scrollHeight - windowHeight), 1);
    const r = Math.round(255 - (255 - 160) * colorTransition);
    const g = Math.round(255 - (255 - 175) * colorTransition);
    const b = Math.round(255 - (255 - 191) * colorTransition);
    const backgroundColor = `rgb(${r}, ${g}, ${b})`;
    document.body.style.backgroundColor = backgroundColor;

    // Reveal tulip when scrolled halfway
    if (scrollPosition > windowHeight / 2) {
      tulipContainer.style.opacity = opacity;

      // Calculate stem height and flower scale based on scroll position
      const stemHeight = Math.min(160, (scrollPosition - windowHeight / 2) * 0.5);
      stem.style.height = `${stemHeight}px`;

      // Bloom the flower as stem reaches max height
      if (stemHeight >= 150) {
        flower.style.transform = 'scale(1)';
      } else {
        flower.style.transform = 'scale(0)';
      }

      // Reveal message at the end of scroll
      if (stemHeight >= 160) {
        message.style.opacity = '1';
      } else {
        message.style.opacity = '0';
      }

      // Fade out the scroll indicator
      scrollIndicator.style.opacity = 1 - opacity;

      // Create new tulips after the main tulip and message are fully visible
      if (stemHeight >= 160 && scrollPosition % 100 === 0) {
        createTulip();
      }
    } else {
      tulipContainer.style.opacity = '0';
      message.style.opacity = '0';
      scrollIndicator.style.opacity = '1'; // Keep the arrow visible initially
    }
  }

  // Attach scroll event listener
  window.addEventListener('scroll', handleScroll);
});
