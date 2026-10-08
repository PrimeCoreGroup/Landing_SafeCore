# SafeCore Landing Page

Landing page oficial de **SafeCore**, sistema autónomo de protección ante sismos, incendios y riesgos secundarios, desarrollado por **PrimeCore Group**.

> **Detecta. Actúa. Protege.**

---

## Descripción

SafeCore es una solución tecnológica IoT que combina detección, procesamiento Edge, validación y actuación automática para reducir el tiempo de reacción humano ante emergencias en edificios residenciales y comerciales. Esta landing page presenta la propuesta de valor, la arquitectura técnica, el contexto real del problema en Perú, una cartera de clientes de demostración y un formulario de contacto para solicitar una demo.

El sitio es una landing page **frontend puro**: no requiere backend, base de datos ni proceso de compilación. Basta con abrir `index.html`, o publicarlo tal cual en GitHub Pages / Netlify / Vercel.

**Demo en vivo:** https://jeanxp404x.github.io/SafeCore/

---

## Funcionalidades

- **Selector de idioma ES | EN** en la barra de navegación (y en el menú móvil), con diccionario completo en `js/i18n.js`. Recuerda el idioma elegido entre visitas.
- **Modo claro / oscuro** (🌙 / ☀️) mediante variables CSS, también persistente entre visitas.
- **Planes por segmento**: sección `#planes` con selector Hogares (B2C) / Empresas (B2B), 6 planes (Evacúa, Evacúa Plus, Evacúa Total, Edificio, Constructor, Enterprise), bloque "núcleo + agregados" y nota de evacuación. Precios referenciales en soles. Se editan en las tarjetas `<article class="plan-card">` de `index.html` y sus textos en `js/i18n.js` (claves `plans.*`).
- **Cartera de clientes en carrusel continuo**: sección `#clientes` con 15 clientes ficticios (nombre, cargo, empresa, comentario y fotografía), en loop infinito sin cortes, con pausa automática al pasar el mouse o tocar la pantalla.
- **Noticias con imágenes reales**: la sección "El riesgo está presente" usa la portada real (`og:image`) de cada artículo citado (La República, Infobae, Perú21), no fotos de stock genéricas.
- **Composiciones smart home / smart building** en Hero, "¿Qué es SafeCore?", Problemática, Tecnología, Beneficios y Segmento Hogares, usando imágenes propias en `assets/images/smart/`.
- Animaciones al hacer scroll, formulario de contacto con validación, y diseño totalmente responsive.

---

## Tecnologías

- HTML5 semántico
- CSS3 (variables CSS, Grid, Flexbox, animaciones, modo oscuro nativo)
- JavaScript Vanilla ES6+ (sin frameworks ni librerías externas)
- SVG y PNG para iconografía, logotipos y composiciones visuales
- Google Fonts (Poppins + Inter)
- Intersection Observer API para animaciones al hacer scroll
- `requestAnimationFrame` para el loop continuo del carrusel de clientes
- `localStorage` para recordar idioma y tema

No se utiliza React, Vue, Angular, Bootstrap, Tailwind, jQuery ni ningún framework adicional.

---

## Estructura del proyecto

```text
Landing_SafeCore/
│
├── index.html
│
├── css/
│   └── styles.css
│
├── js/
│   ├── main.js        # navegación, formulario, animaciones, carrusel de clientes, tema
│   └── i18n.js         # diccionario y motor de traducción ES/EN
│
├── assets/
│   ├── images/
│   │   ├── logo-safecore-mark.png   # logo oficial (con transparencia)
│   │   ├── favicon-safecore.png
│   │   ├── logo-safecore.svg        # wordmark alternativo (no referenciado en index.html)
│   │   ├── clients/                 # 15 fotografías recortadas (cliente-01.jpg … cliente-15.jpg)
│   │   ├── logo-primecore.svg
│   │   ├── og-image.svg
│   │   └── smart/
│   │       ├── smart-01-solar-home.png
│   │       ├── smart-02-home-hub.png
│   │       ├── smart-03-phone-app.png
│   │       ├── smart-04-building-tower.png
│   │       ├── smart-05-city-icons.png
│   │       └── smart-06-building-dashboard.png
│   └── icons/
│       └── favicon.svg
│
└── README.md
```

---

## Secciones de la página (en orden)

| # | ID | Sección |
|---|---|---|
| 1 | `#inicio` | Hero |
| 2 | `#que-es` | ¿Qué es SafeCore? |
| 3 | `#problema` | El problema que resolvemos |
| 4 | `#por-que` | ¿Por qué necesitamos SafeCore? |
| 5 | `#contexto` | El riesgo está presente (noticias reales) |
| 6 | `#del-problema-a-la-solucion` | Del problema a la solución |
| 7 | `#solucion` | Una respuesta inteligente ante emergencias |
| 8 | `#como-funciona` | Tecnología Edge-Cloud |
| 9 | `#beneficios` | ¿Por qué elegir SafeCore? |
| 10 | `#para-quien` | Segmentos: Inmobiliarias y Hogares |
| 11 | `#planes` | Planes por segmento (Hogares B2C / Empresas B2B) |
| 12 | `#clientes` | Cartera de clientes + testimonios (carrusel demo) |
| 13 | `#contacto` | CTA final / formulario de contacto |

---

## Ejecución local

```bash
# Con Python 3
python3 -m http.server 8080

# Luego visita:
http://localhost:8080
```

También puedes abrir `index.html` directamente en el navegador.

---

## Despliegue

Actualmente publicado en **GitHub Pages** (rama `main`, carpeta raíz) en https://jeanxp404x.github.io/SafeCore/. También puede desplegarse igual de simple en **Netlify** o **Vercel** arrastrando la carpeta o conectando el repositorio — es un sitio 100% estático, sin build step.

---

## Personalización

| Elemento | Dónde modificarlo |
|---|---|
| Colores (claro y oscuro) | Variables CSS en `css/styles.css`, bloques `:root` y `[data-theme="dark"]` |
| Textos en español / inglés | Atributos `data-i18n` en `index.html` + diccionario `SAFECORE_TRANSLATIONS` en `js/i18n.js` |
| Logo | `assets/images/logo-safecore-mark.png` (navbar y footer) |
| Cartera de clientes | Tarjetas `<article class="client-card">` dentro de `#clientes` en `index.html`; velocidad del carrusel: constante `SPEED_PX_PER_SEC` en `js/main.js`, función `initClientsCarousel()` |
| Noticias | Tarjetas `<article class="news-card">` dentro de `#contexto` |
| Formulario | `#contacto` en `index.html` y lógica en `js/main.js` (`initContactForm`) |

---

## Notas importantes

- **Cartera de clientes**: nombres, empresas y fotos son **ficticios**, generados solo para la demostración. Las fotografías (`assets/images/clients/`) fueron proporcionadas por el equipo del proyecto y recortadas alrededor del rostro; las personas retratadas **no son clientes reales** de SafeCore. Reemplazar por clientes y testimonios reales antes de producción.
- **Formulario de contacto**: es una demostración frontend (valida campos, muestra mensaje de éxito) pero no envía datos a ningún servidor. Conectar a un backend o servicio de formularios real antes de producción.
- **Imágenes de noticias**: se usan las portadas reales de cada medio citado (La República, Infobae, Perú21), enlazadas directamente a sus servidores. Si el medio actualiza o retira la nota, la imagen podría dejar de cargar (el sistema de `photo-frame` muestra un ícono de respaldo en ese caso).

---

## Fuentes y referencias

### Fuentes oficiales

| Fuente | Dato utilizado |
|---|---|
| Instituto Geofísico del Perú (IGP) | Más de 600 sismos registrados en Perú durante 2026 |
| INDECI – SINPAD | 1,935,448 damnificados y 16,404,234 afectados a nivel nacional, periodo 2003–2017 (dato histórico) |
| Cuerpo General de Bomberos Voluntarios del Perú (CGBVP) | 55,308 emergencias atendidas en 2025; 8,900 incendios |

### Fuentes periodísticas

| Medio | Título / tema | Fecha | Enlace |
|---|---|---|---|
| La República | Perú supera los 600 sismos en 2026 | 28/08/2026 | https://larepublica.pe/sociedad/2026/08/28/peru-supera-los-600-sismos-en-2026-que-significa-y-donde-se-concentra-la-mayor-actividad-sismica-segun-igp-774396 |
| La República | Sismo de magnitud 5.1 en Chupaca, Junín | 20/07/2026 | https://larepublica.pe/sociedad/2026/07/20/peru-suma-477-sismos-durante-2026-ica-arequipa-y-lima-concentran-la-mayor-actividad-sismica-segun-igp-1438340 |
| Infobae Perú | Incendio en La Victoria deja diez fallecidos | 22/07/2026 | https://www.infobae.com/peru/2026/07/22/incendio-en-la-victoria-deja-muertos-extorsionadores-habrian-provocado-el-fuego/ |
| Perú21 | Bomberos atendieron más de 55 mil emergencias en 2025 | 02/01/2026 | https://peru21.pe/peru/bomberos-55-mil-emergencias-2025-incendios-lideran-las-estadisticas/ |

---

© 2026 PrimeCore Group. Todos los derechos reservados.
