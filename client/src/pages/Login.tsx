import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useLogin from "@/hooks/useLogin";
import { AxiosError } from "axios";
import { useState } from "react";

const schema = z.object({
  email: z.string().min(1, { message: "Name is required." }),
  password: z.string().min(1, { message: "Name is required." }),
});

type FormData = z.infer<typeof schema>;

type ResponseError = {
  message: string;
  emptyFields: string[];
};

const Login = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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

  const login = useLogin();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    login
      .mutateAsync(data)
      .then((res) => {
        reset();
        setErrorMessage(null);
        console.log(res);
      })
      .catch((err: AxiosError<ResponseError>) => {
        if (err.response?.data.emptyFields) {
          err.response?.data.emptyFields.forEach((field) => {
            setError(field as keyof FormData, {
              type: "manual",
              message: `${
                field.charAt(0).toUpperCase() + field.slice(1)
              } is required.`,
            });
          });
        } else if (err.response) {
          setErrorMessage(err.response?.data.message);
        }
      });
  };

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Login</h1>

            <Link className="gap-1.5" to="/signup">
              Don't have an account? Sign up
            </Link>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
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

                <div className="grid gap-1 py-2">
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

                <Button>Login</Button>
                {errorMessage && (
                  <p className="text-sm text-red-500">{errorMessage}</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
