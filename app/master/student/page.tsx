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
    const url = search
      ? `${ENDPOINT.MASTER_STUDENT}?search=${search}&limit=20`
      : `${ENDPOINT.MASTER_STUDENT}?limit=20`;
    getFetch(url).then((res) => {
      const tblData: string[][] = [];
      const addCol: React.JSX.Element[][] = [];
      if (Array.isArray(res)) {
        res.map((item, index) => {
          console.log(item);

          const innerData: string[] = [];
          const adc: React.JSX.Element[] = [];
          innerData.push(item.name);
          innerData.push(item.student_national_id);
          if (item.study_group) {
            innerData.push(item.study_group.name);
          } else {
            innerData.push("");
          }
          tblData.push(innerData);
          adc.push(<p>{item.religion.name}</p>);

          adc.push(
            <div>
              <button
                className="btn btn-sm btn-primary text-white"
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

  const tableHeader: string[] = ["Nama", "NISN", "Rombel", "Agama", "Detail"];

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
