import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { ChartContainer } from "@/components/ui/chart"

const chartData = [
    { month: "Enero", desktop: 186, },
    { month: "Febrero", desktop: 305 },
    { month: "Marzo", desktop: 237 },
    { month: "Abril", desktop: 73 },
    { month: "Mayo", desktop: 209 },
    { month: "Junio", desktop: 214 },
    { month: "Julio", desktop: 220 },
    { month: "Agosto", desktop: 130 },
    { month: "Septiembre", desktop: 250 },
    { month: "Octubre", desktop: 119 },
    { month: "Noviembre", desktop: 250 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "#2563eb",
    }
}

export const Chart = () => {
    return (
        <div className="bg-primary rounded-2xl border shadow-sm">
            {/* <h2 className="font-bold p-4">Reservas</h2> */}
            <ChartContainer config={chartConfig} className="min-h-[389px] w-full">
                <BarChart accessibilityLayer data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                    // tickFormatter={(value) => value?.slice(0, 3)}
                    />
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={10}
                    />
                    <Bar dataKey="desktop" fill="#2563eb" radius={4} />
                </BarChart>
            </ChartContainer>
        </div>
    )
}
