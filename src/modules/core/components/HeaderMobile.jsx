import React from 'react'

export const HeaderMobile = () => {
    return (
        <header>
            <div class="xl:hidden w-11/12 flex justify-between items-center mb-4">
                <div>
                    <h2 class="text-black dark:text-white mt-4 mb-4 text-5xl font-bold">
                        John
                    </h2>
                </div>
                <div>
                    <Location />
                </div>
                <div class="relative dark:text-white">
                    <button id="btn-open" class="flex items-center"
                    ><IoMenu size={60} /></button
                    >
                </div>
                <div class="bg-white dark:bg-blackAbout active inactive">
                    <div
                        class="w-11/12 m-auto flex justify-between text-5xl md:text-7xl text-black dark:text-white"
                    >
                        <ul class="flex flex-col gap-12">
                            <li><a href="#home">Inicio</a></li>
                            <li><a href="#about">Sobre mi</a></li>
                            <li><a href="#stack">Habilidades</a></li>
                            <li><a href="#projects">Proyectos</a></li>
                            <li><a href="#experience">Experiencia</a></li>
                            <li><a href="#studies">Estudios</a></li>
                            <li><a href="#contact">Contacto</a></li>
                        </ul>
                        <div id="btn-close" class="dark:text-white">
                            <IoClose size={60} />
                        </div>
                    </div>
                </div>
            </div>
        </header >
    )
}
