import { useEffect, useState } from "react";
import Table from "../components/Table";

import { PaginationState } from "@tanstack/react-table";
import {
  getPaginationFromURL,
  updateSearchParams,
} from "../helpers/searchParamsHelpesr";
import { generateColumns } from "../helpers/generateColumns";
import { useFileData } from "../hooks/useFileData";
import DropZone from "../components/Dropzone";
import { useUploadFile } from "../hooks/useUploadFile";

const DEFAULT_PAGINATION: PaginationState = {
  pageIndex: 0,
  pageSize: 5,
};

const Dashboard = () => {
  const [pagination, setPagination] = useState<PaginationState>(() =>
    getPaginationFromURL()
  );

  const { data, isFetching, error } = useFileData(pagination);
  const { mutate: uploadFile, isPending } = useUploadFile();

  const columns = generateColumns(data?.data);

  useEffect(() => {
    updateSearchParams(pagination);
  }, [pagination]);

  return (
    <>
      <DropZone
        disabled={isPending}
        accept={{
          "text/csv": [".csv"],
        }}
        onDrop={(file) => {
          uploadFile(file[0]);
          setPagination(DEFAULT_PAGINATION);
        }}
      />
      <Table
        rowCount={data?.total}
        data={data?.data || []}
        columns={columns}
        isFetching={isFetching}
        error={error}
        pagination={pagination}
        setPagination={setPagination}
      />
    </>
  );
};

export default Dashboard;
