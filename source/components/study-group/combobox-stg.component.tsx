"use client"
import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
Command,
CommandEmpty,
CommandGroup,
CommandInput,
CommandItem,
CommandList,
} from "@/components/ui/command"

import {
Popover,
PopoverContent,
PopoverTrigger,
} from "@/components/ui/popover"
import { StudyGroup } from "@/source/types/study-group";
import { axiosInstance } from "@/source/util/request.util"
import ENDPOINT from "@/source/config/url"

export function ComboboxStudyGroup({ setId, currentName }:{setId:React.Dispatch<React.SetStateAction<number>>, currentName?:string}) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [data, setData] = React.useState<StudyGroup[]>([])

    const fetchData = React.useCallback(async () => {
      const res = await axiosInstance.get(ENDPOINT.MASTER_STUDY_GROUP)
      setData(res.data.data)
    }, [])

    React.useEffect(() => {
      fetchData();
    }, []);

    React.useEffect(() => {
      setValue(currentName ?? "")
    }, [currentName]);
  
    React.useEffect(() => {
      setId(data.find((study_group) => study_group.name === value)?.id ?? 0);
    }, [value])
   console.log(value);
   
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between"
          >
            {value
              ? data.find((study_group) => study_group.name === value)?.name
              : "Select framework..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Pilih Rombel" />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {data.map((study_group) => (
                  <CommandItem
                    key={study_group.id}
                    value={String(study_group.name)}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === String(study_group.name) ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {study_group.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    )
  }