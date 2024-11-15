"use client";
import ENDPOINT from "@/source/config/url";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StudyGroup } from "@/source/types/study-group";
import { axiosInstance } from "@/source/util/request.util";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Eye, Trash } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Subject } from "@/source/types/subject";
import { useToast } from "@/hooks/use-toast";
import PaginationSelf, { PaginateContentProps } from "@/components/pagination";
import SearchBar from "@/components/search-bar";
import AddStudyGroup from "@/source/components/study-group/add-study-group.component";
import EditStudyGroup from "@/source/components/study-group/update-study-group.component";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@radix-ui/react-select";

export default function Page() {
  const [subject, setSubject] = useState<Subject[]>([]);
  const [data, setData] = useState<StudyGroup[]>([]);
  const [search, setSearch] = useState<string>("");
  const toaster = useToast();
  const [pagination, setPagination] = useState<PaginateContentProps>({});

  const fetchData = React.useCallback(async (
    start: number,
    limit: number,
  ) => {
    try {
      const res = await axiosInstance.get(
        `${ENDPOINT.MASTER_STUDY_GROUP}?page=${start}&take=${limit}&search=${search}`
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



  async function linkSubject(studyGroupId: number, subject: number) {
    await axiosInstance.post(ENDPOINT.LINK_STUDY_SUBJECT, {
      subject_id: subject,
      study_group_id: studyGroupId,
    }).then(() => {
      fetchData(pagination?.page ?? 1, pagination?.take ?? 20);
    });
  }

  async function detachSubject(studyGroupId: number, subject: number) {
    await axiosInstance.post(ENDPOINT.DETACH_STUDY_SUBJECT, {
      subject_id: subject,
      study_group_id: studyGroupId,
    }).then(() => {
      fetchData(pagination?.page ?? 1, pagination?.take ?? 20);
    });
  }

  async function fetchSubject() {
    await axiosInstance.get(ENDPOINT.MASTER_SUBJECT).then((res) => {
      setSubject(res.data.data);
    })
      .catch((err) => {
        toaster.toast({
          title: "Error",
          description: err.response.data.message,
          variant: "destructive",
        })
      });
  }

  useEffect(() => {
    if (subject.length > 0) {
      fetchData(pagination?.page ?? 1, pagination?.take ?? 20);
    }
  }, [subject]);

  useEffect(() => {
    fetchSubject();
    return () => { };
  }, []);

  async function handleDelete(id: number) {
    const confirm = window.confirm("Apakah anda yakin ingin menghapus rombel ini?");
    if (!confirm) {
      return;
    }
    await axiosInstance.delete(`${ENDPOINT.DELETE_STUDY_GROUP}/${id}`).then(() => {
      toaster.toast({
        title: "Success",
        description: "Rombel berhasil dihapus",
        variant: "default",
      })
      reFetch();
    })
      .catch(() => {
        toaster.toast({
          title: "Error",
          description: "Gagal menghapus rombel",
          variant: "destructive",
        })
      });
  }

  const tableHeader: string[] = [
    "Nama",
    "Mata Pelajaran",
    "Jumlah Mapel",
    "Aksi",
  ];

  return (
    <div className="p-3">
      <div>
        <div className="flex items-end gap-4 justify-between">
          <h1 className="scroll-m-20 text-2xl mb-4 font-extrabold tracking-tight lg:text-5xl">
            Rombongan Belajar
          </h1>
          <div className="flex flex-col gap-2">
            <Label htmlFor="search">
              Search
            </Label>
            <SearchBar onSearch={handleSearch} />
          </div>
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
          <AddStudyGroup reFetch={reFetch} />
          <PaginationSelf pagination={pagination} fetchData={fetchData} />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {tableHeader.map((thead, i) => (
              <TableHead key={i}>
                {thead}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((study_group, i) => (
            <TableRow key={i}>
              <TableCell>
                {study_group.name}
              </TableCell>
              <TableCell>{study_group.subjects.map((subject, i) => (
                <div
                  className="badge text-white badge-success m-1"
                  key={subject.id}
                >
                  {subject.name}
                </div>
              ))}
              </TableCell>
              <TableCell>{study_group.subjects.length}</TableCell>
              <TableCell className="flex gap-2">
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
                        <div>
                          <p className="py-4">Kelas: {study_group.name}</p>
                          <p className="py-4">
                            Siswa yang ada di rombel ini: {study_group.classes.length}
                          </p>
                          <div className="py-4">
                            <p>Klik untuk hapus pelajaran</p>
                            Mata pelajaran :{" "}
                            {Array.isArray(study_group.subjects) && study_group.subjects.length > 0
                              ? study_group.subjects.map(
                                (subj: { name: string; id: number }) => (
                                  <div
                                    className="badge text-white badge-success m-1 hover:cursor-pointer"
                                    key={subj.id}
                                    onClick={() => detachSubject(study_group.id, subj.id)}
                                  >
                                    {subj.name}
                                  </div>
                                )
                              )
                              : "-"}
                          </div>
                          <p>Klik untuk tambah pelajaran</p>
                          <div className="flex flex-wrap">
                            {subject.map((subj: { name: string; id: number }) => {
                              if (Array.isArray(study_group.subjects)) {
                                if (
                                  study_group.subjects.some(
                                    (subject: { id: number }) =>
                                      subject.id === subj.id
                                  )
                                ) {
                                  return;
                                } else {
                                  return (
                                    <div
                                      className="badge text-white badge-error hover:cursor-pointer m-1"
                                      key={subj.id}
                                      onClick={() => linkSubject(study_group.id, subj.id)}
                                    >
                                      {subj.name}
                                    </div>
                                  );
                                }
                              }
                            })}
                          </div>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
                <EditStudyGroup studyGroupId={study_group.id} reFetch={reFetch} />
                <Button onClick={() => handleDelete(study_group.id)}>Hapus <Trash /></Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </div>
  );
}
