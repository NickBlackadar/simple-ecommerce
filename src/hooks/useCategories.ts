import { useQuery } from "react-query";
import { Category } from "../types/Category";
import APIClient from "../services/api-client";
import ms from "ms";

const apiClient = new APIClient<Category[]>("/products/categories");

const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: () => apiClient.getCategories(),
    staleTime: ms("72h"),
  });

export default useCategories;
