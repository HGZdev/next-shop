export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  createTs: string;
  updateTs: string;
};

export type ProductInput = {
  id?: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  createTs?: string;
  updateTs?: string;
};
