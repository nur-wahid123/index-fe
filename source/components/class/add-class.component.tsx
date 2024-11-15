"use client";

import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { PlusIcon, Tag } from "lucide-react";
import { axiosInstance } from "@/source/util/request.util";
import ENDPOINT from "@/source/config/url";
import { StudyGroup } from "@/source/types/study-group";
import { ComboboxStudyGroup } from "../study-group/combobox-stg.component";

export default function AddClass({ reFetch }: { reFetch: () => void }) {
    const [openAddClass, setOpenAddClass] = React.useState(false);
    const toast = useToast()
    const [studyGroup, setStudyGroup] = React.useState<number>(0)
    const [value, setValue] = React.useState({
        name: "",
        study_group_id: 0
    })

    React.useEffect(() => {
        setValue({ ...value, study_group_id: studyGroup })
    }, [studyGroup])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await axiosInstance.post(ENDPOINT.CREATE_CLASS, value)
            .then(() => {
                reFetch();
                toast.toast({
                    title: "Success",
                    description: "Berhasil Tambahkan kelas",
                    variant: "default",
                })
                setOpenAddClass(false);
                setValue({
                    name: "",
                    study_group_id: 0
                })
            })
            .catch((error) => {
                if (error.code === 400) {
                    toast.toast({
                        title: "Error",
                        description: error.response.data.message[0],
                        variant: "destructive",
                    })
                } else {
                    toast.toast({
                        title: "Error",
                        description: error.response.data.message,
                        variant: "destructive",
                    })
                }
            })
    };

    return (
        <Dialog open={openAddClass} onOpenChange={setOpenAddClass}>
            <DialogTrigger asChild>
                <Button className="flex gap-3 shadow hover:shadow-md" variant="outline"><Tag className="w-4" />Tambah Kelas <PlusIcon className="w-4" /></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tambah Kelas</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Label>Nama Kelas</Label>
                    <Input
                        type="text"
                        value={value.name}
                        onChange={(e) => setValue({ ...value, name: e.target.value })}
                    />
                    <Label>Pilih Rombel</Label>
                    <ComboboxStudyGroup setId={setStudyGroup} />
                    <Button type="submit">
                        Tambah Kelas
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
