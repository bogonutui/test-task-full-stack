import { useMutation, useQueryClient } from "@tanstack/react-query";
import fileService from "../api/fileService";
import toast from "react-hot-toast";

export const useUploadFile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fileService.uploadFile,
    onMutate: async () => {
      const loadingToast = toast.loading("Upload...");
      return { loadingToast };
    },
    onError: (_error, _id, context) => {
      toast.dismiss(context?.loadingToast);
      toast.error("Something went wrong");
    },
    onSuccess: (_data, _id, context) => {
      toast.dismiss(context?.loadingToast);
      toast.success("Successfully upload!");
      queryClient.invalidateQueries({
        queryKey: ["fileData"],
      });
    },
  });
};
