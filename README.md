# PixelyGraphics — GitHub Pages Ready

## Files
- `index.html` — website
- `styles.css` — design/responsive styles
- `script.js` — catalog, order form, WhatsApp flow and editable bank details
- `assets/logo.svg` — temporary logo
- `assets/artworks/` — temporary artwork placeholders

## Change your WhatsApp / bank details
Edit the `CONFIG` object at the top of `script.js`.

## Replace artwork
Replace the SVG files in `assets/artworks/` with your own images, or change the image paths in `script.js`.

## GitHub Pages
Upload the entire folder to a GitHub repository, then:
Settings → Pages → Deploy from a branch → `main` → `/ (root)` → Save.

No database is used. Orders are converted into a WhatsApp message. Payment slips are sent by the customer directly in the WhatsApp chat after the order is placed.
