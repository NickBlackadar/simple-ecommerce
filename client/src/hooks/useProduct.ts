import { useQuery } from "react-query";
import { Product } from "../types/Product";
import APIClient from "../services/api-client";
import ms from "ms";

const apiClient = new APIClient<Product>("/products");

const useProduct = (id?: string) =>
  useQuery({
    queryKey: ["products", id],
    queryFn: () => apiClient.getProduct(id!),
    staleTime: ms("24h"),
  });

export default useProduct;
