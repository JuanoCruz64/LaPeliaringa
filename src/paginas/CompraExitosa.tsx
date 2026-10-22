import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { PedidoConfirmado } from '../types/index';
import { formatPrice } from '../utils/formato';
import { ORDEN_KEY } from './Pago';

function leerOrden(): PedidoConfirmado | null {
  try {
    const guardada = sessionStorage.getItem(ORDEN_KEY);
    return guardada ? (JSON.parse(guardada) as PedidoConfirmado) : null;
  } catch {
    return null;
  }
}

export default function CompraExitosa() {
  const [orden] = useState<PedidoConfirmado | null>(leerOrden);

  return (
    <>
      <header className="app-header">
        <Link className="wordmark" to="/">
          PELIARINGA
        </Link>
        <Link className="back-link" to="/">
          Cerrar
        </Link>
      </header>
      <main className="confirmation">
        <p className="confirmation-mark" aria-hidden="true">
          ✓
        </p>
        <p className="eyebrow">Pedido confirmado</p>
        <h1>¡Gracias por celebrar con nosotros!</h1>
        <p>
          {orden
            ? `Recibimos ${orden.items} kit(s) por ${formatPrice(orden.total)}. Te contactaremos pronto.`
            : 'Tu pedido ha sido recibido. Te contactaremos pronto.'}
        </p>
        {orden && !orden.sincronizado && (
          <p className="api-error">
            El servicio de pedidos de prueba no respondió, pero tu pedido quedó registrado en esta simulación.
          </p>
        )}
        <Link className="button button--primary" to="/">
          Volver al inicio
        </Link>
      </main>
    </>
  );
}
