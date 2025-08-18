document.addEventListener('DOMContentLoaded', function() {
    const btnPrint = document.getElementById('btnPrint');
    const langSelector = document.getElementById('lang-selector');
    const decalogueList = document.getElementById('decalogue-list');

    let translations = {};
    let languageConfig = {};

    // Cargar traducciones y configurar la página
    async function loadTranslations() {
        try {
            // Primero cargar la configuración de idiomas
            const configResponse = await fetch('locales/config.json');
            if (!configResponse.ok) {
                throw new Error(`HTTP error loading config: ${configResponse.status}`);
            }
            languageConfig = await configResponse.json();
            
            // Extraer códigos de idioma de la configuración
            const languages = languageConfig.languages.map(lang => lang.code);
            
            // Cargar todas las traducciones en paralelo
            const promises = languages.map(async langCode => {
                const response = await fetch(`locales/${langCode}.json`);
                if (!response.ok) {
                    throw new Error(`HTTP error loading ${langCode}: ${response.status}`);
                }
                const data = await response.json();
                return { langCode, data };
            });
            
            const results = await Promise.all(promises);
            
            // Construir el objeto translations
            results.forEach(({ langCode, data }) => {
                translations[langCode] = data;
            });
            
            populateLangSelector();
            initializeLanguage();
        } catch (error) {
            console.error("Could not load translations:", error);
            // Fallback a un estado de error o idioma por defecto
            decalogueList.innerHTML = '<li>Error al cargar el contenido.</li>';
        }
    }

    // Rellenar el selector de idiomas
    function populateLangSelector() {
        // Ordenar idiomas por el campo 'order' si existe, o por el orden en el array
        const sortedLanguages = [...languageConfig.languages].sort((a, b) => {
            if (a.order !== undefined && b.order !== undefined) {
                return a.order - b.order;
            }
            return 0; // Mantener orden original si no hay campo 'order'
        });

        sortedLanguages.forEach(language => {
            if (translations[language.code]) {
                const option = document.createElement('option');
                option.value = language.code;
                option.textContent = language.nativeName;
                langSelector.appendChild(option);
            }
        });
    }

    // Aplicar las traducciones a la página
    function applyTranslations(lang) {
        const langData = translations[lang];
        if (!langData) return;

        document.querySelectorAll('[data-i18n-key]').forEach(element => {
            const key = element.getAttribute('data-i18n-key');
            if (langData[key]) {
                if (key === 'logoAlt') {
                    element.alt = langData[key];
                } else {
                    element.innerHTML = langData[key];
                }
            }
        });
        
        // Rellenar la lista del decálogo
        decalogueList.innerHTML = ''; // Limpiar lista anterior
        langData.items.forEach(itemText => {
            const li = document.createElement('li');
            li.innerHTML = itemText;
            decalogueList.appendChild(li);
        });

        document.documentElement.lang = lang;
        langSelector.value = lang;
    }

    // Establecer el idioma
    function setLanguage(lang) {
        applyTranslations(lang);
        // Guardar preferencia en localStorage
        try {
            localStorage.setItem('preferredLanguage', lang);
        } catch (e) {
            console.warn("No se pudo guardar la preferencia de idioma en localStorage.");
        }
    }

    // Inicializar el idioma al cargar la página
    function initializeLanguage() {
        // Buscar idioma por defecto en la configuración
        const defaultLang = languageConfig.languages.find(lang => lang.default);
        let preferredLang = defaultLang ? defaultLang.code : languageConfig.languages[0].code;
        
        try {
            const storedLang = localStorage.getItem('preferredLanguage');
            if (storedLang && translations[storedLang]) {
                preferredLang = storedLang;
            } else {
                const browserLang = (navigator.language || navigator.userLanguage).slice(0, 2);
                if (translations[browserLang]) {
                    preferredLang = browserLang;
                }
            }
        } catch (e) {
            console.warn("No se pudo acceder a localStorage.");
        }
        setLanguage(preferredLang);
    }

    // Event Listeners
    btnPrint.addEventListener('click', () => window.print());
    langSelector.addEventListener('change', (e) => setLanguage(e.target.value));

    // Iniciar la aplicación
    loadTranslations();
});
