export interface IFormRegister{
    username: string;
    email: string;
    password: string;
}

export interface IFormLogin{
    email: string;
    password: string;
}

export type FormData={
    username?: string;
    email: string;
    password: string;
}

