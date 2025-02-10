import { UserFromToken } from "../model/UserFromToken";
import { ACCESS_TOKEN } from "../constants/constants";
import { jwtDecode } from "jwt-decode";

export function saveTokenToLocaleStorage({ access_token }: { access_token: string }): void {
    localStorage.setItem(ACCESS_TOKEN, access_token);
}

export const validateEmailRFC2822 = (email: string): boolean => {
    const validRegex: RegExp =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return validRegex.test(email);
};

function isTokenExpired(tokenExp: number, currentTimestamp: number): boolean {
    const tenSeconds: number = 0;
    return tokenExp < currentTimestamp - tenSeconds;
}

function verifyIfTokenIsValid(jwtToken: string | null): boolean {
    const currentTimestamp = Math.round(Date.now() / 1000);
    if (jwtToken === null || jwtToken.length === 0) {
        return false;
    }
    const decodedToken: UserFromToken = jwtDecode(jwtToken);
    const tokenExp: number = decodedToken.exp;

    return !isTokenExpired(tokenExp, currentTimestamp);
}

export const handleLogout = () => {
    localStorage.clear();
};

export const getJwtToken = async (): Promise<string | null> => {
    const jwtToken: string | null = localStorage.getItem(ACCESS_TOKEN);

    if (verifyIfTokenIsValid(jwtToken)) {
        return jwtToken;
    }

    if (jwtToken) {
        handleLogout();
    }

    return null;
};
