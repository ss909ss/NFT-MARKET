export interface IFormRegister{
    token?: string;
    username: string;
    email: string;
    password: string;
}

export interface IFormLogin{
    token?: string;
    email: string;
    password: string;
    username?:string
}

export type FormData={
    username: string;
    email: string;
    password: string;
}

