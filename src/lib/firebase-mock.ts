// lib/firebase-mock.ts
import {Product} from "@/types/product";

export async function getProducts(): Promise<Product[]> {
  try {
    // Simulate a network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mocked data
    return [
      {
        id: "1",
        title: "Mock Product 1",
        description: "This is a mock product description.",
        price: 10.99,
        image: "/images/file.svg",
        category: "Category 1",
      },
      {
        id: "2",
        title: "Mock Product 2",
        description: "Another mock product description.",
        price: 20.99,
        image: "/images/globe.svg",
        category: "Category 2",
      },
      {
        id: "3",
        title: "Mock Product 3",
        description: "Yet another mock product description.",
        price: 30.99,
        image: "/images/next.svg",
        category: "Category 3",
      },
    ];
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
}
