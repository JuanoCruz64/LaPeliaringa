import { Link } from 'react-router-dom';

export default function UsoKit() {
  return (
    <div className="info-page">
      <Link className="back-link" to="/exploracion">
        ← Explorar
      </Link>
      <section className="info-panel">
        <img src="/Imagenes/uso-de-kits.png" alt="Elementos para usar en el Carnaval" />
        <div>
          <p className="eyebrow">Celebra con cuidado</p>
          <h1>Uso del kit</h1>
          <p>
            Usa el poncho y las gafas para protegerte. Antes de aplicar pintura o cosméticos, pregunta siempre a la
            persona. Evita ojos y rostro, y conserva los empaques hasta poder desecharlos correctamente.
          </p>
          <Link className="button button--primary" to="/compra">
            Elegir un kit
          </Link>
        </div>
      </section>
    </div>
  );
}
