import React from 'react';

function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div>
      <h2>Welcome to your Dashboard</h2>
      {user ? (
        <p>Hello, {user.username}!</p>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
}

export default Dashboard;
