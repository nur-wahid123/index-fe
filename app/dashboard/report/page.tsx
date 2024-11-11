'use client'
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ExcelJS, { CellValue } from "exceljs";
import React from "react";
import { SemesterReport } from "@/source/types/semester-report.type";
import { CreateSemesterReportDto, ExtracurricularScore, Score } from "@/source/types/semester-report.dto";
import { ExtracurricularScoreEnum } from "@/source/enums/extraculicullar-score.enum";
import { Button } from "@/components/ui/button";
import { Database, SaveAll } from "lucide-react";
import { Semester } from "@/source/enums/semester.enum";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { error } from "console";
import ShowSemesterReport from "@/source/components/show-semester-report.components";
import { axiosInstance } from "@/source/util/request.util";
import ENDPOINT from "@/source/config/url";

export default function Page() {
    const [data, setData] = React.useState<SemesterReport[]>([])
    const [semester, setSemester] = React.useState<Semester>(Semester.I)
    const [form, setForm] = React.useState<{ body: CreateSemesterReportDto[], schoolYear: string, semester: Semester }>({
        body: [],
        schoolYear: "2024",
        semester: Semester.I
    })
    const [files, setFiles] = React.useState<{ [key: string]: FileList | null }>({
        inputOne: null,
        inputTwo: null,
    });
    const currentYear = new Date().getFullYear();
    const startYear = 1960;
    const [selectedYear, setSelectedYear] = React.useState(currentYear);
    const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i).reverse();
    const fetchData = async () => {
        axiosInstance.get(ENDPOINT.REPORT).then((res) => {
            setData(res.data)
        })
    }
    React.useEffect(() => {
        fetchData();
    }, [])
    const handleSubmit = async () => {
        axiosInstance.post(ENDPOINT.CREATE_REPORT, form).then(() => {
            fetchData();
        })
            .catch((error) => {
                console.log(error);
            })
    }
    const handleSubmit2 = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!files.inputTwo) {
            return;
        }
        const reader = new FileReader();
        reader.readAsArrayBuffer(files.inputTwo[0]);
        reader.onload = async (event) => {
            if (event.target) {
                const buffer = event.target?.result as ArrayBuffer;
                const workbook = new ExcelJS.Workbook();
                await workbook.xlsx.load(buffer); // Load the buffer
                const worksheet = workbook.getWorksheet(1); // Get the first sheet
                if (worksheet) {
                    const rows: CreateSemesterReportDto[] = [];
                    let rowKey: CellValue[] = [];
                    worksheet.eachRow((row, rowNumber) => {
                        if (rowNumber === 7) {
                            const rowData = row.values;
                            rowKey = Object.values(rowData);
                            rowKey.unshift('oi');
                        }
                        if (rowNumber > 7) {
                            const rowData = row.values;
                            if (Array.isArray(rowData) && rowData.length > 0) {
                                
                                const subject = new CreateSemesterReportDto();
                                subject.studentNationalId = rowData[3] as string;
                                const scores: Score[] = [];
                                let startNumber = rowKey.indexOf('NIS') + 1
                                let endNumber = rowKey.indexOf('Jumlah')
                                for (let i = startNumber; i < endNumber; i++) {
                                    if (rowData[i] !== undefined) {
                                        const newScore = new Score();
                                        newScore.subjectName = rowKey[i] as string;
                                        newScore.score = rowData[i] as number;
                                        scores.push(newScore)
                                    }
                                }
                                const extracurricularScores: ExtracurricularScore[] = [];
                                startNumber = rowKey.indexOf('Alpa') + 1
                                endNumber = rowKey.length
                                for (let i = startNumber; i < endNumber; i++) {
                                    if (rowData[i] !== undefined) {
                                        const newScore = new ExtracurricularScore();
                                        newScore.extracurricularName = rowKey[i] as string;
                                        newScore.score = rowData[i] as ExtracurricularScoreEnum;
                                        extracurricularScores.push(newScore)
                                    }
                                }
                                subject.extracurricularScores = extracurricularScores
                                subject.scores = scores
                                subject.totalScore = scores.reduce((acc, score) => acc + score.score, 0);
                                subject.ranking = rowData[rowKey.indexOf('Rangking')] as number
                                subject.absentDays = rowData[rowKey.indexOf('Alpa')] as number
                                subject.sickDays = rowData[rowKey.indexOf('Sakit')] as number
                                subject.leaveDays = rowData[rowKey.indexOf('Izin')] as number
                                subject.semester = semester
                                subject.schoolYear = selectedYear.toString()
                                if(subject.studentNationalId){
                                    rows.push(subject);
                                }
                            }
                        }
                    });
                    setForm({ ...form, body: rows });
                    console.log("success read file");
                }
            }
        };
    };

    const handleFileChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        inputName: string
    ) => {
        setFiles((prevFiles) => ({
            ...prevFiles,
            [inputName]: event.target.files, // Update the corresponding input field in the state
        }));
    };

    React.useEffect(() => {
        setForm((prevForm) => ({
            ...prevForm,
            schoolYear: selectedYear.toString()
        }))
        setForm((prevForm) => ({
            ...prevForm,
            semester: semester
        }))
    }, [semester, selectedYear])

    const handleChange = (semester: string) => {
        setSemester(semester as unknown as Semester)
    }
    return (
        <div className="flex flex-col gap-5 p-4">
            <div>
                <form
                    className=" max-w-xl flex flex-col gap-3"
                    onSubmit={handleSubmit2}
                    method="post"
                >
                    <label className="label" htmlFor="file">
                        Daftar Mata Pelajaran
                    </label>
                    <input
                        type="file"
                        name="file"
                        accept=".xls,.xlsx"
                        className="file-input file-input-bordered"
                        id="file"
                        onChange={(e) => handleFileChange(e, "inputTwo")}
                    />
                    <Button type="submit">
                        Save Internal <SaveAll className="w-4" />
                    </Button>
                </form>
            </div>
            <div className="flex flex-col gap-3">
                {form.body.length > 0 && (
                    <div>{form.body.length} Data Saved</div>
                )}
                <Label>Semester</Label>
                <Select value={semester} onValueChange={handleChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Pilih Semester" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.values(Semester).map((item, i) => (
                            <SelectItem key={i} value={item}>
                                {item}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={String(selectedYear)} onValueChange={(value) => setSelectedYear(Number(value))}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Pilih Tahun" />
                    </SelectTrigger>
                    <SelectContent>
                        {years.map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                                {year}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Button onClick={handleSubmit}>Masukkan Database <Database className="w-4" /></Button>
            </div>
            <Input className="max-w-sm" />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead>Study Group</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item, i) => (
                        <TableRow key={i}>
                            <TableCell>{item.totalScore}</TableCell>
                            <TableCell>{item.student.name}</TableCell>
                            <TableCell>{item.student.address}</TableCell>
                            <TableCell>{item.student.studyGroup}</TableCell>
                            <TableCell><ShowSemesterReport semesterReport={item}/></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}