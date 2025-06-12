import { useEffect, useState } from "react";
import ProductDetails from "./ProductDetails"

export default function ProductList(passedData){

    const [wholeList, setWholeList] = useState(null)
    const [singleProductId, setSingleProductId] = useState (null)

    async function getProducts() {
        try {
            const response = await fetch("url goes here")
            const rawData = await response.json()

            setWholeList(rawData.map((item) => {
                return <div id="listing">
                    <h3>{item.dataplaceholder1}</h3>
                    <p>{item.dataplaceholder2}</p>
                    <p>{item.dataplaceholder3}</p>
                    <button onClick={handleClick} id={item.placeHolderId}>More Info</button>
                </div>
            }))
        } catch (error) {
            console.log(`!ERROR! ${error}`)
        }
        
    }

    function handleClick(event){
        setSingleProductId(event.tartget.id)
    }

    useEffect(() => {
       //getProducts() 
    },[]);

    return (
        <>
            <h2>Product List</h2>
            {
                //if the singleProductId is null, render wholeList, else render singleProductId
            }
            {singleProductId ? <ProductDetails productId={singleProductId} setSingleProductId={setSingleProductId}/> : (wholeList && <>{wholeList}</>)}
        </>
    )
}