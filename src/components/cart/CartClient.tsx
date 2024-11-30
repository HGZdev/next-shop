"use client";

import {useSelector, useDispatch} from "react-redux";
import {RootState} from "@/store/store";
import {removeFromCart, updateQuantity} from "@/store/cartSlice";
import CartItem from "@/app/cart/CartItem";

export default function CartClient() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({id, quantity}));
    } else {
      handleRemove(id); // Remove item if quantity is zero
    }
  };

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      {items.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-500">Your cart is empty.</p>
        </div>
      ) : (
        <div>
          <ul className="space-y-4">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={handleRemove}
                onUpdateQuantity={handleUpdateQuantity}
              />
            ))}
          </ul>
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="font-bold text-lg">Subtotal</span>
              <span className="font-bold text-lg">${subtotal.toFixed(2)}</span>
            </div>
            <button
              className="w-full mt-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              onClick={() => alert("Proceed to checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
