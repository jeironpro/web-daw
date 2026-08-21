# web-daw

## 📌 Descripción
Este proyecto forma parte de mi portafolio personal.
Reúne el portal índice del ciclo **CFGS Desenvolupament d'Aplicacions Web (DAW)** y las 7 webs estáticas creadas durante el ciclo, desplegadas en GitHub Pages.

El portal (`index.html`) es un catálogo vertical con tema propio (paleta OKLCH, tipografías Plus Jakarta Sans + JetBrains Mono) que agrupa las webs por curso y enlaza cada una con su botón «Obrir».

## 🗂 Estructura

```text
web-daw/
├── index.html                  ← Portal índice del ciclo
├── css/
│   ├── tokens.css              ← Tokens de diseño (OKLCH, tipografías, espaciado)
│   └── portal.css              ← Estilos del portal
├── js/
│   └── portal.js               ← Animaciones de entrada y contadores
├── daw1/                       ← Webs de primer curso
│   ├── web-activitats-ras-daw1/
│   ├── web-calendari-daw1/
│   └── web-qualificacio-ras-daw1/
└── daw2/                       ← Webs de segundo curso
    ├── web-activitats-ras-daw2/
    ├── web-calendari-daw2/
    ├── web-horari-daw2/
    └── web-qualificacio-ras-daw2/
```

## 🌐 Ver en línea
<https://jeironpro.github.io/web-daw/>

Cada web se sirve por ruta relativa desde la raíz del repositorio (p. ej. `daw1/web-calendari-daw1/`).

## 🛠 Desarrollo
No requiere dependencias ni build. Sirve la raíz con cualquier servidor estático:

```bash
python3 -m http.server 8080
```

y abre <http://localhost:8080>.

## ✅ Verificado
- Responsive de 320 a 1440 px sin scroll horizontal (Chrome headless, 28/28 checks)
- Botones «Obrir» con `target="_blank" rel="noopener"`
- `prefers-reduced-motion` respetado: animaciones desactivadas
- Contenido visible sin JavaScript (mejora progresiva)

## 📜 Licencia
Este proyecto está bajo la licencia **MIT**.
Consulta el archivo [LICENSE](LICENSE) para más detalles.
