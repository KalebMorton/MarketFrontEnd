import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductDetails({productDetails, setProductDetails}) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [order, setOrder] = useState([])
  const [reviews, setReviews] = useState([])
  const token = localStorage.getItem("token")

useEffect(()=> {
  const fetchProductDetails = async () => {
    try{
      const response = await fetch (`http://localhost:3000/products/${id}`)
      const result = await response.json()
      setProductDetails(result)

      const reviewsResponse = await fetch(`http://localhost:3000/products/${id}/reviews`)
      if(!reviewsResponse.ok){
        throw new Error("Reviews not found!")
      }
      const reviewsResult = await reviewsResponse.json()
      setReviews(reviewsResult)
    }catch(error){
      setError("Unable to find details or reviews")
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
    const response = await fetch("http://localhost:3000/account", 
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
    <div className='container'>
    <div>
      <h1>Product Details</h1>
      {error && <p>{error}</p>}
      {productDetails ? (
      <>
        <div>
          <img src={productDetails.image}/>
          <h2>{productDetails.title}</h2>
          <p>Price: ${productDetails.price}</p>
          <p>{productDetails.description}</p>
          <br></br>
          <button onClick={handleReserve}>Add to Order</button>
          <br></br>
          <br></br>
          <button onClick={() => navigate("/products")}>Back to Ducks</button>
        </div>  
        <div>
          <h3>Reviews</h3>
          {reviews.length > 0 ? (
            <ul>
              {reviews.map ((review) => (
                <li key={review.id}> <strong>{review.user || "Anonymous"}</strong>: {review.comment}</li>
               

              ))}
            </ul>
          ) : (
            <p>No reviews yet for this product</p>
          )}
        </div>
        </>
      ) : (
        <p>Loading Details...</p>
      )}
    </div>
    </div>
  )
}
