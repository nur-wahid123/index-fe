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
import { Trash } from "lucide-react";
import { useToast } from "@/hooks/use-toast";


export default function Page() {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState<PaginateContentProps>({});
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const toaster = useToast();

  const fetchData = React.useCallback(async (
    start: number,
    limit: number,
  ) => {
    try {
      const res = await axiosInstance.get(
        `${ENDPOINT.MASTER_SUBJECT}?page=${start}&take=${limit}&search=${search}`
      );

      if (Array.isArray(res.data.data)) {
        setSubjects(res.data.data);
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

  function handleBeTrash(id: number){
    const confirm = window.confirm("Apakah anda yakin ingin menghapus kelas ini?");
    if (!confirm) {
      return;
    }
    axiosInstance.delete(`${ENDPOINT.DELETE_SUBJECT}/${id}`).then(() => {
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
        Mata Pelajaran
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
            <AddSubject reFetch={reFetch} />
          </div>
          <PaginationSelf pagination={pagination} fetchData={fetchData} />
        </div>
        <div>
          {/* Even though we're still using sematic table tags, we must use CSS grid and flexbox for dynamic row heights */}
          <Table className="w-full table-fixed">
            <TableHeader className="bg-slate-100 text-black">
              <TableRow>
                <TableHead className="w-1/6">No.</TableHead>
                <TableHead className="w-4/6">Nama Mapel</TableHead>
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
                {subjects.map((subject, index) => (
                  <TableRow key={index} className="table table-fixed w-full">
                    <TableCell className="w-1/6">{index + 1}</TableCell>
                    <TableCell className="w-4/6">{subject.name}</TableCell>
                    <TableCell className="w-1/6 flex gap-2 items-center">
                      <EditSubject subjectId={subject.id} reFetch={reFetch} />
                      <button onClick={()=>handleBeTrash(subject.id)}><Trash className="w-4 h-4"></Trash></button>
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
