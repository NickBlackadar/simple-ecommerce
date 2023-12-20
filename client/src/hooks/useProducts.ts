import { useQuery } from "@tanstack/react-query";
import { Product } from "../types/Product";
import APIClient from "../services/api-client";

const apiClient = new APIClient<Product[]>("/products");

const useProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: () => apiClient.getAllProducts(),
  });

export default useProducts;
