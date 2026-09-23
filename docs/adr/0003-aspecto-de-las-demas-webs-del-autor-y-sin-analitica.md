# 3. Aspecto de las demás webs del autor y sin analítica

Fecha: 2026-09-23 · Estado: aceptado

## Contexto

La página tenía un aspecto antiguo: un botón «🖨️ Imprimir» con emoticono, un
selector de idioma desplegable del navegador, sin tema oscuro y con tipografía
Arial. Cargaba además un contador de visitas en un servidor externo
(bilateria.org), contrario a la preferencia del autor de no añadir analítica
salvo que la pida.

## Decisión

- Barra superior con el logo y tres botones del mismo tamaño con iconos de
  Lucide: idioma (abre un menú con el nombre propio de cada idioma y marca el
  actual), tema claro u oscuro e imprimir. Cada botón lleva su rótulo emergente
  traducido.
- El tema sigue al del dispositivo mientras no se elija otro, con el mismo
  comportamiento que Sirena y la guía de vibe coding.
- Tipografía Atkinson Hyperlegible alojada en el repositorio.
- Cada principio en una tarjeta, con su cifra, su título y su texto; dos
  columnas desde 56rem.
- Pie con el origen y la versión, y debajo «(ɔ) 2025», la autoría y la licencia
  del texto, CC BY-SA 4.0, con el enlace a su traducción en el idioma elegido. El
  (ɔ) anuncia el copyleft y la CC BY-SA le da efecto legal. La licencia del
  código (AGPL v3) queda solo en el repositorio: el código se limita a mostrar el
  texto en varios idiomas y no tiene protagonismo propio, así que no se aplica la
  preferencia general de citar en el pie las dos licencias, pensada para
  programas y actividades. Impresión como documento limpio, sin barra.
- Sin analítica: la página no envía ningún dato.

## Alternativas descartadas

- **Mantener el selector nativo del navegador**: su aspecto cambia con cada
  sistema y no sigue al de las demás webs del autor.
- **Conservar el contador de visitas**: envía una petición a un servidor
  externo en cada visita, y el autor no lo quiere en esta página.

## Consecuencias

Los rótulos de los botones (`printButton`, `language`, `theme`) forman parte de
cada archivo de idioma.
