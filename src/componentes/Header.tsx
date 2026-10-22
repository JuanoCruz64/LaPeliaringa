import { Link, useLocation } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';

const EXPLORA = ['/exploracion', '/cultura', '/recomendaciones', '/uso-kit'];

export function Header() {
  const { pathname } = useLocation();
  const { cantidadTotal } = useCarrito();

  const activo = (ruta: string) => (pathname === ruta ? 'page' : undefined);

  return (
    <header className="app-header">
      <Link className="brand-image" to="/">
        <img src="/Imagenes/logo-principal.png" alt="Peliaringa" />
      </Link>
      <nav aria-label="Navegación principal">
        <Link to="/compra" aria-current={pathname === '/compra' || pathname.startsWith('/producto') ? 'page' : undefined}>
          Kits
        </Link>
        <Link to="/exploracion" aria-current={EXPLORA.includes(pathname) ? 'page' : undefined}>
          Explora
        </Link>
        <Link to="/contacto" aria-current={activo('/contacto')}>
          Ayuda
        </Link>
        <Link className="cart-link" to="/pago" aria-current={activo('/pago')}>
          Carrito <span>{cantidadTotal}</span>
        </Link>
      </nav>
    </header>
  );
}
