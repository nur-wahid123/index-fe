"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import PaginationSelf, { PaginateContentProps } from "@/components/pagination";
import SearchBar from "@/components/search-bar";
import { Subject } from "@/source/types/subject";
import { axiosInstance } from "@/source/util/request.util";
import ENDPOINT from "@/source/config/url";
import EditSubject from "@/source/components/subject/update-subject.component";
import AddSubject from "@/source/components/subject/add-subject.component";
import { ClassEntity } from "@/source/types/class.type";
import AddClass from "@/source/components/class/add-class.component";
import EditClass from "@/source/components/class/update-class.component";
import { Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";


export default function Page() {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState<PaginateContentProps>({});
  const [classes, setClass] = useState<ClassEntity[]>([]);
  const toaster = useToast();
  const fetchData = React.useCallback(async (
    start: number,
    limit: number,
  ) => {
    try {
      const res = await axiosInstance.get(
        `${ENDPOINT.MASTER_CLASS}?page=${start}&take=${limit}&search=${search}`
      );

      if (Array.isArray(res.data.data)) {
        setClass(res.data.data);
      }
      if (res.data.pagination) {
        setPagination(res.data.pagination);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
    , [search]);
  useEffect(() => {
    fetchData(pagination?.page ?? 1, pagination?.take ?? 20);
  }, [fetchData, pagination?.page, pagination?.take, search]);

  function handleSearch(query: string) {
    if (query !== search) {
      setPagination({ ...pagination, page: 1 })
      setSearch(query);
    }
  }

  function reFetch() {
    fetchData(1, pagination?.take ?? 20);
  }

  function handleDelete(id: number){
    const confirm = window.confirm("Apakah anda yakin ingin menghapus kelas ini?");
    if (!confirm) {
      return;
    }
    axiosInstance.delete(`${ENDPOINT.DELETE_CLASS}/${id}`).then(() => {
      toaster.toast({
        title: "Success",
        description: "Kelas berhasil dihapus",
        variant: "default",
      })
      reFetch();
    })
    .catch(() => {
      toaster.toast({
        title: "Error",
        description: "Gagal menghapus kelas",
        variant: "destructive",
      })
    });
  }


  return (
    <div className="p-4">
      <h1 className="scroll-m-20 text-2xl mb-4 font-extrabold tracking-tight lg:text-5xl">
        Kelas
      </h1>
      <div className="w-full flex flex-col gap-4">
        {/* ({flatData.length} of {totalDBRowCount} rows fetched) */}
        <div className="flex gap-6 items-center justify-between">
          <SearchBar onSearch={handleSearch} />
          <div className="flex gap-4 items-center">
            <p>Rows</p>
            <Select value={pagination?.take?.toString()} onValueChange={(e) => setPagination({ ...pagination, take: Number(e), page: 1 })}>
              <SelectTrigger className="w-[90px]">
                <SelectValue placeholder="Rows" />
              </SelectTrigger>
              <SelectContent>
                {[10, 20, 30, 40, 50].map((item) => (
                  <SelectItem key={item} value={item.toString()}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <AddClass reFetch={reFetch} />
          </div>
          <PaginationSelf pagination={pagination} fetchData={fetchData} />
        </div>
        <div>
          {/* Even though we're still using sematic table tags, we must use CSS grid and flexbox for dynamic row heights */}
          <Table className="w-full table-fixed">
            <TableHeader className="bg-slate-100 text-black">
              <TableRow>
                <TableHead className="w-1/6">No.</TableHead>
                <TableHead className="w-3/6">Nama Kelas</TableHead>
                <TableHead className="w-1/6">Rombel</TableHead>
                <TableHead className="w-1/6">Aksi</TableHead>
              </TableRow>
            </TableHeader>
          </Table>
          <div
            className="max-h-[450px] w-full overflow-y-auto block"
          >
            <Table>
              <TableBody
              >
                {classes.map((classEntity, index) => (
                  <TableRow key={index} className="table table-fixed w-full">
                    <TableCell className="w-1/6">{index + 1}</TableCell>
                    <TableCell className="w-3/6">{classEntity.name}</TableCell>
                    <TableCell className="w-1/6">{classEntity.study_group?.name || "-"}</TableCell>
                    <TableCell className="w-1/6 flex gap-2 items-center">
                      <EditClass classId={classEntity.id} reFetch={reFetch} />
                      <button onClick={() => {handleDelete(classEntity.id)}}><Trash className="w-4"></Trash></button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
