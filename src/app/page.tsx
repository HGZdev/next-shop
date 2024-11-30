import { Suspense } from "react";
import ProductList from "@/app/products/ProductList";
import { getProducts } from "@/lib/firebase-mock";

async function ProductListAsync() {
  const products = await getProducts();
  return <ProductList products={products} />;
}


export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <Suspense fallback={<p>Loading products...</p>}>
        <ProductListAsync />
      </Suspense>
    </main>
  );
}

