import { useMutation } from "@tanstack/react-query";
import APIClient from "../services/api-client";
import { User } from "@/types/User";

const apiClient = new APIClient<Login>("/users/signup");

type Login = {
  email: string;
  password: string;
};

const useSignup = () => {
  return useMutation<User, Error, Login>({
    mutationFn: (data) => apiClient.signup(data),
  });
};

export default useSignup;
