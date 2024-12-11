import { faker } from "@faker-js/faker";
import {  ProductInput } from "@/types/product";

function generateFakeProduct(): ProductInput {
  return {
    title: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price()),
    description: faker.commerce.productDescription(),
    image: faker.image.url(),
    category: faker.commerce.department(),
  };
}

export default generateFakeProduct;
