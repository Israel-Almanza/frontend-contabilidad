import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AplicationConnect from '../../../../core/api/AplicationConnect';

interface EmpresaData {
  nombre?: string;
  descripcion?: string;
  logo?: string;
  banner?: string;
  [key: string]: any;
}

interface EmpresaContextType {
  infoEmpresa: EmpresaData;
  loading: boolean;
  error: string | null;
}

const EmpresaContext = createContext<EmpresaContextType | undefined>(undefined);

interface EmpresaProviderProps {
  children: ReactNode;
}

export const EmpresaProvider: React.FC<EmpresaProviderProps> = ({ children }) => {
  const [infoEmpresa, setInfoEmpresa] = useState<EmpresaData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getEmpresa = async () => {
      try {
        const host = window.location.hostname;
        const subdomain = host.split(".")[0];
        
        const { datos } = await AplicationConnect.post(`/public/comercio/empresas`, {
          dominio: subdomain
        });
        
        setInfoEmpresa(datos);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar datos de la empresa');
        setLoading(false);
      }
    };

    getEmpresa();
  }, []);

  return (
    <EmpresaContext.Provider value={{ infoEmpresa, loading, error }}>
      {children}
    </EmpresaContext.Provider>
  );
};

export const useEmpresa = () => {
  const context = useContext(EmpresaContext);

  if (!context) {
    throw new Error('useEmpresa must be used within an EmpresaProvider');
  }

  return context;
};
