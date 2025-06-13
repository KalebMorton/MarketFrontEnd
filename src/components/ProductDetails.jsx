import { useEffect, useState } from "react";

export default function ProductDetails(passedData) {
  const [singleProduct, setSingleProduct] = useState(null);

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
      <h2>ProductDetails</h2>
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
