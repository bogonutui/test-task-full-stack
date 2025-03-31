import { useQuery } from "@tanstack/react-query";
import { PaginationState } from "@tanstack/react-table";
import userService from "../api/fileService";

export const useFileData = (pagination: PaginationState) => {
  return useQuery({
    queryKey: ["fileData", pagination],
    queryFn: () => userService.fetchFileData(pagination),
  });
};
