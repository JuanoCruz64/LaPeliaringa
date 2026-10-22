import type { ApiProduct } from '../types/index';

export const API_URL = 'https://fakestoreapi.com';

async function pedirJson<T>(ruta: string, opciones?: RequestInit): Promise<T> {
  const respuesta = await fetch(`${API_URL}${ruta}`, opciones);
  if (!respuesta.ok) {
    throw new Error('Error en la respuesta del servidor');
  }
  return (await respuesta.json()) as T;
}

/** GET /products?limit=n  -> sincroniza la disponibilidad del catálogo. */
export function obtenerProductos(limite: number): Promise<ApiProduct[]> {
  return pedirJson<ApiProduct[]>(`/products?limit=${limite}`);
}

/** GET /products/:id  -> valida la disponibilidad de un kit en el detalle. */
export function obtenerProducto(id: number): Promise<ApiProduct> {
  return pedirJson<ApiProduct>(`/products/${id}`);
}

export interface PedidoApi {
  userId: number;
  date: string;
  products: { productId: number; quantity: number }[];
}

/** POST /carts  -> registra un pedido simulado. */
export function crearPedido(pedido: PedidoApi): Promise<unknown> {
  return pedirJson<unknown>('/carts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pedido),
  });
}
