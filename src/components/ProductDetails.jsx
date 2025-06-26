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
      const response = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date: new Date().toISOString().split('T')[0],
          note: `${productDetails.description}`,
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
                <li key={review.id}> <strong>Anonymous</strong>: {review.comment}</li>
               

              ))}
            </ul>
          ) : (
            <p>No reviews yet for this product</p>
          )}
        </div>
        <div className='review-form'>
          <h3>Leave a Review</h3>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
            <label>
              Rating (1-5) : {""}
            </label>
            <input type="number" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} required/>
            </div>
            <div className='form-group'>
            <label>
              Comment:{""}
            </label>
            <textarea value={comment} onChange={(e) => setComment(e.target.value)} required/>
            </div>
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
