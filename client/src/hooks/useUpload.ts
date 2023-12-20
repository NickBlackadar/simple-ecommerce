import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type Upload = {
  file: string;
  upload_preset: string;
};

type UploadResponse = {
  data: {
    secure_url: string;
  };
};

const useUpload = () => {
  return useMutation<UploadResponse, Error, Upload>({
    mutationFn: (data) =>
      axios.post(
        "https://api.cloudinary.com/v1_1/dz2lbuez3/image/upload",
        data
      ),
  });
};

export default useUpload;
