import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DashboardService } from '../../services/dashboard.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    userData: any = { userName: 'User' }; // Default user data
    dashboardData: any = null;
    reminders: any[] = [];
    files: any[] = [];
    loading = true;

    // Reminder form
    showReminderForm = false;
    reminderTitle = '';
    reminderDate = '';
    reminderTime = '';
    addingReminder = false;

    // PDF upload
    selectedFile: File | null = null;

    constructor(
        private authService: AuthService,
        private dashboardService: DashboardService,
        private router: Router
    ) {
    }

    ngOnInit() {
        if (!this.authService.isLoggedIn()) {
            this.router.navigate(['/login']);
            return;
        }

        this.loadDashboardData();
    }

    // Load dashboard data from mock API
    loadDashboardData() {
        this.loading = true;
        this.dashboardService.getDashboardData().subscribe({
            next: (data) => {
                this.dashboardData = data;
                this.files = data.files || [];
                this.reminders = data.reminders || [];
                this.loading = false;
            },
            error: (error) => {
                this.loading = false;
                console.error('Dashboard error:', error);
            }
        });
    }


    // Toggle reminder form visibility
    toggleReminderForm() {
        this.showReminderForm = !this.showReminderForm;
        if (!this.showReminderForm) {
            this.resetReminderForm();
        }
    }

    // Add new reminder
    addReminder() {
        if (!this.reminderTitle || !this.reminderDate || !this.reminderTime) {
            alert('Please fill in all reminder fields');
            return;
        }

        this.addingReminder = true;
        this.dashboardService.addReminder({
            title: this.reminderTitle,
            dueDate: this.reminderDate,
            dueTime: this.reminderTime
        }).subscribe({
            next: (response) => {
                this.reminders.push({
                    id: response.reminder.id,
                    title: this.reminderTitle,
                    dueDate: this.reminderDate,
                    dueTime: this.reminderTime,
                    createdAt: new Date().toISOString().split('T')[0]
                });
                this.addingReminder = false;
                this.resetReminderForm();
                this.showReminderForm = false;
            },
            error: (error) => {
                this.addingReminder = false;
                alert('Failed to add reminder');
            }
        });
    }


    // Delete reminder

    deleteReminder(reminderId: number) {
        if (confirm('Are you sure you want to delete this reminder?')) {
            this.dashboardService.deleteReminder(reminderId).subscribe({
                next: () => {
                    this.reminders = this.reminders.filter(r => r.id !== reminderId);
                },
                error: () => {
                    alert('Failed to delete reminder');
                }
            });
        }
    }


    // Handle PDF file selection

    onFileSelected(event: any) {
        this.selectedFile = event.target.files[0];
    }

    // Upload PDF file

    uploadPDF() {
        if (!this.selectedFile) {
            alert('Please select a PDF file');
            return;
        }

        this.loading = true;
        this.dashboardService.uploadPDF(this.selectedFile).subscribe({
            next: (response) => {
                this.loading = false;
                alert('PDF uploaded successfully');
                this.selectedFile = null;
                // Navigate to PDF reader with the file ID
                this.router.navigate(['/pdf-reader', 1]);
            },
            error: (error) => {
                this.loading = false;
                alert('Failed to upload PDF');
            }
        });
    }


    openPDF(fileId: number) {
        this.router.navigate(['/pdf-reader', fileId]);
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

    private resetReminderForm() {
        this.reminderTitle = '';
        this.reminderDate = '';
        this.reminderTime = '';
    }
}
