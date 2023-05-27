import { useEffect, useState } from "react";

export function useFold(value) {
  const [fold, setFold] = useState(value);

  useEffect(() => {
    setFold(value);
  }, [value]);

  return [fold, setFold];
}
