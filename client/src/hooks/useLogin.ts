import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { User } from "@/types/User";

const apiClient = new APIClient<Login>("/users/login");

type Login = {
  email: string;
  password: string;
};

const useLogin = () => {
  return useMutation<User, Error, Login>({
    mutationFn: (data) => apiClient.login(data),
  });
};

export default useLogin;
