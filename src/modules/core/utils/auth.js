import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
export const getToken = () => {
    const token = Cookies.get("jwtToken");
    return token;
}

export const isAuth = () => {
    const token = getToken();
    console.log(token);
    if (!token) {
        return false;
    }
    return true;
}

export const extractRole = () => {
    const token = getToken();
    const decodeJwt = jwtDecode(token)
    const role = decodeJwt.authorities
    console.log(role);
    console.log(decodeJwt);
    return role;

}

export const hasRole = (allowedRoles = []) => {
    const role = extractRole()
    console.log("ROLE JWT: " + role);
    console.log("ROLE ALLOWED: " + allowedRoles);

    return role && allowedRoles.includes(role)
}