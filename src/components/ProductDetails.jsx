import { useEffect, useState } from "react"

export default function ProductDetails(passedData){

    const [singleProduct, setSingleProduct] = useState(null)

    async function getSingleProdct() {
        const response = await fetch(`url goes here ${passedData}`)
    }

    return (
        <>
            <h2>ProductDetails</h2>
        </>
    )
}