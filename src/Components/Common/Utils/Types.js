
export type User = {
    userId: string,
    email: string,
    password: string,
    confPassword: string  
}

export type Institution = {
    name: string,
    initials: string,
    instId: string,
    email: string,
    password: string,
    confPassword: string
    
} 

export type UserLogin = {
    clientId: string,
    password: string
}

