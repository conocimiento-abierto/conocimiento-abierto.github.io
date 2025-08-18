document.addEventListener('DOMContentLoaded', function() {
            // Elementos DOM
            const btnPrint = document.getElementById('btnPrint');
            const langButtons = {
                es: document.getElementById('btnES'),
                ca: document.getElementById('btnCA'),
                gl: document.getElementById('btnGL'),
                eu: document.getElementById('btnEU'),
                en: document.getElementById('btnEN')
            };
            
            const titles = {
                es: document.getElementById('title-es'),
                ca: document.getElementById('title-ca'),
                gl: document.getElementById('title-gl'),
                eu: document.getElementById('title-eu'),
                en: document.getElementById('title-en')
            };

            const contents = {
                es: document.getElementById('content-es'),
                ca: document.getElementById('content-ca'),
                gl: document.getElementById('content-gl'),
                eu: document.getElementById('content-eu'),
                en: document.getElementById('content-en')
            };
            
            // Función para imprimir
            btnPrint.addEventListener('click', function() {
                window.print();
            });

            // Función para cambiar el idioma
            function setLanguage(lang) {
                // Ocultar todos los contenidos y títulos
                Object.values(titles).forEach(el => el.classList.add('hidden'));
                Object.values(contents).forEach(el => el.classList.add('hidden'));
                
                // Quitar clase active de todos los botones
                Object.values(langButtons).forEach(btn => btn.classList.remove('active'));
                
                // Mostrar el contenido del idioma seleccionado
                if (titles[lang] && contents[lang] && langButtons[lang]) {
                    titles[lang].classList.remove('hidden');
                    contents[lang].classList.remove('hidden');
                    langButtons[lang].classList.add('active');
                    document.documentElement.lang = lang;
                } else {
                    // Fallback a español si el idioma no existe
                    titles.es.classList.remove('hidden');
                    contents.es.classList.remove('hidden');
                    langButtons.es.classList.add('active');
                    document.documentElement.lang = 'es';
                }
                
                // Guardar preferencia en localStorage
                try {
                    localStorage.setItem('preferredLanguage', lang);
                } catch (e) {
                    console.warn("No se pudo guardar la preferencia de idioma en localStorage.");
                }
            }
            
            // Event Listeners para los botones de idioma
            for (const [lang, btn] of Object.entries(langButtons)) {
                btn.addEventListener('click', () => setLanguage(lang));
            }
            
            // Detección de idioma al cargar la página
            function initializeLanguage() {
                let preferredLang = 'es'; // Default language
                try {
                     preferredLang = localStorage.getItem('preferredLanguage');
                } catch (e) {
                    console.warn("No se pudo acceder a localStorage.");
                }
                
                if (preferredLang && langButtons[preferredLang]) {
                    setLanguage(preferredLang);
                    return;
                }
                
                const browserLang = (navigator.language || navigator.userLanguage).slice(0, 2);
                
                if (langButtons[browserLang]) {
                    setLanguage(browserLang);
                } else {
                    setLanguage('es');
                }
            }
            
            initializeLanguage();
        });