import { Bell, ChevronDown, Search } from 'lucide-react'
import React from 'react'
import useAuthStore from '../../auth/store/useAuthStore'

export const HeaderAdmin = () => {

    const profile = useAuthStore(state => state.profile);

    return (
        <header className='bg-white w-full flex justify-between p-2'>
            <div className='flex items-center relative'>
                {/* <input type='text' placeholder='Busca aqui' className='bg-[#F2F2F2] py-2 px-2 rounded-lg w-100' />
                <Search color='#737373' className='absolute right-1' /> */}
            </div>
            <div className='flex items-center gap-3'>
                <Bell className='mr-3' />
                <p className='border bg-black border-black py-2 px-4.5 rounded-full text-white cursor-pointer'>{profile?.name.slice(0, 1)}</p>
                <div>
                    <div className='flex'>
                        <p className='font-bold'>{profile?.name} {profile?.lastName}</p>
                        <ChevronDown />
                    </div>
                    <p>{profile?.role?.roleEnum.toLowerCase()}</p>
                </div>
            </div>
        </header>
    )
}
