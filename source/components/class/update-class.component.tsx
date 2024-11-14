import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { Edit, LucideEdit3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "../../../components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../components/ui/tooltip";
import { Subject } from "@/source/types/subject";
import { axiosInstance } from "@/source/util/request.util";
import ENDPOINT from "@/source/config/url";
import { ClassEntity } from "@/source/types/class.type";

export default function EditClass({ classId, reFetch }: { classId: number | undefined, reFetch: () => void }) {
    const [openEditClass, setOpenEditClass] = React.useState(false);
    const [classEntity, setClassEntity] = React.useState({} as ClassEntity);
    const toast = useToast()
    const [value, setValue] = React.useState({
        name: "",
    })

    React.useEffect(() => {
        if (classEntity) {
            setValue({
                name: classEntity.name ?? "",
            })
        }
    }, [classEntity]);

    
    const fetchData = React.useCallback(async () => {
        const classRes = await axiosInstance.get(`${ENDPOINT.DETAIL_CLASS}/${classId}`);
        setClassEntity(classRes.data);
    },[classId])
    
    React.useEffect(() => {
        if(openEditClass===true){
            fetchData();
        }
    }, [ openEditClass, fetchData]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await axiosInstance.patch(`${ENDPOINT.UPDATE_CLASS}/${classId}`, value)
            .then(() => {
                toast.toast({
                    title: "Success",
                    description: "Berhasil edit kelas",
                    variant: "default",
                });
                reFetch();
                setOpenEditClass(false);
            })
            .catch((err) => {
                if (err.code === 400) {
                    toast.toast({ title: "Error", description: err.response.data.message[0], variant: "destructive" })
                }else{
                    toast.toast({ title: "Error", description: err.response.data.message, variant: "destructive" })
                }
            })
    }
    return (
        <Dialog open={openEditClass} onOpenChange={setOpenEditClass}>
            <DialogTrigger asChild>
                <div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <button><Edit className="w-4"></Edit></button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Edit {value?.name ?? "Kelas"}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Kelas</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Label>Nama Kelas</Label>
                    <Input
                        type="text"
                        value={value.name}
                        onChange={(e) => setValue({ ...value, name: e.target.value })}
                    />
                    <Button type="submit">
                        Edit Kelas <LucideEdit3></LucideEdit3>
                    </Button>
                </form>
            </DialogContent>
        </Dialog>)
}