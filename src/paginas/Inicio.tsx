import { Link } from 'react-router-dom';
import { SeccionOpiniones } from '../componentes/SeccionOpiniones';

export default function Inicio() {
  return (
    <>
      <section className="welcome welcome--with-image">
        <div>
          <p className="eyebrow">Carnaval de Negros y Blancos</p>
          <h1>
            Vive el Carnaval
            <br />
            con respeto y color.
          </h1>
          <p>Encuentra kits para celebrar, aprende a usarlos y compra en pocos pasos.</p>
          <div className="action-row">
            <Link className="button button--primary" to="/compra">
              Ver kits
            </Link>
            <Link className="text-link" to="/exploracion">
              Aprender antes de jugar →
            </Link>
          </div>
        </div>
        <img className="hero-character" src="/Imagenes/compras.png" alt="Personaje Peliaringa con accesorios del Carnaval" />
      </section>

      <section className="quick-guide" aria-labelledby="guia-titulo">
        <h2 id="guia-titulo">Todo claro desde el inicio</h2>
        <div className="guide-grid">
          <article>
            <span>1</span>
            <h3>Elige tu kit</h3>
            <p>Explora opciones, precios y lo que incluye cada kit.</p>
          </article>
          <article>
            <span>2</span>
            <h3>Revisa tu carrito</h3>
            <p>Cambia cantidades antes de confirmar el pedido.</p>
          </article>
          <article>
            <span>3</span>
            <h3>Disfruta con cuidado</h3>
            <p>Consulta recomendaciones para el Carnaval.</p>
          </article>
        </div>
      </section>

      <SeccionOpiniones />
    </>
  );
}
