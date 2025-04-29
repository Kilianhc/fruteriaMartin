export function isAdmin() {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      return user && user.isAdmin;
    } catch {
      return false;
    }
  }