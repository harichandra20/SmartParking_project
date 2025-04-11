import axios from 'axios';

export const isAuthenticated = async () => {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const res = await axios.get('http://localhost:3000/users/verify-token', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (res.status === 200 && res.data.success) {
      localStorage.setItem('id', res.data.userId);
      localStorage.setItem('role', res.data.role);
      localStorage.setItem('Name', res.data.fullName);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Token verification failed:', error);
    localStorage.clear();
    return false;
  }
};

export const logout = () => {
  localStorage.clear();
  window.location.href = '/login';
}; 