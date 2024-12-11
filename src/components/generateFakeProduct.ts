import { faker } from "@faker-js/faker";
import { Product } from "@/types/product";

const generateFakeProduct = (): Product => {
  const product = {
    title: faker.commerce.productName(),
    price: (faker.commerce.price({ min: 10, max: 100, dec: 2 }), 10),
    description: faker.commerce.productDescription(),
    category: faker.commerce.department(),
    image: faker.image.url(),
  };
  console.log("product:", product);
  return product;
};

export default generateFakeProduct;
