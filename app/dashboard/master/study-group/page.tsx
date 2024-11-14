"use client";
import ENDPOINT from "@/source/config/url";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { StudyGroup } from "@/source/types/study-group";
import { axiosInstance, getFetch, postFetch } from "@/source/util/request.util";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Eye } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Subject } from "@/source/types/subject";
import { useToast } from "@/hooks/use-toast";
import { PaginateContentProps } from "@/components/pagination";
import SearchBar from "@/components/search-bar";

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

  const tableHeader: string[] = [
    "Nama",
    "Mata Pelajaran",
    "Jumlah Mapel",
    "Detail",
  ];

  return (
    <div className="p-3">
      <div>
        <div>
          <label className="label" htmlFor="search">
            Search
          </label>
          <SearchBar onSearch={handleSearch} />
        </div>
        <form>
          <Label>Upload Rombel</Label>
        </form>
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </div>
  );
}
