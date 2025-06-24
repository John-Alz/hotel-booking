import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

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

export function SectionCards() {

    const fetchBookings = useBookingStore(state => state.fetchBookings);
    const bookings = useBookingStore(state => state.bookings);
    const filtersBooking = useBookingStore(state => state.filtersBooking);
    const users = useUsersStore(state => state.users);
    const fetchUsers = useUsersStore(state => state.fetchUsers);
    const filtersUsers = useUsersStore(state => state.filtersUsers);

    useEffect(() => {
        fetchBookings(filtersBooking);
        fetchUsers(filtersUsers);
    }, [])


    const bookingCancelled = bookings?.content?.filter(item => item.status === "CANCELADA");
    const usersClients = users?.content?.filter(item => item.role.roleEnum === "CLIENTE");
    // const bookingCancelled = bookings.content.filter(item => item.status === "CANCELADA");
    console.log(bookingCancelled);
    console.log(usersClients);




    return (
        <div className="grid grid-cols-4 gap-4">
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Total Reservas</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {bookings?.content?.length}
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <IconTrendingUp />
                            +12.5%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Aumento respecto al mes anterior <IconTrendingUp className="size-4" />
                    </div>
                    <div className="text-muted-foreground">
                        Total de reservas realizadas este mes
                    </div>
                </CardFooter>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Total Clientes</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        1,234
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <IconTrendingDown />
                            -20%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Down 20% this period <IconTrendingDown className="size-4" />
                    </div>
                    <div className="text-muted-foreground">
                        Acquisition needs attention
                    </div>
                </CardFooter>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Reservas Canceladas</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {bookingCancelled?.length}
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <IconTrendingUp />
                            +12.5%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Strong user retention <IconTrendingUp className="size-4" />
                    </div>
                    <div className="text-muted-foreground">Engagement exceed targets</div>
                </CardFooter>
            </Card>
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Total Ingresos</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        4.5%
                    </CardTitle>
                    <CardAction>
                        <Badge variant="outline">
                            <IconTrendingUp />
                            +4.5%
                        </Badge>
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="line-clamp-1 flex gap-2 font-medium">
                        Steady performance increase <IconTrendingUp className="size-4" />
                    </div>
                    <div className="text-muted-foreground">Meets growth projections</div>
                </CardFooter>
            </Card>
        </div>
    )
}
