import { useContext } from "react";
import { AuthContext } from "../contextos/AuthContext";

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) throw new Error("useAuth deve estar dentro de AuthProvider");
  return contexto;
}
