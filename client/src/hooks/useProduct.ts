import { useQuery } from "@tanstack/react-query";
import { Product } from "../types/Product";
import APIClient from "../services/api-client";

const apiClient = new APIClient<Product>("/products");

const useProduct = (id?: string) =>
  useQuery({
    queryKey: ["products", id],
    queryFn: () => apiClient.getProduct(id!),
  });

export default useProduct;
