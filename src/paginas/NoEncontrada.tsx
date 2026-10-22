import { Link } from 'react-router-dom';

export default function NoEncontrada() {
  return (
    <div className="info-page">
      <p className="eyebrow">Error 404</p>
      <h1>Esta página no existe</h1>
      <p>Revisa la dirección o vuelve al inicio para seguir explorando.</p>
      <Link className="button button--primary" to="/">
        Volver al inicio
      </Link>
    </div>
  );
}
