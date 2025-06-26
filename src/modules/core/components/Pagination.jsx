import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import usePagination from "../store/userPagination";

export const Pagination = ({ data }) => {

    const { page, setPage } = usePagination();


    return (
        <div className='flex justify-center gap-7 items-center '>
            <div className='flex justify-center gap-7 items-center h-[54px] px-4 bg-primary rounded-2xl border my-8'>
                <button className='text-secondary rounded-full w-8 h-8cursor-pointer' disabled={page === 0} onClick={() => setPage(page - 1)}><ChevronLeft size={33} /></button>
                {
                    Array.from({ length: data?.totalPages || 0 }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setPage(index)}
                            className={`w-8 h-8 flex items-center justify-center rounded-full ${page === index ? 'bg-blue-500 text-white' : 'text-gray-700'
                                } hover:bg-blue-100 transition`}
                        >
                            {index + 1}
                        </button>
                    ))
                }
                <button className='text-secondary rounded-full w-8 h-8 cursor-pointer' disabled={page === (data?.totalPages || 0) - 1} onClick={() => setPage(page + 1)}><ChevronRight size={35} /> </button>
            </div>

        </div>
    )
}
