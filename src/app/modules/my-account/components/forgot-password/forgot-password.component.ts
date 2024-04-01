import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { ResetService } from 'src/app/services/reset/reset.service';

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
    constructor(private resetService: ResetService) {}

    public email: FormControl = new FormControl('abc@mail.com', Validators.required);

    public response: any;
    ngOnInit(): void {}

    sendEmail() {
        if (this.email.valid) {
            this.resetService
                .forgotPassword(this.email.value)
                .pipe(take(1))
                .subscribe({
                    next: () => {
                        this.response = {
                            'success': true,
                            'message': 'Email sent successfully',
                        };
                    },
                    error: () => {
                        this.response = {
                            'success': false,
                            'message': 'Something went wrong',
                        };
                    },
                });
        }
    }
}
