import axios from 'axios';

export const checkUserIsAdmin = (currentUser) => {
  if (!currentUser || !Array.isArray(currentUser.userRoles)) return false;

  const { userRoles } = currentUser;
  return userRoles.includes('admin');
};

export const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});
