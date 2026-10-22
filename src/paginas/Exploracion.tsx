import { Link } from 'react-router-dom';

export default function Exploracion() {
  return (
    <div className="explore-page">
      <Link className="back-link" to="/">
        ← Inicio
      </Link>
      <div className="catalog-intro">
        <p className="eyebrow">Conoce antes de celebrar</p>
        <h1>Explora el Carnaval</h1>
        <p>Información breve y clara para disfrutar una celebración respetuosa.</p>
      </div>
      <section className="explore-grid">
        <Link className="explore-card" to="/cultura">
          <img src="/Imagenes/informacion-cultural.png" alt="Información cultural del Carnaval" />
          <span>Información cultural</span>
        </Link>
        <Link className="explore-card" to="/recomendaciones">
          <img src="/Imagenes/recomendaciones.png" alt="Recomendaciones para el Carnaval" />
          <span>Recomendaciones</span>
        </Link>
        <Link className="explore-card" to="/uso-kit">
          <img src="/Imagenes/uso-de-kits.png" alt="Uso responsable de los kits" />
          <span>Uso del kit</span>
        </Link>
      </section>
    </div>
  );
}
