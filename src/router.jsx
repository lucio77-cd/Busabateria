import { createBrowserRouter } from "react-router-dom";
import Landing from "./paginas/Landing";
import Login from "./paginas/auth/Login";
import Cadastro from "./paginas/auth/Cadastro";
import EscolherPapel from "./paginas/auth/EscolherPapel";
import { RotaProtegida } from "./componentes/layout/RotaProtegida";
import Home from "./paginas/cliente/Home";
import BuscarBateria from "./paginas/cliente/BuscarBateria";
import DashboardLoja from "./paginas/loja/DashboardLoja";
import CatalogoBaterias from "./paginas/loja/CatalogoBaterias";

export const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/login", element: <Login /> },
  { path: "/cadastro", element: <Cadastro /> },
  { path: "/escolher-papel", element: <EscolherPapel /> },
  {
    path: "/painel",
    element: (
      <RotaProtegida rolesPermitidos={["cliente"]}>
        <Home />
      </RotaProtegida>
    ),
  },
  {
    path: "/painel/buscar",
    element: (
      <RotaProtegida rolesPermitidos={["cliente"]}>
        <BuscarBateria />
      </RotaProtegida>
    ),
  },
  {
    path: "/loja",
    element: (
      <RotaProtegida rolesPermitidos={["loja"]}>
        <DashboardLoja />
      </RotaProtegida>
    ),
  },
  {
    path: "/loja/catalogo",
    element: (
      <RotaProtegida rolesPermitidos={["loja"]}>
        <CatalogoBaterias />
      </RotaProtegida>
    ),
  },
]);
