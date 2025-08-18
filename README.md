# Decalogue of Open Knowledge

A static, multilingual website displaying the ten principles of open knowledge with dynamic language switching and print functionality.

## Features

- **Multilingual Support**: Dynamic language system supporting multiple languages
- **Print Optimization**: Dedicated print styles for clean document output
- **Responsive Design**: Mobile-first design that works across all devices
- **Browser Language Detection**: Automatically detects and sets user's preferred language
- **Local Storage**: Remembers language preference across sessions

## Languages

Languages are dynamically loaded from configuration. Check `locales/config.json` for current supported languages.

## Getting Started

### Local Development

This is a static website with no build process required:

```bash
# Option 1: Open directly in browser
open index.html

# Option 2: Serve with Python
python3 -m http.server 8000

# Option 3: Serve with Node.js
npx serve .
```

### Project Structure

```
├── index.html          # Main page structure
├── script.js           # JavaScript for i18n and functionality
├── style.css           # Responsive and print styles
├── locales/
│   ├── config.json     # Language configuration
│   └── *.json          # Translation files
├── abierto.png         # Logo image
└── abierto_reducido.png # Reduced logo for mobile
```

## Adding New Languages

1. Create a new translation file in `locales/{language-code}.json`
2. Add the language entry to `locales/config.json`
3. The system will automatically discover and load the new language

### Translation File Format

```json
{
  "title": "Translated title",
  "subtitle": "Translated subtitle",
  "print": "Print button text",
  "items": [
    "First principle...",
    "Second principle...",
    ...
  ]
}
```

## Deployment

Deploy to any static hosting service:

- **GitHub Pages**: Push to `gh-pages` branch
- **Netlify**: Connect repository and deploy
- **Vercel**: Import project and deploy
- **Traditional hosting**: Upload files to web server

## Technical Details

- **No build process**: Pure HTML, CSS, and JavaScript
- **Async translation loading**: Uses `fetch()` and `Promise.all()` for optimal performance
- **Progressive enhancement**: Graceful fallbacks for missing translations
- **Print-first design**: Optimized for both screen and print media

## Browser Support

Works in all modern browsers that support:
- ES6+ JavaScript features
- CSS Grid and Flexbox
- Fetch API