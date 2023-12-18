import { useMutation } from "@tanstack/react-query";
import { Product } from "../types/Product";
import APIClient from "../services/api-client";

const apiClient = new APIClient<Product>("/products");

const useAddProduct = () => {
  return useMutation<Product, Error, Product>({
    mutationFn: (product) => apiClient.addProduct(product),
  });
};

export default useAddProduct;
