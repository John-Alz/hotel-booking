import { Outlet } from "react-router-dom"
import { SideBar } from "../core/components/SideBar"
import { HeaderAdmin } from "../core/components/HeaderAdmin"
import { Footer } from "../core/components/Footer"


export const AdminLayout = () => {
    return (
        <div className='bg-[#FAFAFA]'>
            <div className='flex border-b-1 border-border'>
                <div>
                    <SideBar />
                </div>
                <div className='w-full'>
                    <HeaderAdmin />
                    <Outlet />
                </div>

            </div>
            {/* <Footer /> */}
        </div>
    )
}
