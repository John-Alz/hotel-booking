// import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import useBookingStore from "../../booking/store/useBookingStore";
import { useEffect } from "react";
import useUsersStore from "../../users/store/useUsersStore";
import useMetricsStore from "../store/useMetricsStore";

export function SectionCards() {

    const fetchMetrics = useMetricsStore(state => state.fetchMetrics);
    const metrics = useMetricsStore(state => state.metrics);


    useEffect(() => {
        fetchMetrics();
    }, [])


    console.log(metrics);


    return (
        <div className="grid grid-cols-4 gap-4">
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Total Reservas</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {metrics?.totalBookings}
                        {/* 30 */}
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            {/* <IconTrendingUp /> */}
                            +{metrics?.bookingsGrowth}%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Actividad operativa estable
                        {/* <IconTrendingUp className="size-4" /> */}
                    </div>
                    <div className="text-muted-foreground">
                        Registro de reservas mensuales
                    </div>
                </CardFooter>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Total Clientes</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        50
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            {/* <IconTrendingDown /> */}
                            +20%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Variación en el flujo de nuevos clientes
                        {/* <IconTrendingDown className="size-4" /> */}
                    </div>
                    <div className="text-muted-foreground">
                        Total de clientes registrados en el sistema
                    </div>
                </CardFooter>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Reservas Canceladas</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {metrics?.cancelledBookings}
                        {/* 8 */}
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            {/* <IconTrendingUp /> */}
                            +{metrics?.cancelledGrowth}%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Cancelaciones durante el mes
                        {/* <IconTrendingUp className="size-4" /> */}
                    </div>
                    <div className="text-muted-foreground">Incluye todas las reservas anuladas </div>
                </CardFooter>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Total Ingresos</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        ${metrics?.monthlyRevenue}
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            {/* <IconTrendingUp /> */}
                            +{metrics?.revenueGrowth}%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Rendimiento financiero mensual
                        {/* <IconTrendingUp className="size-4" /> */}
                    </div>
                    <div className="text-muted-foreground">Ingresos generados por reservas pagadas</div>
                </CardFooter>
            </Card>
        </div>
    )
}
