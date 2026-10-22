import { Link } from 'react-router-dom';
import type { Kit } from '../types/index';
import { formatPrice } from '../utils/formato';

interface TarjetaKitProps {
  kit: Kit;
  disponibilidad: string;
}

// Tema 2: componente funcional que recibe datos por Props.
export const TarjetaKit = ({ kit, disponibilidad }: TarjetaKitProps) => (
  <article className="kit-card">
    <img className="kit-card__image" src={kit.image} alt={`${kit.name} de Peliaringa`} />
    <p className="category">{kit.tag}</p>
    <h2>{kit.name}</h2>
    <p>{kit.description}</p>
    <p className="availability">{disponibilidad}</p>
    <p className="api-price">{formatPrice(kit.price)}</p>
    <Link className="button button--small" to={`/producto/${kit.id}`}>
      Ver kit
    </Link>
  </article>
);
