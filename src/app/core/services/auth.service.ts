import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    
    constructor() {}

    public get isAuthenticated(): boolean {
        const token = localStorage.getItem('token');

        if (token === null) {
            return false;
        }
        
        return this.id > 0;
    }

    public get id(): number {
        const token = localStorage.getItem('token');

        if (token === null) return -1;

        const count = token[1];
        const lastItem = parseInt(token.slice(-count), 10);
        if (isNaN(lastItem)) {
            return -1;
        }

        return lastItem;
    }

    public get email(): string {
        return localStorage.getItem('email') ?? null;
    }
}