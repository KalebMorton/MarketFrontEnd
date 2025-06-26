import { useEffect, useState } from 'react';

const Account = ({token}) => {
  const [account, setAccount] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
   const fetchAccount = async () => {
    try{
      const response = await fetch("http://localhost:3000/users/me",
        {
          method: "GET",
          headers:{
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`
          }
        }
      )
      const result = await response.json()
        setAccount(result)
    }catch(error){
      setError("Unable to find account")
    }
   }
   if(token){
    fetchAccount()}
  }, [token])

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
        <p><strong>Email:</strong> {user.email || 'Not provided'}</p>
      </div>
    </div>
  );
};

export default Account;
