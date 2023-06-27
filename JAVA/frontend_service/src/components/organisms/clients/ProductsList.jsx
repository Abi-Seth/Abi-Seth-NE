import { useEffect, useState } from "react"; 
import ProductCard from "../../molecules/cards/ProductCard";
import useApi from '../../../hooks/useApi'

const ProductsList = () => {
    const [products, setProducts] = useState([])
    const { data, loading, request: productsRequest } = useApi(`product`, 'GET')

    useEffect(() => {
        productsRequest()
    }, [])

    useEffect(() => {
        if (!loading && data) {
            setProducts(data.data)
        }
    }, [data])

    return (
        <div className="w-full h-auto pr-4">
            <p className="font-abi-seth-ne-poppins mb-4">Products List</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {products.map((product) => (
                    <ProductCard key={product.code} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductsList;
