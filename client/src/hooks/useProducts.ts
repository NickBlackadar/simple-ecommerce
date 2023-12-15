import { useQuery } from "@tanstack/react-query";
import { Product } from "../types/Product";
import APIClient from "../services/api-client";
import ms from "ms";

const apiClient = new APIClient<Product[]>("/products");

const useProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: () => apiClient.getAllProducts(),
    staleTime: ms("24h"),
  });

export default useProducts;
