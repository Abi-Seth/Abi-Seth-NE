import React, { useState } from "react"
import InputText from "../../atoms/inputs/InputText"
import ButtonText from "../../atoms/buttons/ButtonText";
import { useSelector, useDispatch } from "react-redux";
import { addRemoveItemInCart } from '../../../store/modules/cartSlice'

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const [inProgress, setInProgress] = useState(false);
    const { items } = useSelector(state => state.cart);

    const isPresent = (data) => {
        return items.some(item => item.code === data.code);
    };
    
    const addToCart = () => {
        const data = {
            ...product,
            quantity
        };
        setInProgress(true);

        if (isPresent(data)) {
            const products = items.filter(item => item.code !== data.code);
            dispatch(addRemoveItemInCart([...products]));
        } else {
            dispatch(addRemoveItemInCart([data, ...items]));
        }

        setInProgress(false);
    };
    return (
        <React.Fragment>
            <div className="bg-white rounded-lg shadow-lg">
                <img src={product.image} alt="Product Image" className="w-full h-48 object-cover rounded-t-lg" />
                <div className="p-4">
                    <h3 className="text-xl font-bold mb-2 font-abi-seth-ne-poppins">{product.name}</h3>
                    <p className="text-gray-700 mb-2">{product.productType}</p>
                    <p className="text-gray-700 mb-4">Price: {product.price} Rwf</p>
                    <div className="w-full flex flex-col justify-end">
                        <InputText
                            label=""
                            type="number"
                            value={quantity}
                            onChange={value => setQuantity(value)}
                            required={true} />
                        <ButtonText
                            label={`${isPresent(product) ? "Remove From Cart" : "Add To Cart"}`} onClick={() => addToCart()} inProgress={inProgress}
                        />
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default ProductCard