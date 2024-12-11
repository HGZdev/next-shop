// app/products/ProductList.tsx
import { getProducts } from "@/_server/queries";
import ProductCard from "./ProductCard";

export default async function ProductList() {
  const products = await getProducts(); // Fetch products on the server

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
