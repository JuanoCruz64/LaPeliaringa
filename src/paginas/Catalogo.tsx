import { useState } from 'react';
import { TarjetaKit } from '../componentes/TarjetaKit';
import { KITS } from '../datos/kits';
import { useDisponibilidad } from '../hooks/useDisponibilidad';

export default function Catalogo() {
  const [busqueda, setBusqueda] = useState('');
  const { productos, cargando, error, consultar } = useDisponibilidad(3);

  const termino = busqueda.toLowerCase().trim();
  const kitsFiltrados = KITS.filter((kit) =>
    `${kit.name} ${kit.tag} ${kit.description}`.toLowerCase().includes(termino),
  );

  const disponibilidadDe = (indice: number): string => {
    if (cargando) return 'Verificando…';
    return productos[indice] ? 'Disponible' : 'Consultar disponibilidad';
  };

  const kitsDisponibles = KITS.filter((_, indice) => productos[indice]).length;

  let estadoApi = `Disponibilidad sincronizada · ${kitsDisponibles} kits listos para consultar`;
  if (cargando) estadoApi = 'Conectando disponibilidad…';
  else if (error) estadoApi = error;

  return (
    <div className="catalog-page">
      <section className="catalog-banner">
        <div className="catalog-intro">
          <p className="eyebrow">Compra fácil y clara</p>
          <h1>Kits para el Carnaval</h1>
          <p>
            Elige el kit que más se adapte a tu plan. Los artículos son propios de Peliaringa y la disponibilidad se
            consulta mediante la API del proyecto.
          </p>
        </div>
        <img src="/Imagenes/kit-carnaval.png" alt="Composición de accesorios para el Carnaval" />
      </section>

      <div className="catalog-tools">
        <div>
          <label htmlFor="busqueda">Buscar un kit</label>
          <input
            id="busqueda"
            type="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Ej. básico o premium..."
          />
        </div>
        <div className="catalog-tools__status">
          <p aria-live="polite">{estadoApi}</p>
          <button className="button button--small" type="button" onClick={consultar} disabled={cargando}>
            {cargando ? 'Consultando API...' : 'Actualizar disponibilidad'}
          </button>
        </div>
      </div>

      {error && !cargando && (
        <p className="api-error" role="alert">
          No se pudo conectar con la API externa. Verifique su red.
        </p>
      )}

      <section className="api-grid" aria-live="polite">
        {kitsFiltrados.length === 0 ? (
          <p>No encontramos kits con esa búsqueda. Prueba con otra palabra.</p>
        ) : (
          kitsFiltrados.map((kit) => (
            <TarjetaKit key={kit.id} kit={kit} disponibilidad={disponibilidadDe(KITS.indexOf(kit))} />
          ))
        )}
      </section>
    </div>
  );
}
