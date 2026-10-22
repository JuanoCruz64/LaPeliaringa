# Peliaringa · React + TypeScript + Vite

Versión React de la tienda de kits del Carnaval de Negros y Blancos. Implementa los
**Temas 3, 4 y 5** de la Guía Práctica (Interacción Hombre Máquina · Universidad Mariana).

## Ejecutar en local

```bash
npm install
npm run dev        # abre http://localhost:5173
```

## Qué se implementó (según la guía)

### Paso 1 · Formulario controlado y eventos (Tema 3)
- `src/componentes/FormularioOpinion.tsx`: equivale a `FormularioMetrica.tsx` de la guía.
  Usa `useState` para cada campo, `onChange` en cada input y `onSubmit` con `preventDefault()`.
- `src/componentes/SeccionOpiniones.tsx`: guarda la lista de opiniones en estado,
  la dibuja con `.map()` (renderizado dinámico de listas), muestra un mensaje cuando la
  lista está vacía (renderizado condicional) y permite eliminar opiniones.
- `src/paginas/Pago.tsx`: formulario de compra controlado, con validación y mensajes de error.
- `src/paginas/Catalogo.tsx`: buscador controlado que filtra los kits en vivo.
- `src/context/CarritoContext.tsx`: `useState` + `useEffect` para guardar el carrito en `localStorage`.

### Paso 2 · Consumo de API con fetch (Tema 4)
- `src/servicios/api.ts`: llamadas a Fake Store API con `fetch`, `async/await` y revisión de `response.ok`.
- `src/hooks/useDisponibilidad.ts`: `useEffect` consulta la API al cargar la página; maneja
  `cargando`, `error` y `try / catch / finally`.
- `Catalogo.tsx`: botón **Actualizar disponibilidad** (se bloquea mientras consulta) y aviso de error.
- `DetalleKit.tsx`: valida la disponibilidad de cada kit con `GET /products/:id`.
- `Pago.tsx`: `POST /carts` al confirmar, con botón bloqueado mientras envía (`enviando`).

Para usar otra API, cambia `API_URL` en `src/servicios/api.ts`.

### Paso 3 · Build y despliegue (Tema 5)

```bash
npm run build      # revisa los tipos y genera la carpeta dist/
npm run preview    # prueba la versión de producción en local
```

Subir a GitHub:

```bash
git init
git add .
git commit -m "Peliaringa React"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/peliaringa.git
git push -u origin main
```

Publicar en Vercel:
1. Entra a https://vercel.com e inicia sesión con GitHub.
2. **Add New → Project** y elige el repositorio `peliaringa`.
3. Vercel detecta Vite solo (Build: `npm run build`, Output: `dist`). Pulsa **Deploy**.
4. Obtendrás una URL pública. `vercel.json` ya incluye la regla para que las rutas
   (`/compra`, `/pago`, …) funcionen al recargar la página.

## Estructura

```
src/
├── componentes/   Header, Footer, Layout, TarjetaKit, FormularioOpinion, SeccionOpiniones
├── context/       CarritoContext (estado global del carrito)
├── datos/         kits.ts (catálogo propio de Peliaringa)
├── hooks/         useDisponibilidad.ts
├── paginas/       Inicio, Catalogo, DetalleKit, Pago, CompraExitosa, Exploracion, Cultura, ...
├── servicios/     api.ts (fetch)
├── types/         index.ts (interfaces TypeScript)
└── utils/         formato.ts
public/Imagenes/   imágenes (renombradas sin espacios ni tildes)
```

## Agregar un kit

En `src/datos/kits.ts` añade un objeto al arreglo `KITS` (`id` único, `apiId` entre 1 y 20, `price` numérico,
`image` con la ruta en `public/Imagenes/`). Para que la disponibilidad lo cubra, sube el parámetro de
`useDisponibilidad(3)` en `Catalogo.tsx` al número de kits.
