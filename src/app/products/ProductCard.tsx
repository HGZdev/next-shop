// app/products/ProductCard.tsx

import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import ClientProductControls from "./ClientProductControls";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="rounded border p-4">
      <Link href={`/products/${product.id}`}>
        <Image
          width={100}
          height={100}
          src={product.image}
          alt={product.title}
          className="mb-2 h-32 w-full object-cover"
        />
        <h2 className="text-lg font-bold hover:underline">{product.title}</h2>
      </Link>
      <p>{product.price.toFixed(2)} €</p>
      <ClientProductControls product={product} />
    </div>
  );
}
