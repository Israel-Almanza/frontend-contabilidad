import { Outlet } from 'react-router-dom';
import { EmpresaProvider } from './EmpresaContext';
const EmpresaLayout = () => {
  return (
    <EmpresaProvider>
      <Outlet />
    </EmpresaProvider>
  );
};

export default EmpresaLayout;
