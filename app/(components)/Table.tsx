"use client";
import React from "react";
type TableProps = {
  data: any[][]; // Specify that data is an array of any type
};
export default function Table({ data }: TableProps) {
  return (
    <div>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            {data[0] &&
              data[0].map((tHead: string, i: number) => (
                <th
                  className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  key={i}
                >
                  {tHead}
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {data.map((tBody: string[], i: number) => (
            <tr>
              <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                {tBody[1]}
              </td>
              <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                {tBody[2]}
              </td>
              <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                {tBody[3]}
              </td>
              <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                {tBody[4]}
              </td>
              <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                {tBody[5]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
