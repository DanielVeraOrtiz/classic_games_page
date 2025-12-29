# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Memoization

Este apartado es por si necesito recordar como se usan estas herramientas provistas por React.

## Aclaración useCallback y useMemo

- **useCallback**: Para funciones que se pasan a hijos memoizados.
- **useMemo**: Para cálculos costosos que dependen de props/estado y quieres evitar recalcular cada render.

En la práctica useCallback evita que se rehaga una función y usa todo el rato la dirección a memoria de la
función antes creada, a no ser que cambien las dependencias.

Por otro lado, cabe destacar que en general useMemo no se usa si cálculos costosos son necesitados en el primer
render y por ello están en un useEffect que con [] se ejecuta al montarse.

## Aclaración usando React.memo

Aquí esta el punto clave: 

- Layout hace re-render cada vez que cambia isOpen, esto hace que todo lo que esta dentro haga re-render, provocando una jerarquía de re-renders. Por ejemplo si cambia isOpen, entonces hay re-render de layout, lo cual renderiza de nuevo la navbar y esta a su vez a sus hijos que son el logo y el botón.

- Lo anterior se puede evitar usando React.memo, que solo si no cambian las props entonces usando el render anterior en el rerender del layout. Sin embargo, a pesar de que React.memo memoize navbar, esta ocupara el render anterior, pero si hará re-render de sus hijos componentes. Por lo que de ser necesario estos deben llevar React.memo también. En caso contrario puede navbar no hacer re-render, pero el logo si (Comprobado por consoles.logs).

- También es importante que React.memo verifica en teoría props, pero si se pasan con context, estos cambios tambien implican re-renders no evitables por React.memo.

- Por último, este comportamiento descrito dista de las páginas puestas en el layout por outlet, se estima que es por este último que evita que sea igual a colocar los componentes como hijos directos, por lo que un re-render de layout no hace re-render de la página colocada en outlet, de ninguna en particular.
