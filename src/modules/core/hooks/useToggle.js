import { useState } from "react";

export function useToggle(initialState) {

    const [toggle, setToggle] = useState(initialState);

    const handleToggle = () => {
        setToggle(!toggle)
    }

    return {
        toggle,
        handleToggle
    }

}