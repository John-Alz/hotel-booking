import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ArrowDownUp, Filter } from "lucide-react"


export const FilterOrderTable = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="filters"><ArrowDownUp /> Ordernar</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Filtros</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <div className='px-2 py-1.5 text-sm flex flex-col gap-2'>
                        <div className="flex justify-between">
                            <h2 className="font-medium text-black-opacity">Precio:</h2>
                            {/* <button className="text-secondary font-medium cursor-pointer">Limpiar</button> */}
                        </div>
                        <article className="flex flex-col gap-2">
                            <div className="w-full flex gap-1">
                                <input type="radio" value="true" className="border-2 px-2 py-2 rounded-lg" />
                                <label className="text-sm font-medium">Ascendente</label>
                            </div>
                            <div className="w-full flex gap-1">
                                <input type="radio" value="false" className="border-2 px-2 py-2 rounded-lg" />
                                <label className="text-sm font-medium">Descendente</label>
                            </div>
                        </article>
                    </div>

                    <div className="px-2 py-1.5 mt-2 flex justify-between">
                        <Button variant="gray">Limpiar</Button>
                        <Button>Aplicar</Button>
                    </div>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
