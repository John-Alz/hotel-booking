
import { Button } from '../../../components/ui/button';
import { Input } from "@/components/ui/input"
import { useForm } from 'react-hook-form';
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
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Filter } from 'lucide-react';
import useAmenityStore from '../../amenities/store/useAmenityStore';
import { useEffect } from 'react';
import { Counter } from '../../core/components/Counter';
import useRoomStore from '../store/useRoomStore';
export const FiltersTable = () => {

    const { register, reset, handleSubmit, formState: { errors } } = useForm();

    const fetchAmenities = useAmenityStore(state => state.fetchAmenities);
    const amenities = useAmenityStore(state => state.amenities);

    const fetchRooms = useRoomStore(state => state.fetchRooms);
    const setFilter = useRoomStore(state => state.setFilter);
    const filters = useRoomStore(state => state.filters)
    const clearFilters = useRoomStore(state => state.clearFilters)

    useEffect(() => {
        fetchAmenities();
    }, []);

    const onChange = (e) => {
        console.log(e.target.value);
    }

    const handleSubmitFilters = handleSubmit((data) => {
        console.log(data);
        setFilter(data)
    });

    const handleReset = () => {
        clearFilters();
        reset({
            checkin: '',
            checkout: '',
            capacity: '',
            amenity: '',
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
                            <h2 className="font-medium text-black-opacity">Fecha de disponibilidad:</h2>
                            <button className="text-secondary font-medium cursor-pointer">Limpiar</button>
                        </div>
                        <article className="flex justify-between gap-4">
                            <div className="w-full flex flex-col gap-1">
                                <label className="text-xs font-bold">Desde</label>
                                <input type="date" name='checkin' className="border-2 px-2 py-2 rounded-lg"
                                    {...register("checkin")}
                                />
                            </div>
                            <div className="w-full flex flex-col gap-1">
                                <label className="text-xs font-bold">Hasta</label>
                                <input type="date" name='checkout' className="border-2 px-2 py-2 rounded-lg"
                                    {...register("checkout")}
                                />
                            </div>
                        </article>
                    </div>
                    <div className='px-2 py-1.5 text-sm flex flex-col gap-2'>
                        <div className="flex justify-between">
                            <h2 className="font-medium text-black-opacity">Capacidad:</h2>
                            <button className="text-secondary font-medium cursor-pointer">Limpiar</button>
                        </div>
                        <article className="flex justify-between gap-4">
                            <div className="w-full flex flex-col gap-1">
                                <select name='roomCapacity' className="border-2 px-2 py-2 rounded-lg"
                                    {...register("capacity")}
                                >
                                    <option value="" disabled selected>Selecciona la capacidad</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                            </div>
                        </article>
                    </div>
                    <div className='px-2 py-1.5 text-sm flex flex-col gap-2'>
                        <div className="flex justify-between">
                            <h2 className="font-medium text-black-opacity">Tipo de amenidad:</h2>
                            <button className="text-secondary font-medium cursor-pointer">Limpiar</button>
                        </div>
                        <article className="flex justify-between gap-4">
                            <div className="w-full flex flex-col gap-1">
                                <select name='amenityId' className="border-2 px-2 py-2 rounded-lg"
                                    {...register("amenity")}
                                >
                                    <option value="">Selecciona un tipo de habitacion</option>
                                    {
                                        amenities?.content?.map(item => (
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

                    <div className="px-2 py-1.5 mt-2 flex justify-between">
                        <Button onClick={handleReset} variant="gray">Limpiar</Button>
                        <Button onClick={handleSubmitFilters}>Aplicar</Button>
                    </div>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
