/* eslint-disable @typescript-eslint/no-explicit-any */
export type TCoach = {
    _id: string
    id: string
    name: string
    image: string
    number: string
    bookedSeats: string[]
    departure: Date
    price: number
    seats: number
    error: unknown
    data: unknown
    coach: unknown
}

export type ImageProps = {
    src: string;
    alt: string;
    width: string;
    height: string;
}

export interface Props {
    isAuthenticated: boolean;
    user: any; // Define the type of user object
    error: string | null;
    loginUser: () => void;
    logoutUser: () => void;
}

export interface RootState {
    auth: {
        isAuthenticated: boolean;
        user: {
            name: string; // Update with actual user properties
        } | null;
        error: string | null;
    };
}