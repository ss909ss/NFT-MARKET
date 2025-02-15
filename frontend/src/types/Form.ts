export interface IFormRegister {
    id: string;
    token?: string;
    username: string;
    email: string;
    password: string;
    wallet: {
        walletId: string;
    };
}

export interface IFormLogin {
    id: string;
    token?: string;
    email: string;
    password: string;
    username?:string;
    wallet:{
        walletId: string;
    }
}

export type FormData = {
    username: string;
    email: string;
    password: string;
}
export interface ILogoutResponse {
    message: string;
}
