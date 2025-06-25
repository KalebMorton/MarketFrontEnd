import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ProductDetails({productDetails, setProductDetails}) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [order, setOrder] = useState([])
  const [reviews, setReviews] = useState([])
  const [rating, setRating] = useState("")
  const [comment, setComment] = useState("")
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
    if (!token) {
      alert("You must be logged in to see orders and reviews");
      return navigate("/login");
    }
    try {
      const response = await fetch("http://localhost:3000/account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: productDetails.id,
        }),
      })
      const result = await response.json()
      setOrder(result);
      alert("Added to your order!")
      navigate("/account")
    } catch (error) {
      setError("Unable to add to order")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!token) {
      alert("You must be logged in to leave a review")
      return navigate("/login")
    }

  try {
    const response = await fetch(`http://localhost:3000/products/${id}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        rating: parseInt(rating),
        comment,
      }),
    })
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to submit review");
    }
    setRating("")
    setComment("")

    const reviewsResponse = await fetch(`http://localhost:3000/products/${id}/reviews`)
    const reviewsResult = await reviewsResponse.json()
    setReviews(reviewsResult)
    alert("Review submitted!")
  }catch(error){
    setError(error.message || "Error submitting review")
  }}


  return (
    <div className='ducky-container'>
    <div>
      <h2>Ducky Details</h2>
      {error && <p>{error}</p>}
      {productDetails ? (
      <>
        <div className='ducky-details'>
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
        <div className='reviews'>
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
        <div>
          <h3>Leave a Review</h3>
          <form onSubmit={handleSubmit}>
            <label>
              Rating(1-5) : {""}
              <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} required/>
            </label>
            <br></br>
            <label>
              Comment:{""}
              <textarea value={comment} onChange={(e) => setComment(e.target.value)} required/>
            </label>
            <br></br>
            <button type="submit">Submit Review</button>
          </form>
        </div>
        </>
      ) : (
        <p>Loading Details...</p>
      )}
    </div>
    </div>
  )
}
