import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
    registerForm!: FormGroup;

    constructor(public auth: AuthService, private router: Router) {
        this.registerForm = new FormGroup({
            first_name: new FormControl('', Validators.required),
            last_name: new FormControl('', Validators.required),
            email: new FormControl('', [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required),
            password_confirm: new FormControl('', Validators.required),
        });
    }

    ngOnInit(): void {}

    submitForm() {
        if (this.registerForm?.valid) {
            this.auth
                .registerUser(this.registerForm?.getRawValue())
                .pipe(take(1))
                .subscribe(() => {
                    this.router.navigate(['/my-account/login']);
                });
        }
    }
}
