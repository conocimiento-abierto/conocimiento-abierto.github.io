// SPDX-License-Identifier: AGPL-3.0-or-later
// Decálogo del conocimiento abierto. No envía ningún dato. Lo único que guarda en
// el navegador es el idioma elegido y el tema, este solo si difiere del dispositivo.
(function () {
  "use strict";

  var CLAVE_TEMA = "conocimiento-abierto:tema";      // la misma que el arranque en <head>
  var CLAVE_IDIOMA = "preferredLanguage";            // nombre heredado: conserva la elección de quien ya visitó la página
  var CC_DEED = { "zh-cn": "zh-hans" };              // idiomas cuya traducción de CC0 lleva otro código

  var traducciones = {};
  var idiomas = [];

  var $ = function (id) { return document.getElementById(id); };
  var leer = function (clave) { try { return localStorage.getItem(clave); } catch (e) { return null; } };
  var guardar = function (clave, valor) {
    try { if (valor === null) { localStorage.removeItem(clave); } else { localStorage.setItem(clave, valor); } } catch (e) {}
  };

  /* ---------- Tema claro u oscuro ---------- */
  // Sigue al del dispositivo mientras no se elija otra cosa. Si se elige justo el
  // que ya trae el dispositivo, se vuelve a seguirlo.
  var sistemaOscuro = window.matchMedia("(prefers-color-scheme: dark)");
  function aplicarTema(oscuro, manual) {
    document.documentElement.dataset.theme = oscuro ? "dark" : "light";
    if (manual) { guardar(CLAVE_TEMA, oscuro === sistemaOscuro.matches ? null : (oscuro ? "dark" : "light")); }
    $("btn-tema").querySelector("use").setAttribute("href", oscuro ? "#i-sun" : "#i-moon");
  }
  sistemaOscuro.addEventListener("change", function (ev) { if (leer(CLAVE_TEMA) === null) { aplicarTema(ev.matches); } });

  /* ---------- Menú de idiomas ---------- */
  var boton = $("btn-idioma"), menu = $("menu-idioma");
  function abrirMenu(abierto) {
    menu.hidden = !abierto;
    boton.setAttribute("aria-expanded", abierto ? "true" : "false");
    if (abierto) {
      var marcado = menu.querySelector("[aria-checked=true]") || menu.querySelector("[role=menuitemradio]");
      marcado.focus();
    }
  }
  function moverFoco(paso) {
    var opciones = Array.prototype.slice.call(menu.querySelectorAll("[role=menuitemradio]"));
    var i = opciones.indexOf(document.activeElement);
    opciones[(i + paso + opciones.length) % opciones.length].focus();
  }
  function rellenarMenu() {
    idiomas.forEach(function (idioma) {
      var li = document.createElement("li");
      li.setAttribute("role", "none");
      var b = document.createElement("button");
      b.type = "button";
      b.setAttribute("role", "menuitemradio");
      b.setAttribute("lang", idioma.code);
      b.dataset.idioma = idioma.code;
      b.textContent = idioma.nativeName;
      b.addEventListener("click", function () { ponerIdioma(idioma.code, true); abrirMenu(false); boton.focus(); });
      li.appendChild(b);
      menu.appendChild(li);
    });
  }

  /* ---------- Textos ---------- */
  function ponerIdioma(codigo, elegido) {
    var t = traducciones[codigo];
    if (!t) { return; }
    document.documentElement.lang = codigo;
    document.title = t.pageTitle.replace(/<[^>]+>/g, "");
    document.querySelectorAll("[data-i18n-key]").forEach(function (el) {
      var clave = el.getAttribute("data-i18n-key");
      if (t[clave]) { el.innerHTML = t[clave]; }
    });
    document.querySelectorAll("[data-i18n-label]").forEach(function (el) {
      var texto = t[el.getAttribute("data-i18n-label")];
      if (texto) { el.title = texto; el.setAttribute("aria-label", texto); }
    });
    // Cada principio llega como «<strong>Título</strong>: texto»; se separa en título y párrafo
    var lista = $("decalogo");
    lista.innerHTML = "";
    t.items.forEach(function (item, i) {
      var partes = item.match(/^\s*<strong>(.*?)<\/strong>\s*[:：]?\s*([\s\S]*)$/);
      var li = document.createElement("li");
      li.className = "principio";
      li.innerHTML = '<span class="cifra" aria-hidden="true">' + (i + 1) + "</span>" +
        "<h2>" + (partes ? partes[1] : "") + "</h2><p>" + (partes ? partes[2] : item) + "</p>";
      lista.appendChild(li);
    });
    $("idioma-actual").textContent = codigo.split("-")[0].toUpperCase();
    $("enlace-cc").href = "https://creativecommons.org/publicdomain/zero/1.0/deed." + (CC_DEED[codigo] || codigo);
    menu.querySelectorAll("[role=menuitemradio]").forEach(function (b) {
      b.setAttribute("aria-checked", b.dataset.idioma === codigo ? "true" : "false");
    });
    if (elegido) { guardar(CLAVE_IDIOMA, codigo); }
  }

  // Orden de preferencia: ?lang= (o ?idioma=), el elegido antes, el del navegador y el predeterminado
  function idiomaInicial() {
    var params = new URLSearchParams(window.location.search);
    var enUrl = (params.get("lang") || params.get("idioma") || "").trim().toLowerCase();
    if (traducciones[enUrl]) { return enUrl; }
    var guardado = leer(CLAVE_IDIOMA);
    if (guardado && traducciones[guardado]) { return guardado; }
    var nav = (navigator.language || "").toLowerCase();
    if (traducciones[nav]) { return nav; }
    if (traducciones[nav.slice(0, 2)]) { return nav.slice(0, 2); }
    var predeterminado = idiomas.filter(function (l) { return l.default; })[0];
    return (predeterminado || idiomas[0]).code;
  }

  // Los textos llegan en locales/*.js, cargados antes que este script desde index.html
  function cargar() {
    traducciones = window.DECALOGO_TEXTOS || {};
    idiomas = (window.DECALOGO_IDIOMAS || []).filter(function (l) { return traducciones[l.code]; })
      .sort(function (a, b) { return (a.order || 0) - (b.order || 0); });
    if (!idiomas.length) { $("decalogo").innerHTML = "<li>No se ha podido cargar el decálogo.</li>"; return; }
    rellenarMenu();
    ponerIdioma(idiomaInicial(), false);
  }

  /* ---------- Eventos ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    aplicarTema(document.documentElement.dataset.theme === "dark");
    $("btn-tema").addEventListener("click", function () {
      aplicarTema(document.documentElement.dataset.theme !== "dark", true);
    });
    $("btn-imprimir").addEventListener("click", function () { window.print(); });
    boton.addEventListener("click", function () { abrirMenu(menu.hidden); });
    menu.addEventListener("keydown", function (ev) {
      if (ev.key === "ArrowDown") { ev.preventDefault(); moverFoco(1); }
      if (ev.key === "ArrowUp") { ev.preventDefault(); moverFoco(-1); }
    });
    document.addEventListener("click", function (ev) {
      if (!menu.hidden && !boton.contains(ev.target) && !menu.contains(ev.target)) { abrirMenu(false); }
    });
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && !menu.hidden) { abrirMenu(false); boton.focus(); }
    });
    cargar();
  });
})();
