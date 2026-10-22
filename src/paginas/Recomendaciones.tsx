import { Link } from 'react-router-dom';

const RECOMENDACIONES = [
  'Respeta el trabajo de artistas y cultores.',
  'Cuida los ojos: no lances cosméticos a la cara.',
  'Pide consentimiento antes de pintar a otra persona.',
  'Respeta las vallas, recorridos y zonas de seguridad.',
  'No dejes basura en las calles.',
];

export default function Recomendaciones() {
  return (
    <div className="info-page">
      <Link className="back-link" to="/exploracion">
        ← Explorar
      </Link>
      <section className="info-panel">
        <img src="/Imagenes/recomendaciones.png" alt="Participante del Carnaval" />
        <div>
          <p className="eyebrow">¿Cómo jugar?</p>
          <h1>Recomendaciones</h1>
          <ol className="recommendation-list">
            {RECOMENDACIONES.map((texto) => (
              <li key={texto}>{texto}</li>
            ))}
          </ol>
          <Link className="button button--primary" to="/uso-kit">
            Aprender a usar el kit
          </Link>
        </div>
      </section>
    </div>
  );
}
