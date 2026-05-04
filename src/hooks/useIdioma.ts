import { useEffect, useState } from "react";

export type Idioma = "pt" | "en";

const STORAGE_KEY = "ava_idioma";

export function useIdioma() {
  const [idioma, setIdiomaState] = useState<Idioma>(() => {
    const idiomaSalvo = localStorage.getItem(STORAGE_KEY);

    if (idiomaSalvo === "en" || idiomaSalvo === "pt") {
      return idiomaSalvo;
    }

    return "pt";
  });

  function setIdioma(novoIdioma: Idioma) {
    localStorage.setItem(STORAGE_KEY, novoIdioma);
    setIdiomaState(novoIdioma);

    window.dispatchEvent(
      new CustomEvent("idiomaChange", {
        detail: novoIdioma,
      })
    );
  }

  useEffect(() => {
    function handleIdiomaChange(event: Event) {
      const customEvent = event as CustomEvent<Idioma>;

      if (customEvent.detail === "pt" || customEvent.detail === "en") {
        setIdiomaState(customEvent.detail);
      }
    }

    window.addEventListener("idiomaChange", handleIdiomaChange);

    return () => {
      window.removeEventListener("idiomaChange", handleIdiomaChange);
    };
  }, []);

  return {
    idioma,
    setIdioma,
  };
}