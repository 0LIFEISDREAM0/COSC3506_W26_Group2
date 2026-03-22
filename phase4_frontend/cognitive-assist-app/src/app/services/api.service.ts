import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) { }


    // Generic GET request

    get<T>(url: string): Observable<T> {
        return this.http.get<T>(url);
    }


    // Generic POST request

    post<T>(url: string, data: any): Observable<T> {
        return this.http.post<T>(url, data);
    }


    // Generic PUT request

    put<T>(url: string, data: any): Observable<T> {
        return this.http.put<T>(url, data);
    }


    // Generic DELETE request

    delete<T>(url: string): Observable<T> {
        return this.http.delete<T>(url);
    }
}
