import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductDetails({productDetails, setProductDetails}) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [order, setOrder] = useState([])
  const token = localStorage.getItem("token")

useEffect(()=> {
  const fetchProductDetails = async () => {
    try{
      const response = await fetch ("ADD URL HERE")
      const result = await response.json()
      setProductDetails(result)
    }catch(error){
      setError("Unable to find details")
    }
  }
  fetchProductDetails()
}, [id])

const handleReserve = async () => {
  if(!token){
    alert("You must be logged in to see orders and reviews")
    return navigate("/login")
  }
  try{
    const response = await fetch("URL HERE", 
      {
        method: "POST",
        headers: {
          "Content-Type" : "application/json",
          Authorization : `Bearer ${token}`
        },
        body: JSON.stringify({
          productId: productDetails.id,
        })
      }
    )
    const result = await response.json()
    setOrder(result)
    alert("Added to your order!")
    navigate("/account")
  }catch(error){
    setError("Unable to add to order")
  }
}

  return (
    <>
    <div>
      <h1>Product Details</h1>
      {productDetails ? (
      <>
        <div>
          <img src={productDetails.image}/>
          <h2>{productDetails.title}</h2>
          <p>Price: {productDetails.price}</p>
          <p>Description: {productDetails.description}</p>
          <br></br>
          <button onClick={handleReserve}>Add to Order</button>
          <br></br>
          <br></br>
          <button onClick={() => navigate("/products")}>Back to Ducks</button>
        </div>  
        </>
      ) : (
        <p>Loading Details...</p>
      )}
    </div>
    </>
  )
}
