"use client";
import TableUniversal from "@/app/(components)/TableUniversal";
import ENDPOINT from "@/app/(config)/url";
import { axiosInstance, getFetch } from "@/source/util/request.util";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table,TableBody,TableCell,TableHead,TableHeader,TableRow } from "@/components/ui/table";
import { Eye } from "lucide-react";
import React, { useEffect, useState } from "react";
import { StundentView } from "./student-dto";
export default function Page() {
  const [data, setData] = useState<StundentView[]>([]);
  const [search, setSearch] = useState<string>("");
  const fetchData = async (search?: string) => {
    const url = search
      ? `${ENDPOINT.MASTER_STUDENT}?search=${search}&page=1&limit=20`
      : `${ENDPOINT.MASTER_STUDENT}?limit=20`;
    axiosInstance.get(url).then((res) => {
      setData(res.data.data);
    });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchData(search);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [search]);

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  const tableHeader: string[] = ["Nama", "NISN", "Rombel", "Agama", "Detail"];

  return (
    <div className="w-full p-4">
      <label className="label" htmlFor="search">
        Search
      </label>
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        name="search"
        id="search"
      />
      <Table>
        <TableHeader>
          <TableRow>
            {tableHeader.map((thead,i)=>(
              <TableHead>
                {thead}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((student,i)=>(
            <TableRow key={i}>
              <TableCell>
                <div className="font-semibold">{student.name}</div>
                <div className="text-sm text-slate-500">{student.student_national_id}</div>
              </TableCell>
              <TableCell>{student.student_national_id}</TableCell>
              <TableCell>{student.study_group?.name}</TableCell>
              <TableCell>{student.religion?.name}</TableCell>
              <TableCell>
                <Button>
                  <Eye/>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
