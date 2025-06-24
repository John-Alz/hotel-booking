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
import useBookingStore from "../store/useBookingStore";
import { useForm } from "react-hook-form";
import useRoomStore from "../../rooms/store/useRoomStore";
import { useEffect } from "react";


export const FiltersTableBooking = () => {

    const setFiltersBooking = useBookingStore(state => state.setFiltersBooking);
    const filtersBooking = useBookingStore(state => state.filtersBooking);
    const clearFiltersBooking = useBookingStore(state => state.clearFiltersBooking);

    const rooms = useRoomStore(state => state.rooms);
    const fetchRooms = useRoomStore(state => state.fetchRooms);

    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        fetchRooms(0, 4)
    }, []);

    const handleSubmitFilters = handleSubmit((data) => {
        console.log(data);
        setFiltersBooking(data)
    });

    const clearFilters = () => {
        clearFiltersBooking();
        reset({
            checkInDate: '',
            checkOutDate: '',
            priceMin: '',
            roomTypeId: '',
            status: '',
        })
    }


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
                                <input type="date" name="checkInDate" className="border-2 px-2 py-2 rounded-lg"
                                    {...register("checkInDate")}
                                />
                            </div>
                            <div className="w-full flex flex-col gap-1">
                                <label className="text-xs font-bold">Hasta</label>
                                <input type="date" name="checkOutDate" className="border-2 px-2 py-2 rounded-lg"
                                    {...register("checkOutDate")}
                                />
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
                                <input type="number" name="priceMin" placeholder="Escribe el precio que deseas filtrar" className="border-2 px-2 py-2 rounded-lg"
                                    {...register("priceMin")}
                                />
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
                                <select name="roomTypeId" className="border-2 px-2 py-2 rounded-lg"
                                    {...register("roomTypeId")}
                                >
                                    <option value="">Selecciona un tipo de habitacion</option>
                                    {
                                        rooms?.content?.map(item => (
                                            <option key={item.id} value={item.id}>
                                                {/* <img src={item.images[0]} /> */}
                                                {item.name}
                                            </option>
                                        ))
                                    }
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
                                <select name="status" className="border-2 px-2 py-2 rounded-lg"
                                    {...register("status")}
                                >
                                    <option value="" selected disabled>Selecciona un estado</option>
                                    <option value="CONFIRMADA">Confirmada</option>
                                    <option value="CANCELADA">Cancelada</option>
                                    <option value="CHECK_IN">CheckIn</option>
                                    <option value="CHECK_OUT">CheckOut</option>
                                </select>
                            </div>
                        </article>
                    </div>
                    <div className="px-2 py-1.5 mt-2 flex justify-between">
                        <Button onClick={clearFilters} variant="gray">Limpiar</Button>
                        <Button onClick={handleSubmitFilters} >Aplicar</Button>
                    </div>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
