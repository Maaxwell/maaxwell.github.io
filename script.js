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

// Load gallery images (only on home page)
const gallery = document.getElementById('gallery');

if (gallery) {
    // Function to detect if image is landscape or portrait
    function getImageOrientation(img) {
        return img.naturalWidth > img.naturalHeight ? 'landscape' : 'portrait';
    }

    // Load images from the 'photos' folder
    async function loadPhotos() {
        try {
            // Fetch list of photos from the photos folder
            const photoFiles = [
                // 'DSC07896',
                // 'DSC07884',
                // 'DSC07872',
                // 'DSC07876',
                // 'DSC07922',
            ];

            photoFiles.forEach(fileName => {
                const img = new Image();
                img.src = `photos/${fileName}`;
                
                img.onload = () => {
                    const item = document.createElement('div');
                    const orientation = getImageOrientation(img);
                    item.className = `gallery-item ${orientation}`;
                    
                    const imgElement = document.createElement('img');
                    imgElement.src = `photos/${fileName}`;
                    imgElement.alt = 'Gallery photo';
                    
                    item.appendChild(imgElement);
                    gallery.appendChild(item);
                };
            });
        } catch (error) {
            console.error('Error loading photos:', error);
        }
    }

    // Load photos when page is ready
    document.addEventListener('DOMContentLoaded', loadPhotos);
}

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
