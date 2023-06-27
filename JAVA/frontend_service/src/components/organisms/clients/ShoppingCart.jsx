import { useEffect, useState } from "react"; 
// import useApi from '../../../hooks/useApi'
import ButtonText from "../../atoms/buttons/ButtonText";
import { useSelector } from "react-redux";

const ShoppingCart = () => {
    const { items } = useSelector(state => state.cart)
    const [amount, setAmount] = useState(0);
    // const [products, setProducts] = useState([]);
    const [inProgress, setInProgress] = useState(false);
    // const { data, loading, request: productsRequest } = useApi(`purchase`, 'POST', { products })

    // useEffect(() => {
    //     productsRequest();
    // }, [products])

    // useEffect(() => {
    //     if (!loading && data) {
    //         setInProgress(false)
    //     }
    // }, [data])
    useEffect(() => {
        if (items)
            setAmount(items.reduce((total, product) => total + product.quantity * product.price, 0))
    }, [items])

    const purchaseProducts = () => {
        setInProgress(true);
        // setProducts(items);
        setInProgress(false);
    }

    return (
        <div className="w-full pl-2 h-auto border-l-2 border-abi-seth-ne-black-1/10">
            <p className="font-abi-seth-ne-poppins font-bold text-sm mb-4">Shopping Cart</p>
            <div className="w-full">
                
                <div className="bg-gray-100 p-4 w-full h-auto">
                    <h1 className="text-2xl font-bold mb-4">Product List</h1>

                    <ul className="h-auto">
                        {items.map((product, index) => (
                            <li key={index} className="bg-white p-4 mb-2 shadow-md rounded-lg">
                                <h2 className="text-xl font-bold mb-2">{product.name}</h2>
                                <p className="text-gray-700 mb-1">Quantity: {product.quantity}</p>
                                <p className="text-gray-700 mb-1">Price: ${product.price}</p>
                                <p className="text-gray-700">Total: ${product.quantity * product.price}</p>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-4">
                        <p className="font-abi-seth-ne-poppins font-bold text-sm mb-4">TOTAL : {amount} Rwf</p>
                        <ButtonText label="Payments & Checkout"  onClick={() => purchaseProducts()} inProgress={inProgress} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;
