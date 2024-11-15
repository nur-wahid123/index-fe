"use client";
import ENDPOINT from "@/source/config/url";
import { axiosInstance } from "@/source/util/request.util";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye } from "lucide-react";
import React, { useEffect, useState } from "react";
import { StundentView } from "./student-dto";
import PaginationSelf, { PaginateContentProps } from "@/components/pagination";
import SearchBar from "@/components/search-bar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
export default function Page() {
  const [data, setData] = useState<StundentView[]>([]);
  const [pagination, setPagination] = useState<PaginateContentProps>({});
  const [search, setSearch] = useState<string>("");

  const fetchData = React.useCallback(async (
    start: number,
    limit: number,
  ) => {
    try {
      const res = await axiosInstance.get(
        `${ENDPOINT.MASTER_STUDENT}?page=${start}&take=${limit}&search=${search}`
      );

      if (Array.isArray(res.data.data)) {
        setData(res.data.data);
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
  }, [search,pagination?.page, pagination?.take]);

  useEffect(() => {
    fetchData(pagination?.page ?? 1, pagination?.take ?? 20);
    return () => { };
  }, []);

  function handleSearch(query: string) {
    if (query !== search) {
      setPagination({ ...pagination, page: 1 })
      setSearch(query);
    }
  }

  const tableHeader: string[] = ["Nama", "NISN", "Kelas", "Agama", "Detail"];

  return (
    <div className="w-full p-4">
      <h1 className="scroll-m-20 text-2xl mb-4 font-extrabold tracking-tight lg:text-5xl">
        Siswa
      </h1>
      <div className="flex justify-between gap-4">
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
        </div>
        <PaginationSelf pagination={pagination} fetchData={fetchData} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {tableHeader.map((thead, i) => (
              <TableHead>
                {thead}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((student, i) => (
            <TableRow key={i}>
              <TableCell>
                <div className="font-semibold">{student.name}</div>
                <div className="text-sm text-slate-500">{student.student_national_id}</div>
              </TableCell>
              <TableCell>{student.student_national_id}</TableCell>
              <TableCell>{student.student_class?.name}</TableCell>
              <TableCell>{student.religion?.name}</TableCell>
              <TableCell>
                <Button>
                  <Eye />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
