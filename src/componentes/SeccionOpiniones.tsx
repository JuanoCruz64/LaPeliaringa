import { useEffect, useState } from 'react';
import type { Opinion } from '../types/index';
import { FormularioOpinion } from './FormularioOpinion';

const OPINIONES_KEY = 'peliaringa-opiniones';

const OPINIONES_INICIALES: Opinion[] = [
  {
    id: 1,
    autor: 'Laura',
    comentario: 'El kit básico llegó completo y las gafas me ayudaron a cuidar los ojos en el desfile.',
    calificacion: 'Excelente',
  },
  {
    id: 2,
    autor: 'Andrés',
    comentario: 'Muy clara la guía de uso. Me gustó aprender a pedir permiso antes de jugar con pintura.',
    calificacion: 'Buena',
  },
];

function leerOpiniones(): Opinion[] {
  try {
    const guardadas = localStorage.getItem(OPINIONES_KEY);
    return guardadas ? (JSON.parse(guardadas) as Opinion[]) : OPINIONES_INICIALES;
  } catch {
    return OPINIONES_INICIALES;
  }
}

export function SeccionOpiniones() {
  const [opiniones, setOpiniones] = useState<Opinion[]>(leerOpiniones);

  useEffect(() => {
    try {
      localStorage.setItem(OPINIONES_KEY, JSON.stringify(opiniones));
    } catch {
      /* Sin almacenamiento disponible: las opiniones duran mientras la página esté abierta. */
    }
  }, [opiniones]);

  const agregarOpinion = (nueva: Opinion) => {
    setOpiniones([nueva, ...opiniones]);
  };

  const eliminarOpinion = (id: number) => {
    setOpiniones(opiniones.filter((opinion) => opinion.id !== id));
  };

  return (
    <section className="opinions" aria-labelledby="opiniones-titulo">
      <h2 id="opiniones-titulo">Lo que dice la comunidad ({opiniones.length})</h2>
      <div className="opinions__layout">
        <FormularioOpinion onAgregarOpinion={agregarOpinion} />

        <div>
          {/* Renderizado condicional: lista vacía o lista dinámica */}
          {opiniones.length === 0 ? (
            <p className="opinions__empty">Aún no hay opiniones. ¡Sé la primera persona en escribir una!</p>
          ) : (
            <ul className="opinions__list">
              {opiniones.map((opinion) => (
                <li key={opinion.id} className="opinion-card">
                  <div className="opinion-card__top">
                    <strong>{opinion.autor}</strong>
                    <span className={`opinion-badge opinion-badge--${opinion.calificacion.toLowerCase()}`}>
                      {opinion.calificacion}
                    </span>
                  </div>
                  <p>{opinion.comentario}</p>
                  <button
                    type="button"
                    className="opinion-card__delete"
                    onClick={() => eliminarOpinion(opinion.id)}
                    aria-label={`Eliminar la opinión de ${opinion.autor}`}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
