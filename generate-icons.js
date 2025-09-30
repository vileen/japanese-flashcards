// Simple icon generator for PWA
// Run with: node generate-icons.js

const fs = require('fs');
const path = require('path');

// Create a simple SVG icon and save it
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

const createSVG = (size) => {
    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FF6B6B;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#4ECDC4;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#grad)" rx="${size * 0.15}"/>
  <text x="50%" y="55%" text-anchor="middle" font-family="Arial, sans-serif" 
        font-size="${size * 0.5}" font-weight="bold" fill="white">あ</text>
</svg>`;
};

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, 'icons');
if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir);
}

// Generate SVG files (browsers support SVG icons)
sizes.forEach(size => {
    const svg = createSVG(size);
    const filename = path.join(iconsDir, `icon-${size}.svg`);
    fs.writeFileSync(filename, svg);
    console.log(`Generated: icon-${size}.svg`);
});

// Create a PNG placeholder (1x1 transparent) with instructions
const placeholderText = `
PWA Icon Placeholders Created!
==============================

SVG icons have been generated in the /icons/ directory.

For better iOS support, you should convert these to PNG:

Option 1: Use the generate-icons.html file
  - Open generate-icons.html in your browser
  - Click "Generate Icons"
  - Move downloaded PNG files to /icons/

Option 2: Use an online converter
  - Visit https://cloudconvert.com/svg-to-png
  - Upload the SVG files from /icons/
  - Download and replace them

Option 3: Use ImageMagick (if installed)
  - Run: brew install imagemagick (on Mac)
  - Then run this script again

The app will work with SVG icons, but PNG is recommended for best compatibility.
`;

fs.writeFileSync(path.join(iconsDir, 'README.txt'), placeholderText);
console.log('\n' + placeholderText);
