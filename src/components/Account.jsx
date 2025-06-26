import { useEffect, useState } from 'react';

const Account = ({token}) => {
  const [account, setAccount] = useState(null)
  const [error, setError] = useState(null)

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

  const handleRemoveDuck = async (orderId) => {
    try{
      const token = localStorage.getItem("token")
      const response = await fetch ("http://localhost:3000/orders",
        {
          method: "DELETE",
          headers: {
            Authorization : `Bearer ${token}`
          }
        }
      )
    }catch(error){
      setError("Unable to remove duck")
    }
  }

  return (
    <div className="account-container">
      <h2>Welcome back, {user.username}!</h2>
      <div className="account-info">
        <p><strong>Username:</strong> {user.username}</p>
      </div>
      <div className="orders">
        <h3>Your Orders</h3>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <ul>
            {orders.map((order) => (
              <li key={order.id}>
                <p><strong>Order ID: </strong>{order.id}</p>
                <p><strong>Date: </strong>{order.date}</p>
                <p><strong>Items: </strong>{order.note}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Account;
