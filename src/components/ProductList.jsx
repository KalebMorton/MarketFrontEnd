import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProductList({products, setProducts}){
const navigate = useNavigate()
const [filter, setFilter] = useState("")

 useEffect(()=> {
    const fetchProducts = async () => {
        try{
            const response = await fetch("http://localhost:3000/products")
            const result = await response.json()
            setProducts(result)
        }catch(error){

        }
    }
    fetchProducts()
 }, [setProducts])

    const filteredProducts = products.filter((product) => {
        return product.title.toLowerCase().includes(filter.toLowerCase())
    })

    return (
        <div>
        <div className='search-bar'>
            <input type="text" placeholder="Search for a duck by title" value={filter}
            onChange={(e) => setFilter(e.target.value)}/>
        </div>
        <div className='duck-container'> 
            {filteredProducts.length === 0 ? (
                <p>Loading...</p>
            ) : (
                filteredProducts.map((product) => {
                    return(
                        <div key={product.id}>
                            <div className='duck-card'>
                                <img src={product.image}/>
                                <h2>{product.title}</h2>
                                <p>${product.price}</p>
                                <button onClick={() => navigate(`/products/${product.id}`)}>View Ducky</button>
                            </div>
                        </div>
                    )
                })
            )}
        </div>
        </div>
    )
}