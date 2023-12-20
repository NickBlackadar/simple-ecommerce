import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import useAddProduct from "@/hooks/useAddProduct";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCallback, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useDropzone } from "react-dropzone";
import useUpload from "@/hooks/useUpload";
import { Loader2 } from "lucide-react";
import { AxiosError } from "axios";

const categories = [
  {
    name: "Electronics",
    value: "electronics",
  },
  {
    name: "Kitchen",
    value: "kitchen",
  },
  {
    name: "Shoes",
    value: "shoes",
  },
  {
    name: "Accessories",
    value: "accessories",
  },
];

const schema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  price: z
    .number({ invalid_type_error: "Price must be a number." })
    .min(0.01, { message: "Price must be greater than 0." }),
  category: z
    .string({ required_error: "Category is required." })
    .min(1, { message: "Category is required." }),
  description: z.string().min(2, { message: "Description is required." }),
  image: z.string({ required_error: "Image is required." }).url(),
});

type FormData = z.infer<typeof schema>;

const AddProduct = () => {
  const [preview, setPreview] = useState<string>();
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      category: "",
      description: "",
      image: "",
    },
  });
  const { toast } = useToast();

  const addProduct = useAddProduct();
  const uploadImage = useUpload();

  type MyErrorResponse = {
    message: string;
    emptyFields: string[];
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    await uploadImage
      .mutateAsync({
        file: data.image,
        upload_preset: "t94mq3co",
      })
      .then(async (res) => {
        await addProduct
          .mutateAsync({
            name: data.name,
            price: data.price,
            category: data.category,
            description: data.description,
            imageUrl: res.data.secure_url,
          })
          .then((res) => {
            reset();
            setPreview("");
            toast({
              title: "Success!",
              description: `${res.name} added successfully.`,
            });
          })
          .catch((err: AxiosError<MyErrorResponse>) => {
            if (err.response?.data.emptyFields) {
              err.response?.data.emptyFields.forEach((field) => {
                setError(field as keyof FormData, {
                  type: "manual",
                  message: "This field is required.",
                });
              });
            }
            toast({
              variant: "destructive",
              title: "Error",
              description: err.response?.data.message,
            });
          });
      })
      .catch((err: AxiosError<Error>) => {
        console.log(err);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Image upload failed.",
        });
      });
  };

  const onDrop = useCallback((acceptedFiles: Array<File>) => {
    const file = new FileReader();

    file.onload = () => {
      setPreview(file.result as string);
      setValue("image", file.result as string, { shouldValidate: true });
    };

    file.readAsDataURL(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  return (
    <>
      <div className="container relative flex pt-6 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-4 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Add a new product
            </h1>
          </div>
          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input {...register("name")} id="name" autoComplete="false" />
                  {errors?.name && (
                    <p className="text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-1 py-2">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    {...register("price", { valueAsNumber: true })}
                    id="price"
                    type="number"
                    step="any"
                  />
                  {errors?.price && (
                    <p className="text-sm text-red-500">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-1 py-2">
                  <Label htmlFor="category">Category</Label>

                  <Controller
                    control={control}
                    name="category"
                    render={({ field: { onChange, value } }) => (
                      <Select onValueChange={onChange} value={value}>
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent {...register("category")}>
                          <SelectGroup>
                            {categories.map((category) => (
                              <SelectItem
                                value={category.value}
                                key={category.value}
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors?.category && (
                    <p className="text-sm text-red-500">
                      {errors.category.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-1 py-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea {...register("description")} id="description" />
                  {errors?.description && (
                    <p className="text-sm text-red-500">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-1 py-2">
                  <Label htmlFor="image">Product Image</Label>
                  <Card className="border-2 border-dashed bg-muted hover:cursor-pointer hover:border-muted-foreground/50">
                    <CardContent className="flex flex-col items-center justify-center space-y-2 px-2 py-4 text-xs">
                      <div
                        {...getRootProps()}
                        className="flex items-center justify-center text-muted-foreground h-16"
                      >
                        <input {...getInputProps()} id="image" />
                        {isDragActive ? (
                          <p className="font-medium">Drop the files here ...</p>
                        ) : (
                          <p className="font-medium">
                            Drag Files to Upload or Click Here
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  {errors?.image && (
                    <p className="text-sm text-red-500">
                      {errors.image.message}
                    </p>
                  )}
                </div>
                {preview && (
                  <div>
                    <img
                      src={preview}
                      alt="preview"
                      className="max-h-40 max-w-40 aspect-auto"
                    />
                  </div>
                )}
                <Button disabled={uploadImage.isPending}>
                  Create
                  {uploadImage.isPending ? (
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

export default AddProduct;
