import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import useAuthStore from "@/useAuthStore";
import useSignup from "@/hooks/useSignup";
import { AxiosError } from "axios";

const schema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email("Invalid email."),
  password: z.string().min(8, { message: "Password is too short." }),
});

type FormData = z.infer<typeof schema>;

type ResponseError = {
  emptyFields: {
    field: string;
    message: string;
  }[];
};

const Signup = () => {
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

  const signup = useSignup();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    signup
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
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>

            <Link className="gap-1.5" to="/login">
              Already have an account?{" "}
              <span className="font-semibold">Sign in.</span>
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
                    id="password"
                    type="password"
                    placeholder="Password"
                  />
                  {errors?.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button>Sign up</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
