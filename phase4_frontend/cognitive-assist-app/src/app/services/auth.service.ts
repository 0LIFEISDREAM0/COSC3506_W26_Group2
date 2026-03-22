import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private mockLoginUrl = '/assets/mock/login.json';
    private mockRegisterUrl = '/assets/mock/register.json';
    private isLoggedInKey = 'is-logged-in';

    constructor(private http: HttpClient) { }

    login(credentials: any): Observable<any> {
        if (!this.isValidEmail(credentials.email) || !credentials.password) {
            return throwError(() => new Error('Invalid email or password'));
        }

        return this.http.get<any>(this.mockLoginUrl).pipe(
            tap(response => {
                if (response.success) {
                    localStorage.setItem(this.isLoggedInKey, 'true');
                }
            })
        );
    }

    register(credentials: any): Observable<any> {
        if (!this.isValidEmail(credentials.email) || !credentials.password) {
            return throwError(() => new Error('Invalid email or password'));
        }

        return this.http.get<any>(this.mockRegisterUrl);
    }

    //Check if user is logged in
    isLoggedIn(): boolean {
        return localStorage.getItem(this.isLoggedInKey) === 'true';
    }

    // Logout user - Terminate user session
    logout(): void {
        localStorage.removeItem(this.isLoggedInKey);
    }

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}
