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
import { Filter } from "lucide-react"


export const FiltersTableBooking = () => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="filters"><Filter /> Filtros</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[350px]">
                <DropdownMenuLabel>Filtros</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <div className='px-2 py-1.5 text-sm flex flex-col gap-2'>
                        <div className="flex justify-between">
                            <h2 className="font-medium text-black-opacity">Fecha de checkin:</h2>
                            <button className="text-secondary font-medium cursor-pointer">Limpiar</button>
                        </div>
                        <article className="flex justify-between gap-4">
                            <div className="w-full flex flex-col gap-1">
                                <label className="text-xs font-bold">Desde</label>
                                <input type="date" className="border-2 px-2 py-2 rounded-lg" />
                            </div>
                            <div className="w-full flex flex-col gap-1">
                                <label className="text-xs font-bold">Hasta</label>
                                <input type="date" className="border-2 px-2 py-2 rounded-lg" />
                            </div>
                        </article>
                    </div>
                    <div className='px-2 py-1.5 text-sm flex flex-col gap-2'>
                        <div className="flex justify-between">
                            <h2 className="font-medium text-black-opacity">Fecha de checkout:</h2>
                            <button className="text-secondary font-medium cursor-pointer">Limpiar</button>
                        </div>
                        <article className="flex justify-between gap-4">
                            <div className="w-full flex flex-col gap-1">
                                <label className="text-xs font-bold">Desde</label>
                                <input type="date" className="border-2 px-2 py-2 rounded-lg" />
                            </div>
                            <div className="w-full flex flex-col gap-1">
                                <label className="text-xs font-bold">Hasta</label>
                                <input type="date" className="border-2 px-2 py-2 rounded-lg" />
                            </div>
                        </article>
                    </div>
                    <div className='px-2 py-1.5 text-sm flex flex-col gap-2'>
                        <div className="flex justify-between">
                            <h2 className="font-medium text-black-opacity">Precio mayor:</h2>
                            <button className="text-secondary font-medium cursor-pointer">Limpiar</button>
                        </div>
                        <article className="flex justify-between gap-4">
                            <div className="w-full flex flex-col gap-1">
                                <input type="number" placeholder="Escribe el precio que deseas filtrar" className="border-2 px-2 py-2 rounded-lg" />
                            </div>
                        </article>
                    </div>
                    <div className='px-2 py-1.5 text-sm flex flex-col gap-2'>
                        <div className="flex justify-between">
                            <h2 className="font-medium text-black-opacity">Tipo de habitacion:</h2>
                            <button className="text-secondary font-medium cursor-pointer">Limpiar</button>
                        </div>
                        <article className="flex justify-between gap-4">
                            <div className="w-full flex flex-col gap-1">
                                <select className="border-2 px-2 py-2 rounded-lg">
                                    <option>Option1</option>
                                    <option>Option1</option>
                                    <option>Option1</option>
                                </select>
                            </div>
                        </article>
                    </div>
                    <div className='px-2 py-1.5 text-sm flex flex-col gap-2'>
                        <div className="flex justify-between">
                            <h2 className="font-medium text-black-opacity">Estado de la reserva:</h2>
                            <button className="text-secondary font-medium cursor-pointer">Limpiar</button>
                        </div>
                        <article className="flex justify-between gap-4">
                            <div className="w-full flex flex-col gap-1">
                                <select className="border-2 px-2 py-2 rounded-lg">
                                    <option>Confirmada</option>
                                    <option>Option1</option>
                                    <option>Option1</option>
                                </select>
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
