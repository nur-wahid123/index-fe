'use client'
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import React from "react";
import { getFetch } from "../(util)/request.util";
import { SemesterReport } from "@/source/types/semester-report.type";
import ENDPOINT from "../(config)/url";

export default function Page(){
    const [data, setData] = React.useState<SemesterReport[]>([])

    React.useEffect(() => {
        getFetch(ENDPOINT.REPORT).then((res) => {
            setData(res)
        })
    },[])
    return (
        <div className="p-4">
            <Input className="max-w-sm" />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Study Group</TableHead>
                        <TableHead>Grade</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>2</TableCell>
                        <TableCell>3</TableCell>
                        <TableCell>4</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}