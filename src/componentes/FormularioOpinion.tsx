import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Calificacion, Opinion } from '../types/index';

interface FormularioProps {
  onAgregarOpinion: (nueva: Opinion) => void;
}

// Tema 3: formulario controlado. Cada campo vive en un useState y el envío
// se gestiona con el evento onSubmit.
export const FormularioOpinion = ({ onAgregarOpinion }: FormularioProps) => {
  const [autor, setAutor] = useState('');
  const [comentario, setComentario] = useState('');
  const [calificacion, setCalificacion] = useState<Calificacion>('Excelente');
  const [error, setError] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!autor.trim() || !comentario.trim()) {
      setError('Escribe tu nombre y un comentario para publicar tu opinión.');
      return;
    }

    const nueva: Opinion = {
      id: Date.now(),
      autor: autor.trim(),
      comentario: comentario.trim(),
      calificacion,
    };

    onAgregarOpinion(nueva);
    setAutor('');
    setComentario('');
    setError('');
  };

  return (
    <form className="opinion-form" onSubmit={handleSubmit} noValidate>
      <h3>Comparte tu opinión</h3>

      <label htmlFor="opinion-autor">Nombre</label>
      <input
        id="opinion-autor"
        type="text"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
        placeholder="Ej: Camila"
        maxLength={40}
      />

      <label htmlFor="opinion-comentario">Comentario</label>
      <textarea
        id="opinion-comentario"
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
        placeholder="Cuéntanos cómo fue tu experiencia con Peliaringa"
        rows={3}
        maxLength={240}
      />

      <label htmlFor="opinion-calificacion">Calificación</label>
      <select
        id="opinion-calificacion"
        value={calificacion}
        onChange={(e) => setCalificacion(e.target.value as Calificacion)}
      >
        <option value="Excelente">Excelente</option>
        <option value="Buena">Buena</option>
        <option value="Regular">Regular</option>
      </select>

      {/* Renderizado condicional del mensaje de error */}
      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}

      <button className="button button--primary" type="submit">
        Publicar opinión
      </button>
    </form>
  );
};
