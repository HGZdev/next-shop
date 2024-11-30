import CartClient from "../../components/cart/CartClient";

export default function CartPage() {
  return (
    <div className="p-6 border rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <CartClient />
    </div>
  );
}
