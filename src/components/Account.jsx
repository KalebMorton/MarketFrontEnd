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
