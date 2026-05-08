"use client";

import { useState, useEffect } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => {
      const scrollable = document.body.scrollHeight > window.innerHeight + 100;
      const scrolled = window.scrollY > 200;
      setVisible(scrollable && scrolled);
    };

    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    check();

    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="group fixed z-50 flex flex-col items-center gap-1 transition-opacity duration-200"
      style={{
        bottom: "2rem",
        right: "max(1rem, calc(50vw - 24rem - 4rem))",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <span className="rounded border border-gray-200 bg-white px-2 py-0.5 text-xs text-gray-500 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        回到顶部
      </span>
      <button
        onClick={scrollToTop}
        className="flex h-10 w-10 items-center justify-center rounded-[5px] border border-gray-200 bg-white text-xl text-gray-400 transition-colors hover:text-gray-600"
        aria-label="回到顶部"
      >
        &uarr;
      </button>
    </div>
  );
}
