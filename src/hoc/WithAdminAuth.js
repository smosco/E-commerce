import useAdminAuth from '../hooks/useAdminAuth';

const WithAdminAuth = ({ children }) => {
  return useAdminAuth() && <>{children}</>;
};

export default WithAdminAuth;
