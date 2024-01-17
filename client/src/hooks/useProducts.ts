import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { Product } from "../types/Product";
import APIClient from "../services/api-client";
import axios from "axios";

const apiClient = new APIClient<Product[]>("/products");

interface ProductQuery {
  page: number;
  pageSize: number;
}

interface ProductResponse {
  next: {
    page: number;
    limit: number;
  };
  previous: {
    page: number;
    limit: number;
  };
  results: Product[];
}

const useProducts = (query: ProductQuery) =>
  useQuery({
    queryKey: ["products", query],
    queryFn: () =>
      axios
        .get<ProductResponse>("http://localhost:3000/api/products", {
          params: {
            page: query.page,
            limit: query.pageSize,
          },
        })
        .then((res) => res.data),
    placeholderData: keepPreviousData,
  });

export default useProducts;
