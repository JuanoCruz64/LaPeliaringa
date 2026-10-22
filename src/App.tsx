import { Route, Routes } from 'react-router-dom';
import { Layout } from './componentes/Layout';
import Inicio from './paginas/Inicio';
import Catalogo from './paginas/Catalogo';
import DetalleKit from './paginas/DetalleKit';
import Pago from './paginas/Pago';
import CompraExitosa from './paginas/CompraExitosa';
import Exploracion from './paginas/Exploracion';
import Cultura from './paginas/Cultura';
import Recomendaciones from './paginas/Recomendaciones';
import UsoKit from './paginas/UsoKit';
import Contacto from './paginas/Contacto';
import NoEncontrada from './paginas/NoEncontrada';

export default function App() {
  return (
    <Routes>
      {/* La confirmación tiene su propia cabecera, por eso va fuera del Layout */}
      <Route path="/compra-exitosa" element={<CompraExitosa />} />

      <Route element={<Layout />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/compra" element={<Catalogo />} />
        <Route path="/producto/:id" element={<DetalleKit />} />
        <Route path="/pago" element={<Pago />} />
        <Route path="/exploracion" element={<Exploracion />} />
        <Route path="/cultura" element={<Cultura />} />
        <Route path="/recomendaciones" element={<Recomendaciones />} />
        <Route path="/uso-kit" element={<UsoKit />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="*" element={<NoEncontrada />} />
      </Route>
    </Routes>
  );
}
