# Instrucciones para agentes

Web estática y multilingüe que publica el **Decálogo del conocimiento abierto**
(https://conocimiento-abierto.github.io/), de Juan José de Haro. No hay proceso
de construcción ni dependencias: `index.html` funciona abierto como archivo
local o desde cualquier servidor, porque las traducciones son archivos `.js`
cargados con `<script>` y no con `fetch`.

## Archivos

- `index.html`: estructura, iconos de Lucide en un `<svg>` de símbolos y el
  arranque del tema en `<head>` para que no parpadee.
- `style.css`: aspecto claro y oscuro, tarjetas en dos columnas desde 56rem y
  estilos de impresión.
- `script.js`: carga los idiomas, rellena el decálogo, menú de idiomas, tema e
  impresión. No envía ningún dato ni lleva analítica.
- `locales/idiomas.js`: idiomas disponibles, su nombre propio y su orden.
- `locales/<código>.js`: textos de cada idioma. Cada principio de `items` va
  como `<strong>Título</strong>: texto`, que el script separa en título y párrafo.
- `recursos/`: logo, tipografía Atkinson Hyperlegible (OFL) y licencia de Lucide.
- `LICENSE` (AGPL v3, código) y `LICENSE-CONTENIDOS` (CC BY-SA 4.0, textos).
- `docs/adr/`: registro de decisiones, en castellano.

## Al cambiar algo

- Un cambio en el texto del decálogo se hace en **todos** los idiomas y sube la
  versión que figura en el pie (`footer` de cada idioma).
- Un idioma nuevo necesita su `locales/<código>.js` con todas las claves, su
  entrada en `locales/idiomas.js` y su `<script>` en `index.html`.
- La recomendación de licencias debe coincidir con la de la guía
  https://vibe-coding-educativo.github.io/vibe-responsable/ (ADR 2).
- Probar en Chromium, Firefox y WebKit, en escritorio y móvil, en claro y oscuro.
- Las decisiones que condicionen el trabajo futuro se anotan en `docs/adr`
  (`nuevo-adr "Título"`).
