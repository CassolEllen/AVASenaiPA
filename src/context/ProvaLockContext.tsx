import { createContext, useContext, useState, type ReactNode } from "react";

type ProvaLockContextType = {
  bloqueado: boolean;
  setBloqueado: (valor: boolean) => void;
};

const ProvaLockContext = createContext<ProvaLockContextType | null>(null);

export function ProvaLockProvider({ children }: { children: ReactNode }) {
  const [bloqueado, setBloqueado] = useState(false);

  return (
    <ProvaLockContext.Provider value={{ bloqueado, setBloqueado }}>
      {children}
    </ProvaLockContext.Provider>
  );
}

export function useProvaLock() {
  const context = useContext(ProvaLockContext);

  if (!context) {
    throw new Error("useProvaLock deve ser usado dentro de ProvaLockProvider");
  }

  return context;
}