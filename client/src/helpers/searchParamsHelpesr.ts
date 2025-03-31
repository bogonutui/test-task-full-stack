import { PaginationState } from "@tanstack/react-table";

export const updateSearchParams = (pagination: PaginationState) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set("page", String(pagination.pageIndex));
  searchParams.set("size", String(pagination.pageSize));
  window.history.replaceState(null, "", `?${searchParams.toString()}`);
};

export const getPaginationFromURL = (): PaginationState => {
  const searchParams = new URLSearchParams(window.location.search);
  const pageIndex = Number(searchParams.get("page")) || 0;
  const pageSize = Number(searchParams.get("size")) || 5;
  return { pageIndex, pageSize };
};
