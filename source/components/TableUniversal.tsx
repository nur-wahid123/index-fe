"use client";
import React from "react";
import { Barang } from "../objects/Barang";
type TableProps = {
  data: string[][];
  tableHeader: string[];
  additionalColumn: React.JSX.Element[][];
};
export default function TableUniversal({
  data,
  tableHeader,
  additionalColumn,
}: TableProps) {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            {tableHeader.map((tHead: string | number, i: number) => {
              return <th key={i}>{String(tHead)}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((tBody: string[], i: number) => (
            <tr key={i}>
              {tBody.map((td: string, j: number) => (
                <td key={j}>{td}</td>
              ))}
              {additionalColumn.length > 0 &&
                additionalColumn[i].map((td: any, k: number) => (
                  <td key={k}>{td}</td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
