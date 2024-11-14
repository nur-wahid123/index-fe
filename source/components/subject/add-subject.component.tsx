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

export default function AddSubject({ reFetch }: { reFetch: () => void }) {
    const [openAddBrand, setOpenAddBrand] = React.useState(false);
    const toast = useToast()
    const [value, setValue] = React.useState({
        name: "",
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await axiosInstance.post(ENDPOINT.CREATE_SUBJECT, value)
            .then((res) => {
                reFetch();
                toast.toast({
                    title: "Success",
                    description: "Berhasil Tambahkan Mapel",
                    variant: "default",
                })
                setOpenAddBrand(false);
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
        <Dialog open={openAddBrand} onOpenChange={setOpenAddBrand}>
            <DialogTrigger asChild>
                <Button className="flex gap-3 shadow hover:shadow-md" variant="outline"><Tag className="w-4" />Tambah Mapel <PlusIcon className="w-4" /></Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tambah Mapel</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Label>Nama Mapel</Label>
                    <Input
                        type="text"
                        value={value.name}
                        onChange={(e) => setValue({ ...value, name: e.target.value })}
                    />
                    <Button type="submit">
                        Tambah Mapel
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
