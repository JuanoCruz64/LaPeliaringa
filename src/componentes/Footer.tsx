import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="app-footer">
      <p>Proyecto académico · Peliaringa · API de demostración para disponibilidad y pedidos de prueba</p>
      <Link to="/contacto">¿Necesitas ayuda?</Link>
    </footer>
  );
}
