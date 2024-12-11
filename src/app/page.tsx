// /app/page.tsx
import ProductList from "@/app/products/ProductList";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="mb-4 text-3xl font-bold">Products</h1>
      <ProductList />
    </main>
  );
}
