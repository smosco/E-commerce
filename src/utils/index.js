import axios from 'axios';

export const checkUserIsAdmin = (currentUser) => {
  if (!currentUser || !Array.isArray(currentUser.userRoles)) return false;

  const { userRoles } = currentUser;
  return userRoles.includes('admin');
};

export const apiInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const formatPrice = (price) => {
  if (typeof price === 'number') {
    return price.toLocaleString('ko-KR');
  } else if (typeof price === 'string') {
    return parseInt(price).toLocaleString('ko-KR');
  } else {
    return '0';
  }
};
