import { Button } from "@/components/ui/button";
import { EyeIcon } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { SemesterReport } from "../types/semester-report.type";


export default function ShowSemesterReport({semesterReport}: {semesterReport: SemesterReport}) {
    return (
        <Dialog>
            <DialogTrigger><EyeIcon className="w-4 h-4"/></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Semester Report</DialogTitle>
                    <DialogDescription className="text-black w-full" asChild>
                       <div className="flex gap-2 w-full">
                        <div>
                            <p>Nama</p>
                            <p>{semesterReport.student.name}</p>
                        </div>
                       </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}