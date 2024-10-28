interface User {
  username: string;
  role: 'admin' | 'user';
}

export const authenticate = (username: string, password: string): User | null => {
  if (username === 'admin' && password === 'admin') {
    return { username: 'admin', role: 'admin' };
  }
  return null;
};

export const useAuth = () => {
  const isAuthenticated = !!localStorage.getItem('user');
  const user: User | null = isAuthenticated 
    ? JSON.parse(localStorage.getItem('user') || '{}')
    : null;

  const login = (username: string, password: string) => {
    const user = authenticate(username, password);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('user');
  };

  return { isAuthenticated, user, login, logout };
};