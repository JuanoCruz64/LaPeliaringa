import { Link } from 'react-router-dom';

export default function Cultura() {
  return (
    <div className="info-page">
      <Link className="back-link" to="/exploracion">
        ← Explorar
      </Link>
      <section className="info-panel">
        <img src="/Imagenes/informacion-cultural.png" alt="Representación cultural del Carnaval" />
        <div>
          <p className="eyebrow">Origen y tradición</p>
          <h1>Información cultural</h1>
          <p>
            El Carnaval de Negros y Blancos reúne música, artesanía, comparsas y juego. Participar con respeto ayuda a
            cuidar a artistas, visitantes y habitantes de la ciudad.
          </p>
          <Link className="button button--primary" to="/recomendaciones">
            Ver recomendaciones
          </Link>
        </div>
      </section>
    </div>
  );
}
