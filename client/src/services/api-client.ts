import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/",
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

  addProduct = async (product: T) => {
    const res = await axiosInstance.post<T>(this.endpoint, product);
    return res.data;
  };

  // Auth
  login = async (user: T) => {
    const res = await axiosInstance.post(this.endpoint, user);
    return res.data;
  };

  // Cateogries
  getCategories = async () => {
    const res = await axiosInstance.get<T>(this.endpoint);
    return res.data;
  };
}

export default APIClient;
