// Toggle menu on mobile
const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menu.classList.toggle('active');
    });
}

// Close menu when a link is clicked
if (menu) {
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
        });
    });
}

// GALLERY: load photos (run immediately)
(function () {
  const gallery = document.getElementById('gallery');
  if (!gallery) return;

  // exact filenames (include extension) and use correct folder name (Photos)
  const photoFiles = [
    'DSC07896.JPEG',
    'DSC07884.JPEG',
    'DSC07872.JPEG',
    'DSC07876.JPEG',
    'DSC07922.JPEG',
    'DSC07890.JPEG'
  ];

  function getImageOrientation(img) {
    return img.naturalWidth > img.naturalHeight ? 'landscape' : 'portrait';
  }

  photoFiles.forEach(fileName => {
    const srcPath = `Photos/${fileName}`; // CORRECT: capital P + exact filename + extension
    const img = new Image();
    img.loading = 'lazy';
    img.alt = fileName.replace(/\.[^.]+$/, '').replace(/_/g, ' ');
    img.src = srcPath; // set src after alt/loading for clarity

    img.onload = () => {
      const item = document.createElement('div');
      const orientation = getImageOrientation(img);
      item.className = `gallery-item ${orientation}`;

      // use the already-loaded image element to avoid re-downloading
      item.appendChild(img);
      gallery.appendChild(item);
    };

    img.onerror = () => {
      console.warn('Failed to load image:', srcPath);
    };
  });
})();

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});
