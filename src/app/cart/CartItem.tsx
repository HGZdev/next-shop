// app/cart/CartItem.tsx
import {Product} from "@/types/product";
import Image from "next/image";

interface CartItemProps {
  item: Product & {quantity: number};
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const CartItem = ({item, onRemove, onUpdateQuantity}: CartItemProps) => {
  return (
    <li className="flex justify-between items-center border-b pb-4">
      <div className="flex items-center">
        <Image
          width={100}
          height={100}
          src={item.image}
          alt={item.title}
          className="w-16 h-16 object-cover rounded mr-4"
        />
        <div>
          <h3 className="font-medium">{item.title}</h3>
          <p className="text-sm text-gray-500">${item.price.toFixed(2)} each</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            -
          </button>
          <span className="mx-2">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            +
          </button>
        </div>
        <button
          onClick={() => onRemove(item.id)}
          className="text-red-500 hover:underline"
        >
          Remove
        </button>
      </div>
    </li>
  );
};

export default CartItem;
