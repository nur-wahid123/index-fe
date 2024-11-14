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
import { ComboboxStudyGroup } from "./combobox-stg.component";

export default function AddStudyGroup({ reFetch }: { reFetch: () => void }) {
    const [openAddStudyGroup, setOpenAddStudyGroup] = React.useState(false);
    const toast = useToast()
    const [value, setValue] = React.useState({
        name: "",
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await axiosInstance.post(ENDPOINT.CREATE_STUDY_GROUP, value)
            .then(() => {
                reFetch();
                toast.toast({
                    title: "Success",
                    description: "Berhasil Tambahkan Rombel",
                    variant: "default",
                })
                setOpenAddStudyGroup(false);
                setValue({
                    name: "",
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
        <Dialog open={openAddStudyGroup} onOpenChange={setOpenAddStudyGroup}>
            <DialogTrigger asChild>
                <Button className="flex gap-3 shadow hover:shadow-md" variant="outline"><Tag className="w-4" />Tambah Rombel <PlusIcon className="w-4" /></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tambah Rombel</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Label>Nama Rombel</Label>
                    <Input
                        type="text"
                        value={value.name}
                        onChange={(e) => setValue({ ...value, name: e.target.value })}
                    />
                    <Button type="submit">
                        Tambah Rombel
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
