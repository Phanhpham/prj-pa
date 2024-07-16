export interface User{
    id: number,
    userName: string,
    email:string,
    password: string,
    confirmPassword: string
}
export interface Users{
    id:number,
    email:string,
    password:string
}

export interface Logins{
    email: string,
    password: string,
}