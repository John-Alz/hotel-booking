
import { Outlet } from "react-router-dom";
import { SideBar } from "../core/components/SideBar";
import { HeaderAdmin } from "../core/components/HeaderAdmin";

export const AdminLayout = () => {
    return (
        <div className="flex h-screen overflow-hidden bg-[#FAFAFA]">
            {/* Sidebar fijo */}
            <aside className=" shrink-0 bg-white border-r border-border h-full fixed left-0 top-0 z-40">
                <SideBar />
            </aside>

            {/* Contenedor principal (Header + Outlet) */}
            <div className="flex flex-col flex-1 ml-64 h-full">
                {/* Header fijo */}
                <header className="h-16 shrink-0 bg-white border-b border-border sticky top-0 z-30">
                    <HeaderAdmin />
                </header>

                {/* Contenido scrollable */}
                <main className="flex-1 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

// import { Outlet } from "react-router-dom"
// import { SideBar } from "../core/components/SideBar"
// import { HeaderAdmin } from "../core/components/HeaderAdmin"
// import { Footer } from "../core/components/Footer"


// export const AdminLayout = () => {
//     return (
//         <div className='bg-[#FAFAFA]'>
//             <div className='flex border-b-1 border-border'>
//                 <div>
//                     <SideBar />
//                 </div>
//                 <div className='w-full'>
//                     <HeaderAdmin />
//                     <Outlet />
//                 </div>

//             </div>
//             {/* <Footer /> */}
//         </div>
//     )
// }
