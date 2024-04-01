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