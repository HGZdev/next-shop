"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { removeFromCart, updateQuantity } from "@/redux/cartSlice";
import CartItem from "@/app/cart/CartItem";

export default function CartClient() {
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    } else {
      handleRemove(id); // Remove item if quantity is zero
    }
  };

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
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
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">Subtotal</span>
              <span className="text-lg font-bold">${subtotal.toFixed(2)}</span>
            </div>
            <button
              className="mt-4 w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600"
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
