"use client";
import React from "react";
import { Barang } from "../objects/Barang";
type TableProps = {
  data: Barang[];
  tableHeader: string[];
};
export default function TableBarang({ data, tableHeader }: TableProps) {
  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {tableHeader.map((tHead: string | number, i: number) => {
              return (
                <th
                  className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  key={i}
                >
                  {String(tHead)}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((tBody: Barang, i: number) => (
            <tr key={i}>
              <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                {tBody.name}
              </td>
              <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                {tBody.qty}
              </td>
              <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                {tBody.price}
              </td>
              <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                {tBody.discount}
              </td>
              <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                {tBody.subtotal}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
