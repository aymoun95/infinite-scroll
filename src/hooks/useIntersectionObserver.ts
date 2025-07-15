import { useEffect, useRef } from "react";

export function useIntersectionObserver(callback: () => void) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const ref = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    const options = {
      root: rootRef.current,
      threshold: 1.0,
      rootMargin: "0px",
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback();
      }
    }, options);

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [callback]);

  return { ref, rootRef };
}
