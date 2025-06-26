import { useEffect, useState } from "react";

const Account = ({ token }) => {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);

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

        if (!response.ok) {
          const errorText = await response.text()
          console.error("Error fetching account:", errorText)
          setError("Unable to fetch account")
          return
        }
        const result = await response.json()
        setAccount(result)
        setOrders(result.orders || [])
        setReviews(result.reviews || [])
      } catch (error) {
        console.error("Error fetching account", error)
        setError("Unable to find account")
      }
    };
  
    if (token) {
      fetchAccount();
    }
  }, [token]);

  if (!account) {
    return <p>Loading your account...</p>;
  }

  const handleRemoveDuck = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:3000/orders/${orderId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      setError("Unable to remove duck");
    }
  };
  console.log("Rendering reviews", reviews)
  return (
    <div className="account-container">
      <h2>Welcome back, {account?.user?.username}!</h2>
      <div className="account-info">
        <p>
          <strong>Username:</strong> {account.user.username}
        </p>
      </div>
      <div className="orders">
        <h3>Your Orders</h3>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <ul>
            {orders.map((order) => (
              <li key={order.id}>
                <p>
                  <strong>Order ID: </strong>
                  {order.id}
                </p>
                <p>
                  <strong>Date: </strong>
                  {order.date}
                </p>
                <p>
                  <strong>Items: </strong>
                  {order.note}
                </p>
                <button onClick={() => handleRemoveDuck(order.id)}>Remove Duck</button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="reviews">
        <h3>Your Reviews</h3>
        {reviews.length === 0 ? (
          <p>You haven’t left any reviews yet.</p>
        ) : (
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>
                <p><strong>Product:</strong> {review.product || "Unknown"}</p>
                <p><strong>Rating:</strong> {review.rating}</p>
                <p><strong>Comment:</strong> {review.comment}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Account;
