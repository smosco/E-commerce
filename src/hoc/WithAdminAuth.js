import useAdminAuth from '../hooks/useAdminAuth';
import { Navigate } from 'react-router-dom';

const WithAdminAuth = ({ children }) => {
  const isAdmin = useAdminAuth();

  if (!isAdmin) return <Navigate to='/login' replace />;

  return <>{children}</>;
};

export default WithAdminAuth;
