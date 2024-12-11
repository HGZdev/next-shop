// app/products/CartButton.tsx
"use client";

import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { addToCart, updateQuantity } from "@/redux/cartSlice";
import { Product } from "@/types/product";

export default function ClientProductControls({
  product,
}: {
  product: Product;
}) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const cartItem = cartItems.find((item) => item.id === product.id);
    setQuantity(cartItem ? cartItem.quantity : 0);
  }, [cartItems, product.id]);

  const handleAddToCart = () => {
    if (quantity === 0) {
      dispatch(addToCart({ ...product, quantity: 1 }));
    } else {
      dispatch(updateQuantity({ id: product.id, quantity: quantity + 1 }));
    }
  };

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id: product.id, quantity: newQuantity }));
    } else {
      setQuantity(0); // Reset local state
    }
  };

  return (
    <>
      {quantity > 0 ? (
        <div className="mt-2 flex items-center space-x-4">
          <button
            onClick={() => handleUpdateQuantity(quantity - 1)}
            className="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300"
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => handleUpdateQuantity(quantity + 1)}
            className="rounded bg-gray-200 px-3 py-1 hover:bg-gray-300"
          >
            +
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          className="mt-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Add to Cart
        </button>
      )}
    </>
  );
}
