import { PaginationState } from "@tanstack/react-table";
import axiosInstance from "./axiosInstance";

const fileService = Object.freeze({
  async fetchFileData(pagination: PaginationState) {
    const { data } = await axiosInstance.get("files/file-data", {
      params: pagination,
    });

    return data;
  },

  async uploadFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await axiosInstance.post("files/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  },
});

export default fileService;
