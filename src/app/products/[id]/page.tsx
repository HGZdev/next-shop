import { getProduct } from "@/_server/queries";
import { Product } from "@/types/product";
import AddToCartButton from "@/app/products/ClientProductControls";
import Image from "next/image";

interface ProductPageProps {
  params: Promise<{ id: string }>; // params is now a Promise
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;

  // Fetch product server-side
  const product: Product | null = await getProduct(id);

  if (!product) {
    return (
      <div className="p-6 text-center">
        <h1 className="mb-4 text-2xl font-bold">Product Not Found</h1>
        <p>The product you&apos;re looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="rounded border p-6 shadow">
        <Image
          width={1000}
          height={1000}
          src={product.image}
          alt={product.title}
          className="mb-4 h-64 w-full rounded object-cover"
        />
        <h1 className="mb-2 text-3xl font-bold">{product.title}</h1>
        <p className="mb-4 text-gray-500">{product.description}</p>
        <p className="mb-6 text-lg font-semibold">
          ${product.price.toFixed(2)}
        </p>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
