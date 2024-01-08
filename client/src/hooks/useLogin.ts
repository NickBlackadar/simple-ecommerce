import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";

const apiClient = new APIClient<Login>("/users/login");

type Login = {
  email: string;
  password: string;
};

const useLogin = () => {
  return useMutation<Login, Error, Login>({
    mutationFn: (data) => apiClient.login(data),
  });
};

export default useLogin;
