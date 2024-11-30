// components/ProductCard.tsx

import {Product} from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "../../components/products/AddToCartButton";

export default function ProductCard({product}: {product: Product}) {
  return (
    <div className="border p-4 rounded">
      <Link href={`/product/${product.id}`}>
        <Image
          width={100}
          height={100}
          src={product.image}
          alt={product.title}
          className="w-full h-32 object-cover mb-2"
        />
        <h2 className="font-bold text-lg hover:underline">{product.title}</h2>
      </Link>
      <p>${product.price.toFixed(2)}</p>
      <AddToCartButton product={product} />
    </div>
  );
}
