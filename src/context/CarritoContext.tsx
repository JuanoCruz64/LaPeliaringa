import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { CartItem, Kit } from '../types/index';

const CART_KEY = 'peliaringa-carrito';

function leerCarrito(): CartItem[] {
  try {
    const guardado = localStorage.getItem(CART_KEY);
    return guardado ? (JSON.parse(guardado) as CartItem[]) : [];
  } catch {
    return [];
  }
}

interface CarritoContextValue {
  carrito: CartItem[];
  cantidadTotal: number;
  total: number;
  agregarKit: (kit: Kit, cantidad: number) => void;
  cambiarCantidad: (id: number, delta: number) => void;
  vaciarCarrito: () => void;
}

const CarritoContext = createContext<CarritoContextValue | undefined>(undefined);

export function CarritoProvider({ children }: { children: ReactNode }) {
  const [carrito, setCarrito] = useState<CartItem[]>(leerCarrito);

  // Tema 3 (useEffect): sincroniza el carrito con localStorage cada vez que cambia.
  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(carrito));
    } catch {
      /* Si el navegador bloquea el almacenamiento, el carrito sigue en memoria. */
    }
  }, [carrito]);

  const agregarKit = useCallback((kit: Kit, cantidad: number) => {
    setCarrito((previo) => {
      const existente = previo.find((item) => item.id === kit.id);
      if (existente) {
        return previo.map((item) =>
          item.id === kit.id ? { ...item, quantity: item.quantity + cantidad } : item,
        );
      }
      return [...previo, { id: kit.id, name: kit.name, price: kit.price, quantity: cantidad }];
    });
  }, []);

  const cambiarCantidad = useCallback((id: number, delta: number) => {
    setCarrito((previo) =>
      previo
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const vaciarCarrito = useCallback(() => setCarrito([]), []);

  const cantidadTotal = useMemo(
    () => carrito.reduce((suma, item) => suma + item.quantity, 0),
    [carrito],
  );
  const total = useMemo(
    () => carrito.reduce((suma, item) => suma + item.price * item.quantity, 0),
    [carrito],
  );

  const valor = useMemo(
    () => ({ carrito, cantidadTotal, total, agregarKit, cambiarCantidad, vaciarCarrito }),
    [carrito, cantidadTotal, total, agregarKit, cambiarCantidad, vaciarCarrito],
  );

  return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>;
}

export function useCarrito(): CarritoContextValue {
  const contexto = useContext(CarritoContext);
  if (!contexto) {
    throw new Error('useCarrito debe usarse dentro de <CarritoProvider>');
  }
  return contexto;
}
