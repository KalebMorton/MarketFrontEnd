import { useEffect, useState } from 'react';

const Account = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  if (!user) {
    return (
      <div className="account-container">
        <h2>You're not logged in</h2>
        <p>Please <a href="/login">login</a> or <a href="/register">register</a>.</p>
      </div>
    );
  }

  return (
    <div className="account-container">
      <h2>Welcome back, {user.username}!</h2>
      <div className="account-info">
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email || 'Not provided'}</p>
      </div>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
};

export default Account;
