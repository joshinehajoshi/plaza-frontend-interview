import { useRef, useEffect } from "react";

export const useInterval = (callback: () => void, delay: number | null) => {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    const currentCallback = () => {
      if (savedCallback.current) {
        savedCallback.current();
      }
    };

    if (delay !== null) {
      const id = setInterval(currentCallback, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};
