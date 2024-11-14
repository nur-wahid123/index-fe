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

export default function EditSubject({ subjectId, reFetch }: { subjectId: number | undefined, reFetch: () => void }) {
    const [openEditSubject, setOpenEditSubject] = React.useState(false);
    const [subject, setSubject] = React.useState({} as Subject);
    const toast = useToast()
    const [value, setValue] = React.useState({
        name: "",
    })

    React.useEffect(() => {
        if (subject) {
            setValue({
                name: subject.name ?? "",
            })
        }
    }, [subject]);

    
    const fetchData = React.useCallback(async () => {
        const subjectRes = await axiosInstance.get(`${ENDPOINT.DETAIL_SUBJECT}/${subjectId}`);
        setSubject(subjectRes.data);
    },[subjectId])
    
    React.useEffect(() => {
        if(openEditSubject===true){
            fetchData();
        }
    }, [ openEditSubject, fetchData]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await axiosInstance.patch(`${ENDPOINT.UPDATE_SUBJECT}/${subjectId}`, value)
            .then((res) => {
                toast.toast({
                    title: "Success",
                    description: "Berhasil edit mapel",
                    variant: "default",
                });
                reFetch();
                setOpenEditSubject(false);
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
        <Dialog open={openEditSubject} onOpenChange={setOpenEditSubject}>
            <DialogTrigger asChild>
                <div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <button><Edit className="w-4"></Edit></button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Edit {value?.name ?? "Maple"}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Mapel</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Label>Nama Mapel</Label>
                    <Input
                        type="text"
                        value={value.name}
                        onChange={(e) => setValue({ ...value, name: e.target.value })}
                    />
                    <Button type="submit">
                        Edit Mapel <LucideEdit3></LucideEdit3>
                    </Button>
                </form>
            </DialogContent>
        </Dialog>)
}