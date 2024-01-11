import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useLogin from "@/hooks/useLogin";
import { AxiosError } from "axios";
import useAuthStore from "@/useAuthStore";
import { Loader2 } from "lucide-react";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email("Invalid email."),
  password: z.string().min(8, { message: "Password is too short." }),
});

type FormData = z.infer<typeof schema>;

type ResponseError = {
  message: string;
  emptyFields: {
    field: string;
    message: string;
  }[];
};

const Login = () => {
  const loginUser = useAuthStore((s) => s.loginUser);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const login = useLogin();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    login
      .mutateAsync(data)
      .then((res) => {
        reset();
        loginUser(res);
        localStorage.setItem("user", JSON.stringify(res));
        navigate("/");
      })
      .catch((err: AxiosError<ResponseError>) => {
        err.response?.data.emptyFields.forEach((error) => {
          setError(error.field as keyof FormData, {
            type: "manual",
            message: error.message,
          });
        });
      });
  };

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Login</h1>

            <Link className="gap-1.5" to="/signup">
              Don't have an account?
              <span className="font-semibold"> Create one.</span>
            </Link>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2 h-20">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email")}
                    id="email"
                    placeholder="you@example.com"
                    autoComplete="false"
                  />
                  {errors?.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-1 py-2 h-20">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    {...register("password")}
                    type="password"
                    id="password"
                    placeholder="Password"
                  />
                  {errors?.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button disabled={login.isPending} className="mt-5">
                  Login
                  {login.isPending ? (
                    <span className="pl-1">
                      <Loader2 className="h-4 w-4 animate-spin" />
                    </span>
                  ) : (
                    ""
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
