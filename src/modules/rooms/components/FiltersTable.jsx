
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
export const FiltersTable = () => {

    const fetchAmenities = useAmenityStore(state => state.fetchAmenities);
    const amenities = useAmenityStore(state => state.amenities);

    useEffect(() => {
        fetchAmenities();
    }, []);

    const onChange = (e) => {
        console.log(e.target.value);
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="filters"><Filter /> Filtros</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Filtros</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <div className='px-2 py-1.5 text-sm'>
                        <Counter title={'Capacidad'} />
                    </div>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Tipo de habitacion</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent className='p-3'>
                                <form className="flex flex-col gap-2">
                                    <div className='flex gap-1'>
                                        <input type='radio' name='typeRoom' value="Habitacion estandar sencilla" onChange={onChange}
                                        />
                                        <label>Estandar sencilla</label>
                                    </div>
                                    <div className='flex gap-1'>
                                        <input type='radio' name='typeRoom' value="Habitacion suite" onChange={onChange}
                                        />
                                        <label>Suite</label>
                                    </div>
                                    <div className='flex gap-1'>
                                        <input type='radio' name='typeRoom' value="Habitacion estandar doble" onChange={onChange}
                                        />
                                        <label>Estandar doble</label>
                                    </div>
                                    <div className='flex gap-1'>
                                        <input type='radio' name='typeRoom' value="Habitacion familiar" onChange={onChange}
                                        />
                                        <label>Familiar</label>
                                    </div>

                                </form>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Amenidad</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                            <DropdownMenuSubContent className='p-3'>
                                <form className="flex flex-col gap-2">
                                    {
                                        amenities?.content?.map((item) => (
                                            <div className='flex gap-1'>
                                                <input type='radio' name='amenity' value={item.id} onChange={onchange}
                                                />
                                                <label>{item.name}</label>
                                            </div>
                                        ))
                                    }
                                </form>
                            </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                    </DropdownMenuSub>
                    {/* <DropdownMenuItem>
                        New Team
                        <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                    </DropdownMenuItem> */}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
