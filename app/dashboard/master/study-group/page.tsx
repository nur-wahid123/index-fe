"use client";
import TableUniversal from "@/app/(components)/TableUniversal";
import ENDPOINT from "@/app/(config)/url";
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

export default function Page() {
  const [subject, setSubject] = useState<{ name: string; id: number }[]>([]);
  const [data, setData] = useState<StudyGroup[]>([]);
  const [search, setSearch] = useState<string>("");
  const [additionalColumn, setAditionalColumn] = useState<
    React.JSX.Element[][]
  >([]);

  function linkSubject(studyGroupId: number, subject: number) {
    postFetch(ENDPOINT.LINK_STUDY_SUBJECT, {
      subject_id: subject,
      study_group_id: studyGroupId,
    }).then(() => {
      fetchData();
    });
  }

  function detachSubject(studyGroupId: number, subject: number) {
    // const confirmation = confirm("Yakin ingin menambah pelajaran?");
    // if (confirmation === false) return;
    postFetch(ENDPOINT.DETACH_STUDY_SUBJECT, {
      subject_id: subject,
      study_group_id: studyGroupId,
    }).then(() => {
      fetchData();
    });
  }

  function fetchSubject() {
    getFetch(ENDPOINT.MASTER_SUBJECT).then((res) => {
      if (Array.isArray(res)) {
        const arr: { name: string; id: number }[] = [];
        res.map((item) => {
          arr.push({ name: item.name, id: item.id });
        });
        setSubject(arr);
      }
    });
  }

  const fetchData = async () => {
    axiosInstance.get(ENDPOINT.MASTER_STUDY_GROUP).then((res) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    if (subject.length > 0) {
      fetchData();
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
                            Siswa yang ada di rombel ini: {study_group.students.length}
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
