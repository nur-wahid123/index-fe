"use client";
import TableUniversal from "@/app/(components)/TableUniversal";
import ENDPOINT from "@/app/(config)/url";
import { Stundent } from "@/app/(objects)/Students";
import { getFetch } from "@/app/(util)/request.util";
import React, { useEffect, useState } from "react";
export default function Page() {
  const [data, setData] = useState<string[][]>([]);
  const [search, setSearch] = useState<string>("");
  const [additionalColumn, setAditionalColumn] = useState<
    React.JSX.Element[][]
  >([]);
  const fetchData = async (search?: string) => {
    getFetch(ENDPOINT.MASTER_SUBJECT).then((res) => {
      const tblData: string[][] = [];
      if (Array.isArray(res)) {
        const addCol: React.JSX.Element[][] = [];
        res.map((item, index) => {
          const innerData: string[] = [];
          const adc: React.JSX.Element[] = [];
          innerData.push(item.name);
          if (item.studyGroups.length > 0) {
            adc.push(
              Array.isArray(item.studyGroups) && item.studyGroups.length > 0
                ? item.studyGroups.map((subj: { name: string; id: number }) => (
                    <div
                      className="badge text-white badge-success m-1 hover:cursor-pointer"
                      key={subj.id}
                    >
                      {subj.name}
                    </div>
                  ))
                : "-"
            );
          } else {
            adc.push(<p>-</p>);
          }
          tblData.push(innerData);
          adc.push(<p>{item.studyGroups.length}</p>);
          adc.push(<p>{item.is_primary ? "Ya" : "Tidak"}</p>);
          adc.push(
            <div>
              <button
                className="btn btn-sm btn-warning"
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
                  <h3 className="font-bold text-lg">Detail Siswa</h3>
                  <div></div>
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
    return () => {};
  }, []);

  const tableHeader: string[] = [
    "Nama",
    "Kelas",
    "Kelas Pengguna",
    "Mapel Wajib",
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
