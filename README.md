# Max Conaghan Photography

Your photography portfolio website built with GitHub Pages.

## How to Add Photos

1. **Create a `photos` folder** in your repository (if it doesn't exist)
2. **Upload your photos** to the `photos` folder
3. **Edit `script.js`** and add your photo filenames to the `photoFiles` array

### Example:
In `script.js`, find this section:
```javascript
const photoFiles = [
    // Add your photo filenames here
];
```

And add your photos like this:
```javascript
const photoFiles = [
    'photo-1.jpg',
    'photo-2.jpg',
    'photo-3.jpg',
];
```

The site will automatically detect landscape vs portrait orientation and arrange them accordingly.

## Customization

- Edit `contact.html` and `purchase.html` to customize those pages
- Update email/phone in contact.html
- Modify colors and spacing in `styles.css`

## Mobile vs Desktop

- **Mobile:** Menu button in top left, photos stack below name
- **Desktop:** Name and menu fixed on left sidebar, photos on right

## Going Live

Your site should automatically be live at `https://maaxwell.github.io`

To use a custom domain, check GitHub Pages settings in your repository.

Enjoy your portfolio!