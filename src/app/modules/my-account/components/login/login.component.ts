import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;

    constructor(public authService: AuthService, private router: Router) {
        this.loginForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required),
        });
    }

    ngOnInit(): void {}

    login() {
        if (this.loginForm?.valid) {
            this.authService
                .loginUser(this.loginForm?.getRawValue())
                .pipe(take(1))
                .subscribe({
                    next: () => {
                        console.log('Logged in');
                    },
                    error: (error) => {
                        throwError(() => error);
                    },
                });
        }
    }

    forgotPassword() {
        this.router.navigate(['/my-account/forgot']);
    }

    singInWithGoogle() {}
}
