"use client";
import TableUniversal from "@/app/(components)/TableUniversal";
import ENDPOINT from "@/app/(config)/url";
import { Stundent } from "@/app/(objects)/Students";
import { getFetch, postFetch } from "@/app/(util)/request.util";
import React, { useEffect, useState } from "react";
export default function Page() {
  const [subject, setSubject] = useState<{ name: string; id: number }[]>([]);
  const [data, setData] = useState<string[][]>([]);
  const [search, setSearch] = useState<string>("");
  const [additionalColumn, setAditionalColumn] = useState<
    React.JSX.Element[][]
  >([]);

  function linkSubject(studyGroupId: number, subject: number) {
    // const confirmation = confirm("Yakin ingin menambah pelajaran?");
    // if (confirmation === false) return;
    postFetch(ENDPOINT.LINK_STUDY_SUBJECT, {
      subject_id: subject,
      study_group_id: studyGroupId,
    }).then((res) => {
      fetchData();
    });
  }

  function detachSubject(studyGroupId: number, subject: number) {
    // const confirmation = confirm("Yakin ingin menambah pelajaran?");
    // if (confirmation === false) return;
    postFetch(ENDPOINT.DETACH_STUDY_SUBJECT, {
      subject_id: subject,
      study_group_id: studyGroupId,
    }).then((res) => {
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

  const fetchData = async (search?: string) => {
    getFetch(ENDPOINT.MASTER_STUDY_GROUP).then((res) => {
      const tblData: string[][] = [];
      const addCol: React.JSX.Element[][] = [];

      if (Array.isArray(res)) {
        res.map((item, index) => {
          console.log(item);

          const innerData: string[] = [];
          const adc: React.JSX.Element[] = [];
          innerData.push(item.name);
          tblData.push(innerData);
          if (item.subjects.length > 0) {
            adc.push(
              <div>
                {item.subjects.map((subj: { name: string; id: number }) => (
                  <div
                    className="badge text-white badge-success m-1"
                    key={subj.id}
                  >
                    {subj.name}
                  </div>
                ))}
              </div>
            );
          } else {
            adc.push(<div>-</div>);
          }
          adc.push(<div>{item.subjects.length}</div>);
          adc.push(
            <div>
              <button
                className="btn"
                onClick={() => {
                  const element = document.getElementById(
                    "student_detail_" + index
                  ) as HTMLDialogElement;
                  if (element) {
                    element?.showModal();
                  }
                }}
              >
                Detail
              </button>
              <dialog id={"student_detail_" + index} className="modal">
                <div className="modal-box">
                  <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </form>
                  <h3 className="font-bold text-lg">
                    Detail Rombongan Belajar
                  </h3>
                  <div>
                    <p className="py-4">Kelas: {item.name}</p>
                    <p className="py-4">
                      Siswa yang ada di rombel ini: {item.students.length}
                    </p>
                    <div className="py-4">
                      <p>Klik untuk hapus pelajaran</p>
                      Mata pelajaran :{" "}
                      {Array.isArray(item.subjects) && item.subjects.length > 0
                        ? item.subjects.map(
                            (subj: { name: string; id: number }) => (
                              <div
                                className="badge text-white badge-success m-1 hover:cursor-pointer"
                                key={subj.id}
                                onClick={() => detachSubject(item.id, subj.id)}
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
                        if (Array.isArray(item.subjects)) {
                          if (
                            item.subjects.some(
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
                                onClick={() => linkSubject(item.id, subj.id)}
                              >
                                {subj.name}
                              </div>
                            );
                          }
                        }
                      })}
                    </div>
                  </div>
                </div>
              </dialog>
            </div>
          );
          addCol.push(adc);
        });
        setAditionalColumn(addCol);
      }

      setData(tblData);
    });
  };

  useEffect(() => {
    if (subject.length > 0) {
      fetchData();
    }
  }, [subject]);

  useEffect(() => {
    fetchSubject();
    return () => {};
  }, []);

  const tableHeader: string[] = [
    "Nama",
    "Mata Pelajaran",
    "Jumlah Mapel",
    "Detail",
  ];

  return (
    <div>
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
      <TableUniversal
        tableHeader={tableHeader}
        data={data}
        additionalColumn={additionalColumn}
      />
    </div>
  );
}
