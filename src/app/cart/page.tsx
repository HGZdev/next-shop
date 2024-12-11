import CartClient from "./CartClient";

export default function CartPage() {
  return (
    <div className="mx-auto max-w-3xl rounded-lg border p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">Your Cart</h2>
      <CartClient />
    </div>
  );
}
