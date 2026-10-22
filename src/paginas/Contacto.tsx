import { Link } from 'react-router-dom';

export default function Contacto() {
  return (
    <div className="contact-page">
      <Link className="back-link" to="/">
        ← Inicio
      </Link>
      <section className="contact-panel">
        <div>
          <p className="eyebrow">Estamos aquí para ayudarte</p>
          <h1>Contáctanos</h1>
          <p>
            Si tienes dudas sobre los kits o la forma de vivir el Carnaval, escríbenos por el canal que prefieras.
          </p>
          <address className="social-list">
            <a href="https://instagram.com/lapeliaringa" target="_blank" rel="noopener noreferrer">
              <span className="social-icon social-icon--instagram" aria-hidden="true">
                ◎
              </span>{' '}
              Instagram <b>@lapeliaringa</b>
            </a>
            <a href="https://facebook.com/peliaringa" target="_blank" rel="noopener noreferrer">
              <span className="social-icon social-icon--facebook" aria-hidden="true">
                f
              </span>{' '}
              Facebook <b>/peliaringa</b>
            </a>
            <a href="https://wa.me/57300456789" target="_blank" rel="noopener noreferrer">
              <span className="social-icon social-icon--whatsapp" aria-hidden="true">
                ☎
              </span>{' '}
              WhatsApp <b>300 456 789</b>
            </a>
            <a href="mailto:lapeliaringa@gmail.com">
              <span className="social-icon social-icon--email" aria-hidden="true">
                ✉
              </span>{' '}
              Correo <b>lapeliaringa@gmail.com</b>
            </a>
          </address>
        </div>
        <img className="contact-character" src="/Imagenes/compras.png" alt="Personaje de Peliaringa" />
      </section>
    </div>
  );
}
