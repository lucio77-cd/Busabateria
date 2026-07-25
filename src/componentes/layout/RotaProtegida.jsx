import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export function RotaProtegida({ rolesPermitidos, children }) {
  const { usuario, role, carregando } = useAuth();

  if (carregando) return <p>Carregando...</p>;
  if (!usuario) return <Navigate to="/login" replace />;
  if (!rolesPermitidos.includes(role)) return <Navigate to="/" replace />;

  return children;
}
