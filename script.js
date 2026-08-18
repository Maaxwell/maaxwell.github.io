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

// Helper: run fn when DOM is ready
function runWhenReady(fn) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    fn();
  }
}

// GALLERY: thumbnails for grid, medium images for lightbox, soft deterrents
runWhenReady(() => {
  const gallery = document.getElementById('gallery');
  if (!gallery) return;

  // Update this array if you rename files. Use the same base filename in thumb/ and medium/
  const photoFiles = [
    'DSC07896.JPEG',
    'DSC07884.JPEG',
    'DSC07872.JPEG',
    'DSC07876.JPEG',
    'DSC07922.JPEG',
    'DSC07890.JPEG'
  ];

  // create overlay/lightbox
  const overlay = document.createElement('div');
  overlay.id = 'lightbox-overlay';
  overlay.style.cssText = 'position:fixed;inset:0;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,0.85);z-index:9999;padding:20px;';
  const overlayImg = document.createElement('img');
  overlayImg.style.maxWidth = '100%';
  overlayImg.style.maxHeight = '100%';
  overlay.appendChild(overlayImg);
  document.body.appendChild(overlay);

  // soft deterrents on overlay
  overlayImg.addEventListener('contextmenu', e => e.preventDefault());
  overlayImg.addEventListener('dragstart', e => e.preventDefault());

  function openLightbox(mediumSrc, alt) {
    overlayImg.src = mediumSrc;
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
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

  // build grid using thumbnails, open medium in lightbox
  photoFiles.forEach(fileName => {
    const thumbPath = '/Photos/thumb/' + fileName.replace(/\.[^.]+$/, '.jpg');
    const mediumPath = '/Photos/medium/' + fileName.replace(/\.[^.]+$/, '.jpg');

    const item = document.createElement('div');
    item.className = 'gallery-item';

    const img = document.createElement('img');
    img.className = 'gallery-img';
    img.loading = 'lazy';
    img.decoding = 'async';
    img.alt = fileName.replace(/\.[^.]+$/, '').replace(/[_-]/g, ' ');

    // soft deterrents on thumbnails
    img.addEventListener('contextmenu', e => e.preventDefault());
    img.addEventListener('dragstart', e => e.preventDefault());
    img.addEventListener('mousedown', e => { if (e.button === 2) e.preventDefault(); });

    // clicking opens medium image
    img.addEventListener('click', () => openLightbox(mediumPath, img.alt));
    img.addEventListener('keypress', (e) => { if (e.key === 'Enter') openLightbox(mediumPath, img.alt); });

    item.appendChild(img);
    gallery.appendChild(item);

    // set src after listeners are attached
    img.src = thumbPath;

    img.addEventListener('load', () => {
      const orientation = img.naturalWidth >= img.naturalHeight ? 'landscape' : 'portrait';
      item.classList.add(orientation);
    });

    img.addEventListener('error', () => {
      item.classList.add('image-missing');
      item.textContent = 'Image not found';
    });
  });

  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
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
