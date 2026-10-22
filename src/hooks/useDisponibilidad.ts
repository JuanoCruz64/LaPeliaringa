import { useCallback, useEffect, useState } from 'react';
import type { ApiProduct } from '../types/index';
import { obtenerProductos } from '../servicios/api';

/**
 * Tema 3 + Tema 4: useState para guardar datos, estado de carga y error;
 * useEffect para consultar la API automáticamente al montar el componente.
 */
export function useDisponibilidad(limite: number) {
  const [productos, setProductos] = useState<ApiProduct[]>([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const consultar = useCallback(async () => {
    setCargando(true);
    setError(null);
    try {
      const datos = await obtenerProductos(limite);
      setProductos(datos);
    } catch {
      setProductos([]);
      setError('Modo sin conexión: consulta la disponibilidad por nuestros canales.');
    } finally {
      setCargando(false); // Desactiva el estado de carga pase lo que pase
    }
  }, [limite]);

  useEffect(() => {
    consultar();
  }, [consultar]);

  return { productos, cargando, error, consultar };
}
