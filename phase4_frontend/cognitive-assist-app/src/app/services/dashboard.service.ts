import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    private mockDashboardUrl = '/assets/mock/dashboard.json';
    private mockReminderUrl = '/assets/mock/reminder.json';
    private mockPdfContentUrl = '/assets/mock/pdf-content.json';

    constructor(private http: HttpClient) { }
    // Get dashboard data with user's files and reminders
    getDashboardData(): Observable<any> {
        return this.http.get<any>(this.mockDashboardUrl);
    }

    addReminder(reminder: any): Observable<any> {
        return this.http.get<any>(this.mockReminderUrl);
    }

    // Delete reminder by ID
    deleteReminder(reminderId: number): Observable<any> {
        return this.http.delete<any>(`/assets/mock/reminder.json`);
    }

    uploadPDF(file: File): Observable<any> {
        return this.http.get<any>('/assets/mock/dashboard.json');
    }

    //Returning mock pdf for now
    //Need to implement actual pdf parsing and content extraction 
    getPDFContent(fileId: number): Observable<any> {
        return this.http.get<any>(this.mockPdfContentUrl);
    }
}
