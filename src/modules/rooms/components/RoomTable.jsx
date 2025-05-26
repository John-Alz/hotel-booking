// src/components/RoomTable.jsx
import React, { useEffect, useState } from 'react';
import { Bed, Delete, DeleteIcon, Edit, Edit3, Link, Trash2, Users } from 'lucide-react';
import useRoomStore from '../store/useRoomStore';
import { flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { Trash } from 'lucide-solid';

export const RoomTable = () => {

    const [data, setData] = useState([])
    const [sorting, setSorting] = useState([])

    const columns = [
        {
            header: 'ID',
            accessorKey: 'id',
        },
        {
            header: 'Imagen',
            accessorKey: 'images',
            cell: (info) => {
                const images = info.getValue();
                const firstImage = images?.[0]
                return (
                    firstImage
                        ? <img src={firstImage} alt="Room" className="w-[120px] h-[75px] object-cover rounded-md" />
                        : <span className="text-gray-400">Sin imagen</span>
                );
            }
        },
        {
            header: 'Nombre',
            accessorKey: 'name',
        },
        {
            header: 'Precio noche',
            accessorKey: 'price',
        },
        {
            header: 'meters',
            accessorKey: 'meters',
        },

        {
            header: 'capacity',
            accessorFn: row => ({
                capacity: row.capacity,
                beds: row.beds,
            }),
            // accessorKey: 'capacity',
            cell: info => {
                const value = info.getValue();
                console.log(value);
                return (
                    <div className='flex flex-col items-center gap-4 text-sm'>
                        <div>
                            <p className='flex gap-2 text-[#6C6C6C]'>Capacidad:<span className='flex gap-2 text-black'> <Users size={20} /> {value.capacity}</span></p>
                        </div>
                        <div>
                            <p className='flex gap-2 text-[#6C6C6C]'>No camas:<span className='flex gap-2 text-black'> <Bed /> {value.beds}</span></p>

                        </div>
                    </div>
                )


            }
        },
        // {
        //     header: 'status',
        //     accessorKey: 'status',
        // },
        {
            header: 'Acciones',
            cell: info => (
                <div className='flex items-center gap-4  text-sm'>
                    <button className="text-blue-500"><Edit3 /></button>
                    <button className="text-red-500"><Trash2 /></button>
                </div>
            ),
        },
    ];


    const fetchRooms = useRoomStore(state => state.fetchRooms);
    const rooms = useRoomStore(state => state.rooms);

    useEffect(() => {
        fetchRooms();
    }, [])

    useEffect(() => {
        if (rooms && rooms.content) {
            setData(rooms.content);
        }
    }, [rooms]);

    console.log(rooms.content);


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting
        },
        onSortingChange: setSorting
    })


    return (
        <div className='w-11/12 m-auto pt-10' >
            <table className='min-w-full  text-base font-light text-surface bg-gray rounded-xl bg-primary'>
                <thead className=" border-b border-[#ced4da] ">
                    {
                        table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {
                                    headerGroup.headers.map(header => (
                                        <th key={header.id} onClick={header.column.getToggleSortingHandler()}
                                            className="px-6 py-3 text-start text-sm font-bold opacity-50">
                                            {
                                                flexRender(header.column.columnDef.header, header.getContext())
                                            }
                                            {
                                                { asc: "⬆️", desc: "⬇️" }[
                                                header.column.getIsSorted() ?? null
                                                ]
                                            }
                                        </th>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </thead>
                <tbody className='font-medium'>
                    {
                        table.getRowModel().rows.map(row => (
                            <tr className='hover:bg-grayDark border-b border-[#ced4da]'>
                                {
                                    row.getVisibleCells().map(cell => (
                                        <td key={cell.id} className="px-6 py-4 text-sm">
                                            {
                                                flexRender(cell.column.columnDef.cell, cell.getContext())
                                            }
                                        </td>
                                    ))
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

    );
};

