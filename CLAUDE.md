# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static, multilingual website displaying the "Decalogue of Open Knowledge" - a set of ten principles for open knowledge. The site supports 5 languages (Spanish, Catalan, Galician, Basque, and English) with dynamic language switching and print functionality.

## Development Commands

This is a static website with no build process. To work with the project:

- **Local development**: Open `index.html` directly in a web browser or serve via any static web server
- **Testing**: Manual testing in browser - no automated test suite exists
- **Deployment**: Copy files to any static hosting service (GitHub Pages, Netlify, etc.)

## Architecture & Structure

### Core Components

- **index.html**: Main page structure with semantic HTML and i18n attributes (`data-i18n-key`)
- **script.js**: Client-side JavaScript handling:
  - Async loading of translations from `locales.json`
  - Dynamic language switching with localStorage persistence
  - Print functionality
  - Browser language detection
- **style.css**: Responsive CSS with dedicated print styles and mobile-first design
- **locales.json**: Translation data structure with keys for UI elements and content items

### Key Architecture Patterns

- **Internationalization**: Uses `data-i18n-key` attributes for translatable elements
- **Progressive Enhancement**: Fallback content and error handling for missing translations
- **Responsive Design**: Mobile-first CSS with print-optimized styles
- **Client-side Rendering**: Dynamic content population via JavaScript DOM manipulation

### Language System

The translation system uses a dynamic, configuration-driven approach:

**Core Components:**
- `locales/config.json`: Central language configuration with metadata
- `locales/{lang}.json`: Individual language translation files
- Dynamic discovery and loading of available languages

**Language Configuration Structure:**
```json
{
  "languages": [
    {
      "code": "es", 
      "name": "Spanish",
      "nativeName": "Español",
      "default": true
    }
  ]
}
```

**Translation File Structure:**
Each `locales/{lang}.json` contains:
- UI strings (titles, buttons, labels)
- `items` array: The 10 decalogue principles
- Structured as `{key: value, items: [...]}`

**Adding New Languages:**
1. Create new translation file: `locales/{new-lang}.json`
2. Add language entry to `locales/config.json`
3. No code changes required - system auto-discovers new languages

Available languages: Dynamically loaded from config.json

The script loads the config first, then all language files in parallel using `Promise.all()` for optimal performance.

### File Dependencies

- `locales/config.json` → `script.js` (language discovery)
- `locales/*.json` → `script.js` (async fetch)
- `script.js` → `index.html` (DOM manipulation)
- `style.css` → `index.html` (styling)
- Image files (`abierto.png`, `abierto_reducido.png`) for logo display

**Language Management:**
- Add languages by editing `locales/config.json` and creating corresponding JSON files
- Default language configurable via `"default": true` flag
- Browser language detection with fallback to configured default