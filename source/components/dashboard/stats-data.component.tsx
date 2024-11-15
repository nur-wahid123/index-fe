import ENDPOINT from "@/source/config/url";
import { axiosInstance } from "@/source/util/request.util";
import { BookCopy, School, User, Users } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react"

export default function DashboardData() {
    const [data, setData] = useState({
        total_students: 0,
        total_study_groups: 0,
        total_subjects: 0,
        total_classes: 0,
    })

    const fetchData = useCallback(async () => {
        await axiosInstance.get(ENDPOINT.DASHBOARD).then((res) => {
            setData(res.data);
        });
    }, []);

    useEffect(() => {
        fetchData();
    }, [])
    return (
        <div className="mt-2 flex flex-wrap justify-center items-center gap-4">
            <Link href="/student"
                className="flex h-20 w-40 flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80">
                <div className="flex flex-row gap-5 items-center justify-center">
                    <User/>
                    <p className="font-bold text-2xl text-gray-600"> {data.total_students} </p>
                </div>

                <div className="mt-2 text-sm text-gray-400">Siswa</div>
            </Link>

            <Link href="/study-group"
                className="flex h-20 w-40 flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80">
                <div className="flex flex-row gap-5 items-center justify-center">
                    <Users/>
                    <p className="font-bold text-2xl text-gray-600"> {data.total_study_groups} </p>
                </div>

                <div className="mt-2 text-sm text-gray-400">Rombel</div>
            </Link>

            <Link href="/subject"
                className="flex h-20 w-40 flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80">
                <div className="flex flex-row gap-5 items-center justify-center">
                    <BookCopy/>
                    <p className="font-bold text-2xl text-gray-600"> {data.total_subjects} </p>
                </div>

                <div className="mt-2 text-sm text-gray-400">Mapel</div>
            </Link>

            <Link href="/class"
                className="flex h-20 w-40 flex-col items-center justify-center rounded-md border border-dashed border-gray-200 transition-colors duration-100 ease-in-out hover:border-gray-400/80">
                <div className="flex flex-row gap-5 items-center justify-center">
                    <School/>
                    <p className="font-bold text-2xl text-gray-600"> {data.total_classes} </p>
                </div>

                <div className="mt-2 text-sm text-gray-400">Kelas</div>
            </Link>
        </div>
    )
}