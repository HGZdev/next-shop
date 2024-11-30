// components/CartButton.tsx
"use client";
import {useDispatch} from "react-redux";
import {addToCart} from "@/store/cartSlice";
import {Product} from "@/types/product";

export default function AddToCartButton({product}: {product: Product}) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({...product, quantity: 1}));
  };

  return (
    <button
      onClick={handleAddToCart}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Add to Cart
    </button>
  );
}
