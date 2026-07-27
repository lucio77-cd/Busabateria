import { useEffect, useState } from "react";

export function useDebounce(valor, delayMs = 400) {
  const [valorDebounced, setValorDebounced] = useState(valor);

  useEffect(() => {
    const timer = setTimeout(() => setValorDebounced(valor), delayMs);
    return () => clearTimeout(timer);
  }, [valor, delayMs]);

  return valorDebounced;
}
