"use client";

import { z } from "zod";
import { useState } from "react";
import { addProduct } from "@/_server/queries";
import { ProductInput } from "@/types/product";
import generateFakeProduct from "@/components/generateFakeProduct";

// Validation schema using zod
const productSchema = z.object({
  title: z.string().min(1, "Title is required"),
  price: z.number().positive("Price must be greater than 0"),
  description: z.string().min(1, "Description is required"),
  image: z.string().url("Image must be a valid URL"),
  category: z.string().min(1, "Category is required"),
});

const initVal = generateFakeProduct();

// Reusable InputField component
const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  required = false,
}: {
  label: string;
  type?: string;
  name: string;
  value: string | number | undefined;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  required?: boolean;
}) => {
  return (
    <div>
      <label className="block font-medium">{label}</label>
      {type === "textarea" ? (
        <textarea
          name={name}
          value={value || ""}
          onChange={onChange}
          required={required}
          className="w-full rounded border p-2"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value || ""}
          onChange={onChange}
          required={required}
          className="w-full rounded border p-2"
        />
      )}
    </div>
  );
};


export default function AdminPage() {
  const [form, setForm] = useState<ProductInput>(initVal);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
  
    try {
      const validatedData = productSchema.parse(form);
  
      const productId = await addProduct(validatedData);
      if (productId) {
        setMessage("Product added successfully!");
        setForm({
          title: "",
          price: 0,
          description: "",
          image: "",
          category: "",
        });
      } else {
        throw new Error("Failed to add product.");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        setMessage(error.errors.map((err) => err.message).join(", "));
      } else {
        console.error("Error adding product:", error);
        setMessage("An error occurred while adding the product.");
      }
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-3xl font-bold">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Name"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <InputField
          label="Category"
          name="category"
          value={form.category}
          onChange={handleChange}
          required
        />
        <InputField
          label="Description"
          name="description"
          value={form.description}
          onChange={handleChange}
          required
          type="textarea"
        />
        <InputField
          label="Image URL"
          name="image"
          value={form.image}
          onChange={handleChange}
          required
          type="url"
        />
        <InputField
          label="Price"
          name="price"
          value={form.price}
          onChange={handleChange}
          required
          type="number"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
      {message && (
        <p
          className={`mt-4 ${
            message.includes("success") ? "text-green-500" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
