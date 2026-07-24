import { createBrowserRouter } from "react-router-dom";
import Landing from "./paginas/Landing";
import Login from "./paginas/auth/Login";
import Cadastro from "./paginas/auth/Cadastro";
import { RotaProtegida } from "./componentes/layout/RotaProtegida";
import Home from "./paginas/cliente/Home";
import DashboardLoja from "./paginas/loja/DashboardLoja";
import CatalogoBaterias from "./paginas/loja/CatalogoBaterias";

export const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/login", element: <Login /> },
  { path: "/cadastro", element: <Cadastro /> },
  {
    path: "/painel",
    element: (
      <RotaProtegida rolesPermitidos={["cliente"]}>
        <Home />
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
