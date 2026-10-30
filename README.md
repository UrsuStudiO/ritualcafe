# Ritual Café

Landing page de demostración para una cafetería de especialidad ficticia en La Paz, Bolivia. Es una pieza de portfolio: no hay clientes, datos ni funcionalidad reales.

## Secciones

1. **Hero**: foto a pantalla completa que se abre desde un arco central mientras se hace scroll, con el título "ritual" y la frase final.
2. **Origen**: foto del cafetal, texto que se ilumina palabra por palabra y tres cifras con contador (altura, familias, días de secado).
3. **Proceso**: tres pasos (cosecha, tostado, taza) en un recorrido horizontal controlado por el scroll vertical, con una línea ondulada que se dibuja.
4. **La barra**: carta de bebidas y comida con precios en bolivianos y una foto fija al costado.
5. **Espacio**: dos fotos con efecto parallax y un texto breve sobre el local.
6. **Cierre / Visítanos**: dirección y horarios de ejemplo, pie de página y enlace de créditos.

## Stack

- [React 19](https://react.dev) + [Vite](https://vite.dev)
- [Tailwind CSS v4](https://tailwindcss.com) (plugin `@tailwindcss/vite`)
- [Motion](https://motion.dev) para las animaciones ligadas al scroll
- [Lenis](https://lenis.darkroom.engineering) para el scroll suave
- [lucide-react](https://lucide.dev) para los iconos
- Tipografías Fraunces e Instrument Sans (Google Fonts)

## Cómo correrlo

```bash
npm install
npm run dev       # servidor de desarrollo
npm run build     # build de producción en dist/
npm run preview   # sirve dist/ localmente
```

## Estructura

```
├── index.html            # entrada; incluye el script que aplica el tema antes del primer pintado
├── public/
│   └── img/              # fotos en WebP (hero, origen, proceso-*, barra, espacio-*)
└── src/
    ├── main.jsx
    ├── App.jsx           # Lenis, MotionConfig y orden de las secciones
    ├── index.css         # Tailwind, paleta clara/oscura y estilos de la transición de tema
    ├── components/
    │   ├── Navbar.jsx    # barra fija con enlaces a las secciones
    │   ├── ThemeToggle.jsx
    │   ├── Fit.jsx       # titulares que se ajustan al ancho disponible
    │   └── Img.jsx       # foto con carga diferida y marcador si falta el archivo
    └── sections/
        ├── Hero.jsx
        ├── Origen.jsx
        ├── Proceso.jsx
        ├── Barra.jsx
        ├── Espacio.jsx
        └── Cierre.jsx
```

## Notas

- **Tema claro/oscuro**: se guarda en `localStorage` (clave `theme`) y, si no hay preferencia guardada, sigue la del sistema. Un script en el `<head>` lo aplica antes de pintar para evitar el parpadeo. El botón de la barra lo cambia con una transición circular (View Transitions API, si el navegador la soporta).
- **Responsive**: diseño mobile-first con los breakpoints de Tailwind. En pantallas menores a `md` los enlaces de la barra se ocultan y queda solo el logo y el botón de tema.
- **Movimiento reducido**: con `prefers-reduced-motion` se desactivan el scroll suave, el parpadeo de palabras, los contadores animados, el arco del hero y el parallax; el contenido se muestra completo y estático.
- **Imágenes**: las fotos de `public/img/` son marcadores de posición en WebP (máx. 1536 px de ancho). Para cambiarlas, reemplaza los archivos conservando el nombre o actualiza las rutas en `src/sections/`. Si un archivo falta, se muestra su texto alternativo en su lugar.
- **Datos de ejemplo**: la dirección, los horarios, los precios y las cifras son ficticios. La página no tiene formularios ni enlaces a servicios reales; las únicas acciones son la navegación interna entre secciones, el cambio de tema y el enlace de créditos.
