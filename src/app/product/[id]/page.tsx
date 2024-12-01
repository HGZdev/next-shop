// /app/product/[id]/page.tsx

import AddToCartButton from "@/components/products/AddToCartButton";
import {getProducts} from "@/lib/firebase-mock";
import {Product} from "@/types/product";
import {Metadata} from "next";
import Image from "next/image";

interface ProductPageProps {
  // https://stackoverflow.com/a/79113867 Next.js 15 onwards, Params and SearchParams are now Promise.
  params: Promise<{id: string}>;
}

export async function generateMetadata(
  props: ProductPageProps
): Promise<Metadata> {
  const params = await props.params;
  const products: Product[] = await getProducts();
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The product you are looking for does not exist.",
    };
  }

  return {
    title: `${product.title} - Next Shop`,
    description: product.description,
  };
}

export default async function ProductPage(props: ProductPageProps) {
  const params = await props.params;
  const products: Product[] = await getProducts();
  const product = products.find((p) => p.id === params.id);

  if (!product) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p>The product you&apos;re looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="p-6 border rounded shadow">
        <Image
          width={1000}
          height={1000}
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-cover mb-4 rounded"
        />
        <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
        <p className="text-gray-500 mb-4">{product.description}</p>
        <p className="text-lg font-semibold mb-6">
          ${product.price.toFixed(2)}
        </p>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
