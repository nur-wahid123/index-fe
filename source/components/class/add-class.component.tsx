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

export default function AddClass({ reFetch }: { reFetch: () => void }) {
    const [openAddClass, setOpenAddClass] = React.useState(false);
    const toast = useToast()
    const [value, setValue] = React.useState({
        name: "",
    })

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
                <Button className="flex gap-3 shadow hover:shadow-md" variant="outline"><Tag className="w-4" />Tambah Mapel <PlusIcon className="w-4" /></Button>
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
                    <Button type="submit">
                        Tambah Kelas
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
