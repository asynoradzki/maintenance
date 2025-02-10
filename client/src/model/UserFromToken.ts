export type UserFromToken = {
    id: string;
    username: string;
    imageUrl: string;
    role: string;
    sub: string;
    exp: number;
};
