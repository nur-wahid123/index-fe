"use client";
import TableUniversal from "@/app/(components)/TableUniversal";
import ENDPOINT from "@/app/(config)/url";
import { Stundent } from "@/app/(objects)/Students";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Subject } from "@/source/types/subject";
import { axiosInstance, getFetch } from "@/source/util/request.util";
import { Eye } from "lucide-react";
import React, { useEffect, useState } from "react";
export default function Page() {
  const [data, setData] = useState<Subject[]>([]);
  const [search, setSearch] = useState<string>("");
  const [additionalColumn, setAditionalColumn] = useState<
    React.JSX.Element[][]
  >([]);
  const fetchData = async (search?: string) => {
    axiosInstance.get(ENDPOINT.MASTER_SUBJECT).then((res) => {
      setData(res.data);
    });
  };

  const fetchDataToArrayOfString = (data: Object[]): string[][] => {
    const tblData: string[][] = [];
    if (Array.isArray(data)) {
      data.map((item) => {
        const innerData: string[] = Object.values(item);
        tblData.push(innerData);
      });
    }
    return tblData;
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchData(search);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [search]);

  useEffect(() => {
    fetchData();
    return () => { };
  }, []);

  const tableHeader: string[] = [
    "Nama",
    "Kelas",
    "Kelas Pengguna",
    "Mapel Wajib",
    "Detail",
  ];

  return (
    <div className="p-3">
      <label className="label" htmlFor="search">
        Search
      </label>
      <input
        value={search}
        className="input input-sm input-bordered"
        onChange={(e) => setSearch(e.target.value)}
        type="text"
        name="search"
        id="search"
      />
      {/* <TableUniversal
        tableHeader={tableHeader}
        data={data}
        additionalColumn={additionalColumn}
      /> */}
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
          {data.map((subject, i) => (
            <TableRow key={i}>
              <TableCell>
                {subject.name}
              </TableCell>
              <TableCell>{subject.study_groups.map((study_group, i) => (
                <div
                  className="badge text-white badge-success m-1 hover:cursor-pointer"
                  key={study_group.id}
                >
                  {study_group.name}
                </div>
              ))}
              </TableCell>
              <TableCell>{subject.study_groups.length}</TableCell>
              <TableCell>{subject.is_primary? "Ya" : "Tidak"}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger>
                    <Button>
                      Detail <Eye />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        Helo
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
