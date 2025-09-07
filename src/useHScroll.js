import { useEffect, useRef, useState } from "react";

export function useHScroll({ onNearEnd } = {}) {
  const rowRef = useRef(null);
  const [canScrollLeft, setCanLeft] = useState(false);
  const [canScrollRight, setCanRight] = useState(false);

  const updateScrollButtons = () => {
    const el = rowRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 0);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  const scrollBy = (dx) => {
    const el = rowRef.current;
    if (!el) return;
    el.scrollBy({ left: dx, behavior: "smooth" });
    if (dx > 0 && onNearEnd) {
      const nearEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 240;
      if (nearEnd) onNearEnd();
    }
    setTimeout(updateScrollButtons, 50);
  };

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const onScroll = () => {
      updateScrollButtons();
      if (onNearEnd) {
        const nearEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 240;
        if (nearEnd) onNearEnd();
      }
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    updateScrollButtons();
    return () => el.removeEventListener("scroll", onScroll);
  }, [onNearEnd]);

  useEffect(() => {
    const onResize = () => updateScrollButtons();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return {
    rowRef,
    canScrollLeft,
    canScrollRight,
    updateScrollButtons,
    scrollLeft: () => scrollBy(-600),
    scrollRight: () => scrollBy(600),
  };
}