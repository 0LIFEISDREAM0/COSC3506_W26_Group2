import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    email = '';
    password = '';
    loading = false;
    error = '';

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }


    //Handle login form submission

    onLogin() {
        this.error = '';

        //Basic Validation
        if (!this.email || !this.password) {
            this.error = 'Email and password are required';
            return;
        }

        this.loading = true;

        this.authService.login({ email: this.email, password: this.password }).subscribe({
            next: (response) => {
                this.loading = false;
                console.log('Login successful', response);
                this.router.navigate(['/dashboard']);
            },
            error: (error) => {
                this.loading = false;
                this.error = error.message || 'Login failed. Please try again.';
            }
        });
    }

    goToRegister() {
        this.router.navigate(['/register']);
    }
}
