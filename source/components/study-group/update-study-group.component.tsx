import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { Edit, LucideEdit3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Input } from "../../../components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../../../components/ui/tooltip";
import { axiosInstance } from "@/source/util/request.util";
import ENDPOINT from "@/source/config/url";
import { StudyGroup } from "@/source/types/study-group";

export default function EditStudyGroup({ studyGroupId, reFetch }: { studyGroupId: number | undefined, reFetch: () => void }) {
    const [openEditStudyGroup, setOpenEditStudyGroup] = React.useState(false);
    const [studyGroupEntity, setStudyGroupEntity] = React.useState({} as StudyGroup);
    const toast = useToast()
    const [value, setValue] = React.useState({
        name: "",
    })


    React.useEffect(() => {
        if (studyGroupEntity) {
            setValue({
                name: studyGroupEntity.name ?? "",
            })
        }
    }, [studyGroupEntity]);

    
    const fetchData = React.useCallback(async () => {
        const classRes = await axiosInstance.get(`${ENDPOINT.DETAIL_STUDY_GROUP}/${studyGroupId}`);
        setStudyGroupEntity(classRes.data);        
    },[studyGroupId])
    
    React.useEffect(() => {
        if(openEditStudyGroup===true){
            fetchData();
        }
    }, [openEditStudyGroup, fetchData]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await axiosInstance.patch(`${ENDPOINT.UPDATE_STUDY_GROUP}/${studyGroupId}`, value)
            .then(() => {
                toast.toast({
                    title: "Success",
                    description: "Berhasil edit kelas",
                    variant: "default",
                });
                reFetch();
                setOpenEditStudyGroup(false);
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
        <Dialog open={openEditStudyGroup} onOpenChange={setOpenEditStudyGroup}>
            <DialogTrigger asChild>
                <div>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Button>Edit <Edit className=""></Edit></Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Edit {value?.name ?? "Rombel"}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Edit Rombel</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Label>Nama Rombel</Label>
                    <Input
                        type="text"
                        value={value.name}
                        onChange={(e) => setValue({ ...value, name: e.target.value })}
                    />
                    <Button type="submit">
                        Edit Rombel <LucideEdit3></LucideEdit3>
                    </Button>
                </form>
            </DialogContent>
        </Dialog>)
}