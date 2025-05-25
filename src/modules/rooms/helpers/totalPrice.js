import dayjs from "dayjs";


export const totalPrice = (checkin, checkout, price, rooms) => {
    const dateInit = dayjs(checkin);
    const dateFinish = dayjs(checkout);
    const nights = dateFinish.diff(dateInit, 'day')

    const total = (price * nights) * rooms + 20;
    const totalWithoutService = (price * nights);

    console.log(total, nights);

    return {
        nights,
        total,
        totalWithoutService
    }
}