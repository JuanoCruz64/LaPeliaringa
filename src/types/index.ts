export interface Kit {
  id: number;
  apiId: number;
  name: string;
  price: number;
  tag: string;
  image: string;
  description: string;
  includes: string[];
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export type Calificacion = 'Excelente' | 'Buena' | 'Regular';

export interface Opinion {
  id: number;
  autor: string;
  comentario: string;
  calificacion: Calificacion;
}

/** Forma mínima de un producto de Fake Store API que usamos en la app. */
export interface ApiProduct {
  id: number;
  title: string;
  price: number;
}

export type MetodoPago = 'Tarjeta de crédito' | 'Pago contra entrega';

export interface PedidoConfirmado {
  total: number;
  items: number;
  sincronizado: boolean;
}
