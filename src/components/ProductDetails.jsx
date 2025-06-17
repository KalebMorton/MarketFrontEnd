import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductDetails({productDetails, setProductDetails}) {
  const navigate = useNavigate()

  async function getSingleProdct() {
    try {
      const response = await fetch(`url goes here/${passedData.productId}`);
      const rawData = await response.json();

      setSingleProduct(rawData);
    } catch (error) {
      console.log(`!ERROR! ${error}`);
    }
  }

  useEffect(() => {
    //getSingleProdct()
  }, []);

  function backButton() {
    passedData.setSingleProductId(null);
  }

  return (
    <>
      <h2>Product Details</h2>
      {singleProduct && (
        <div>
          <h3>{singleProduct.dataplaceholder1}</h3>
          <p>{singleProduct.dataplaceholder2}</p>
          <p>{singleProduct.dataplaceholder3}</p>
          <button onClick={backButton}>Go Back</button>
        </div>
      )}
    </>
  );
}
