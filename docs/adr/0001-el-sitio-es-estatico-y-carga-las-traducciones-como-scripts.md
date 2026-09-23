# 1. El sitio es estático y carga las traducciones como scripts

Fecha: 2026-09-23 · Estado: aceptado (registro retroactivo)

## Contexto

El decálogo es un texto breve que debe leerse en varios idiomas, imprimirse y
publicarse sin servidor en GitHub Pages.

## Decisión

Una sola página (`index.html`, `style.css`, `script.js`) sin proceso de
construcción. Los textos de cada idioma están en `locales/<código>.js`, y
`locales/idiomas.js` define los idiomas disponibles y su orden. Se cargan con
`<script>` desde `index.html`, no con `fetch`, para que la página funcione
también abierta como archivo local (Chromium bloquea `fetch` con `file://`),
igual que los idiomas de Sirena. El idioma se
toma, por este orden, de `?lang=xx` (o `?idioma=xx`), de la elección anterior
guardada en el navegador, del idioma del navegador y del predeterminado. Cada
principio se escribe como `<strong>Título</strong>: texto`, y el script lo
separa en título y párrafo. El antiguo `locales.json`, con todos los idiomas en
un archivo, ya no se usaba y se ha retirado.

## Alternativas descartadas

- **Una página por idioma**: obliga a repetir la estructura en cada una.
- **Un generador de sitios**: añade un paso de construcción que un texto de
  diez puntos no necesita.
- **Traducciones en JSON cargadas con `fetch`**: fue la forma original, pero la
  página quedaba en blanco al abrirla descargada con doble clic.

## Consecuencias

Cambiar el texto del decálogo exige cambiarlo en todos los archivos de
`locales/`, y subir la versión que figura en su pie. Un idioma nuevo necesita
además su `<script>` en `index.html`.
