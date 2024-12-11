import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  FirestoreError,
} from "firebase/firestore";
import { Product } from "@/types/product";
import db from "./db";

// Custom error for uninitialized Firestore
class FirestoreNotInitializedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "FirestoreNotInitializedError";
  }
}

// Fetch all products
export async function getProducts(): Promise<Product[]> {
  if (!db) {
    throw new FirestoreNotInitializedError(
      "Firestore is not initialized. Check your Firebase configuration.",
    );
  }

  try {
    const querySnapshot = await getDocs(collection(db, "products"));
    return querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() }) as Product,
    );
  } catch (error) {
    if (error instanceof FirestoreError) {
      console.error("Firestore error fetching products:", error.message);
      throw new Error(`FirestoreError: ${error.message}`);
    }
    console.error("Unexpected error fetching products:", error);
    throw new Error("Unexpected error occurred while fetching products.");
  }
}

// Fetch a single product by ID
export async function getProduct(id: string): Promise<Product | null> {
  if (!db) {
    throw new FirestoreNotInitializedError(
      "Firestore is not initialized. Check your Firebase configuration.",
    );
  }

  try {
    const docRef = doc(db, "products", id);
    const docSnapshot = await getDoc(docRef);

    if (!docSnapshot.exists()) {
      throw new Error(`Product with ID ${id} not found.`);
    }

    return { id: docSnapshot.id, ...docSnapshot.data() } as Product;
  } catch (error) {
    if (error instanceof FirestoreError) {
      console.error("Firestore error fetching product:", error.message);
      throw new Error(`FirestoreError: ${error.message}`);
    }
    console.error("Unexpected error fetching product:", error);
    throw new Error("Unexpected error occurred while fetching the product.");
  }
}

// Add a new product
export async function addProduct(product: {
  name: string;
  price: number;
  description: string;
  image?: string;
  category?: string;
}): Promise<string> {
  if (!db) {
    throw new FirestoreNotInitializedError(
      "Firestore is not initialized. Check your Firebase configuration.",
    );
  }

  try {
    const productWithDefaults = {
      ...product,
      image: product.image || undefined,
      category: product.category || "Uncategorized",
      createTs: new Date().toISOString(),
      updateTs: new Date().toISOString(),
    };

    const docRef = await addDoc(
      collection(db, "products"),
      productWithDefaults,
    );
    console.log("Product added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    if (error instanceof FirestoreError) {
      console.error("Firestore error adding product:", error.message);
      throw new Error(`FirestoreError: ${error.message}`);
    }
    console.error("Unexpected error adding product:", error);
    throw new Error("Unexpected error occurred while adding the product.");
  }
}
