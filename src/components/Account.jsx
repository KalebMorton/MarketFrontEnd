import { useEffect, useState } from 'react';

const Account = ({ token }) => {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await fetch("http://localhost:3000/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json()
        setAccount(result);
      } catch (error) {
        setError("Unable to find account")
      }
    }
    if (token) {
      fetchAccount()
    }
  }, [token])

  const handleRemoveDuck = async (orderId) => {
    try {
      const token = localStorage.getItem("token")
      await fetch(`http://localhost:3000/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    } catch (error) {
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
