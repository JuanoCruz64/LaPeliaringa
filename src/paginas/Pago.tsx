import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import { kitPorId } from '../datos/kits';
import { crearPedido } from '../servicios/api';
import type { MetodoPago, PedidoConfirmado } from '../types/index';
import { formatPrice } from '../utils/formato';

interface Errores {
  nombre?: string;
  telefono?: string;
  correo?: string;
}

export const ORDEN_KEY = 'peliaringa-orden';

export default function Pago() {
  const navigate = useNavigate();
  const { carrito, total, cantidadTotal, cambiarCantidad, vaciarCarrito } = useCarrito();

  // Tema 3: formulario controlado
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [metodo, setMetodo] = useState<MetodoPago>('Tarjeta de crédito');
  const [errores, setErrores] = useState<Errores>({});

  // Tema 4: estados de carga y error de la petición POST
  const [enviando, setEnviando] = useState(false);

  const validar = (): Errores => {
    const nuevos: Errores = {};
    if (nombre.trim().length < 3) nuevos.nombre = 'Escribe tu nombre completo.';
    if (telefono.replace(/\D/g, '').length < 7) nuevos.telefono = 'Escribe un teléfono válido (mínimo 7 dígitos).';
    if (!/^\S+@\S+\.\S+$/.test(correo.trim())) nuevos.correo = 'Escribe un correo electrónico válido.';
    return nuevos;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const nuevos = validar();
    setErrores(nuevos);
    if (Object.keys(nuevos).length > 0) return;

    setEnviando(true);
    let sincronizado = true;

    try {
      await crearPedido({
        userId: 1,
        date: new Date().toISOString().slice(0, 10),
        products: carrito.map((item) => ({
          productId: kitPorId(item.id)?.apiId ?? item.id,
          quantity: item.quantity,
        })),
      });
    } catch {
      // La compra sigue siendo una simulación local aunque la API no responda.
      sincronizado = false;
    } finally {
      setEnviando(false);
    }

    const orden: PedidoConfirmado = { total, items: cantidadTotal, sincronizado };
    try {
      sessionStorage.setItem(ORDEN_KEY, JSON.stringify(orden));
    } catch {
      /* Si no hay sessionStorage, la confirmación mostrará el mensaje general. */
    }
    vaciarCarrito();
    navigate('/compra-exitosa');
  };

  return (
    <div className="checkout-page">
      <Link className="back-link" to="/compra">
        ← Seguir comprando
      </Link>
      <h1>Revisa y confirma</h1>
      <p className="checkout-help">Estás a un paso de terminar. Revisa las cantidades y completa tus datos.</p>

      <div className="checkout-layout">
        <section className="cart-summary" aria-labelledby="resumen">
          <h2 id="resumen">Tu carrito</h2>

          {carrito.length === 0 ? (
            <div>
              <p>Tu carrito está vacío.</p>
              <Link className="button" to="/compra">
                Elegir un kit
              </Link>
            </div>
          ) : (
            <div>
              {carrito.map((item) => (
                <div className="cart-item" key={item.id}>
                  <div>
                    <strong>{item.name}</strong>
                    <small>Kit Peliaringa</small>
                  </div>
                  <div>
                    <button
                      type="button"
                      className="quantity-button"
                      onClick={() => cambiarCantidad(item.id, -1)}
                      aria-label="Restar una unidad"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      type="button"
                      className="quantity-button"
                      onClick={() => cambiarCantidad(item.id, 1)}
                      aria-label="Sumar una unidad"
                    >
                      +
                    </button>
                    <b>{formatPrice(item.price * item.quantity)}</b>
                  </div>
                </div>
              ))}
              <p className="cart-total">
                Total <strong>{formatPrice(total)}</strong>
              </p>
            </div>
          )}
        </section>

        {carrito.length > 0 && (
          <form className="payment-form" onSubmit={handleSubmit} noValidate>
            <h2>Datos de contacto</h2>

            <label htmlFor="name">Nombre completo</label>
            <input
              id="name"
              name="name"
              autoComplete="name"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              aria-invalid={Boolean(errores.nombre)}
            />
            {errores.nombre && <p className="field-error">{errores.nombre}</p>}

            <label htmlFor="phone">Teléfono</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              aria-invalid={Boolean(errores.telefono)}
            />
            {errores.telefono && <p className="field-error">{errores.telefono}</p>}

            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              aria-invalid={Boolean(errores.correo)}
            />
            {errores.correo && <p className="field-error">{errores.correo}</p>}

            <fieldset>
              <legend>Método de pago</legend>
              <label>
                <input
                  type="radio"
                  name="payment"
                  checked={metodo === 'Tarjeta de crédito'}
                  onChange={() => setMetodo('Tarjeta de crédito')}
                />{' '}
                Tarjeta de crédito
              </label>
              <label>
                <input
                  type="radio"
                  name="payment"
                  checked={metodo === 'Pago contra entrega'}
                  onChange={() => setMetodo('Pago contra entrega')}
                />{' '}
                Pago contra entrega
              </label>
            </fieldset>

            {/* Renderizado condicional según el método elegido */}
            <p className="form-note">
              {metodo === 'Tarjeta de crédito'
                ? 'Simulación: no se solicitan datos reales de tarjeta.'
                : 'Pagarás al recibir tu kit.'}
            </p>

            <button className="button button--primary" type="submit" disabled={enviando}>
              {enviando ? 'Confirmando…' : 'Confirmar pedido'}
            </button>
            <p className="form-note">Compra simulada para fines académicos. No se cobra dinero real.</p>
          </form>
        )}
      </div>
    </div>
  );
}
