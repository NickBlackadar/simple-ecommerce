import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://fakestoreapi.com",
});

class APIClient<T> {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  // Products
  getAllProducts = async () => {
    const res = await axiosInstance.get<T>(this.endpoint);
    return res.data;
  };

  getProduct = async (id: string) => {
    const res = await axiosInstance.get<T>(this.endpoint + "/" + id);
    return res.data;
  };

  // Cateogries
  getCategories = async () => {
    const res = await axiosInstance.get<T>(this.endpoint);
    return res.data;
  };
}

export default APIClient;
