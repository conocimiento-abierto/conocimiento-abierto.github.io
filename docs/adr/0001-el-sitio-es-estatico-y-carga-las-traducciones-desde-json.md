# 1. El sitio es estático y carga las traducciones desde JSON

Fecha: 2026-09-23 · Estado: aceptado (registro retroactivo)

## Contexto

El decálogo es un texto breve que debe leerse en varios idiomas, imprimirse y
publicarse sin servidor en GitHub Pages.

## Decisión

Una sola página (`index.html`, `style.css`, `script.js`) sin proceso de
construcción. Los textos de cada idioma están en `locales/<código>.json`, y
`locales/config.json` define los idiomas disponibles y su orden. El idioma se
elige por el navegador, por `?lang=xx` o por el selector, y se recuerda en el
navegador.

## Alternativas descartadas

- **Una página por idioma**: obliga a repetir la estructura en cada una.
- **Un generador de sitios**: añade un paso de construcción que un texto de
  diez puntos no necesita.

## Consecuencias

Cambiar el texto del decálogo exige cambiarlo en todos los archivos de
`locales/`, y subir la versión que figura en su pie.
