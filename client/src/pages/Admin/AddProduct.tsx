import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  FieldValues,
  SubmitHandler,
  Controller,
} from "react-hook-form";
import { Product } from "@/types/Product";
import useAddProduct from "@/hooks/useAddProduct";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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

const categories = [
  {
    name: "Electronics",
    value: "electronics",
  },
  {
    name: "Clothing",
    value: "clothing",
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
  category: z.string({ required_error: "Category is required." }),
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
    setValue,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const mutation = useAddProduct();

  const onSubmit: SubmitHandler<FormData> = async (data: FieldValues) => {
    const formData = new FormData();

    formData.append("file", data.image);
    formData.append("upload_preset", "t94mq3co");
    const results = await fetch(
      "https://api.cloudinary.com/v1_1/dz2lbuez3/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((res) => res.json());

    const product: Product = {
      name: data.name,
      price: data.price,
      category: data.category,
      description: data.description,
      imageUrl: results.secure_url,
    };
    mutation.mutate(product);
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
                <Button>Create</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
