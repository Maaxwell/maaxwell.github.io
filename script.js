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

// Helper: run fn immediately if DOM ready, otherwise on DOMContentLoaded
function runWhenReady(fn) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    fn();
  }
}

// GALLERY: populate gallery with photos and a minimal lightbox
runWhenReady(() => {
  const gallery = document.getElementById('gallery');
  if (!gallery) return; // nothing to do if no gallery on the page

  // Exact filenames in Photos/ (case-sensitive). Update this array to add/remove images.
  const photoFiles = [
    'DSC07896.JPEG',
    'DSC07884.JPEG',
    'DSC07872.JPEG',
    'DSC07876.JPEG',
    'DSC07922.JPEG',
    'DSC07890.JPEG'
  ];

  // Create a simple lightbox overlay (hidden by default)
  const overlay = document.createElement('div');
  overlay.id = 'lightbox-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,0.85);z-index:9999;padding:20px;';
  const overlayImg = document.createElement('img');
  overlayImg.style.maxWidth = '100%';
  overlayImg.style.maxHeight = '100%';
  overlay.appendChild(overlayImg);
  document.body.appendChild(overlay);

  function openLightbox(src, alt) {
    overlayImg.src = src;
    overlayImg.alt = alt || '';
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.style.display = 'none';
    overlayImg.src = '';
    document.body.style.overflow = '';
  }

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target === overlayImg) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  // Utility to set orientation class after image loads
  function setOrientationClass(container, img) {
    const orientation = img.naturalWidth >= img.naturalHeight ? 'landscape' : 'portrait';
    container.classList.add(orientation);
  }

  // Build gallery items
  photoFiles.forEach(fileName => {
    const srcPath = `Photos/${fileName}`; // must match repo exactly

    // container for item
    const item = document.createElement('div');
    item.className = 'gallery-item';

    // image element
    const img = document.createElement('img');
    img.className = 'gallery-img';
    img.loading = 'lazy';
    img.decoding = 'async';
    img.alt = fileName.replace(/\.[^.]+$/, '').replace(/[_-]/g, ' ');

    // click -> open lightbox with original source
    img.addEventListener('click', () => openLightbox(srcPath, img.alt));

    // handle load / error
    img.addEventListener('load', () => {
      setOrientationClass(item, img);
    });
    img.addEventListener('error', () => {
      console.warn('Failed to load image:', srcPath);
      // show a lightweight placeholder so layout remains stable
      item.classList.add('image-missing');
      item.textContent = 'Image not found';
    });

    // set src after listeners to avoid missing events in some browsers
    img.src = srcPath;

    item.appendChild(img);
    gallery.appendChild(item);
  });

  // Accessibility: focus trap for overlay (basic)
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');

  // If you want a caption under images, you can add a <figcaption> here using the alt text.
});

// Smooth scroll behavior for in-page anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
