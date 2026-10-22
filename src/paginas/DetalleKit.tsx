import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import { kitPorId } from '../datos/kits';
import { obtenerProducto } from '../servicios/api';
import { formatPrice } from '../utils/formato';

type EstadoApi = 'cargando' | 'disponible' | 'consultar';

export default function DetalleKit() {
  const { id } = useParams();
  const kit = kitPorId(id);
  const { agregarKit } = useCarrito();

  const [cantidad, setCantidad] = useState('1');
  const [mensaje, setMensaje] = useState('');
  const [estadoApi, setEstadoApi] = useState<EstadoApi>('cargando');

  // Tema 4: useEffect consulta la API cada vez que cambia el kit mostrado.
  useEffect(() => {
    if (!kit) return;
    let cancelado = false;
    setEstadoApi('cargando');
    setMensaje('');
    setCantidad('1');

    obtenerProducto(kit.apiId)
      .then(() => {
        if (!cancelado) setEstadoApi('disponible');
      })
      .catch(() => {
        if (!cancelado) setEstadoApi('consultar');
      });

    return () => {
      cancelado = true; // evita actualizar el estado si el usuario ya salió de la página
    };
  }, [kit]);

  if (!kit) {
    return (
      <div className="detail-page">
        <Link className="back-link" to="/compra">
          ← Seguir explorando
        </Link>
        <p className="api-error">No encontramos este kit. Regresa al catálogo para elegir una opción.</p>
      </div>
    );
  }

  const textoDisponibilidad =
    estadoApi === 'cargando'
      ? 'Verificando disponibilidad…'
      : estadoApi === 'disponible'
        ? 'Disponible'
        : 'Consulta disponibilidad';

  const handleAgregar = () => {
    const numero = Math.min(10, Math.max(1, Math.floor(Number(cantidad)) || 1));
    agregarKit(kit, numero);
    setCantidad(String(numero));
    setMensaje('Kit agregado. Puedes revisar el carrito cuando quieras.');
  };

  return (
    <div className="detail-page">
      <Link className="back-link" to="/compra">
        ← Seguir explorando
      </Link>

      <section className="api-detail">
        <img className="kit-detail__image" src={kit.image} alt={`${kit.name} de Peliaringa`} />
        <div>
          <p className="category">{kit.tag}</p>
          <h1>{kit.name}</h1>
          <p className="api-price">{formatPrice(kit.price)}</p>
          <p>{kit.description}</p>
          <h2>Incluye</h2>
          <ul className="kit-includes">
            {kit.includes.map((elemento) => (
              <li key={elemento}>{elemento}</li>
            ))}
          </ul>
          <p className="availability">{textoDisponibilidad}</p>

          <label htmlFor="cantidad">Cantidad</label>
          <div className="buy-row">
            <input
              id="cantidad"
              type="number"
              min={1}
              max={10}
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
            />
            <button className="button button--primary" type="button" onClick={handleAgregar}>
              Agregar al carrito
            </button>
          </div>
          <p className="feedback" aria-live="polite">
            {mensaje}
          </p>
          {mensaje && (
            <Link className="text-link text-link--dark" to="/pago">
              Ir al carrito →
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
