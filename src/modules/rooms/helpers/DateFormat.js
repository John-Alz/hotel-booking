// useDateFormat.js
import { useState } from "react";
import dayjs from "dayjs";
import 'dayjs/locale/es';

dayjs.locale('es');

export const useDateFormat = (initialDate, flag) => {
    const dateSelected = dayjs(initialDate);
    let format = '';
    if (flag === true) {
        format = dateSelected.format("dddd, D MMMM YYYY");
    } else {
        format = dateSelected.format("D MMMM YYYY");
    }
    const formatted = format.charAt(0).toUpperCase() + format.slice(1);

    return formatted;
};
