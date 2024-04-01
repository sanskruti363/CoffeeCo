import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { ResetService } from 'src/app/services/reset/reset.service';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
    public resetPasswordForm!: FormGroup;

    constructor(private resetService: ResetService, private activatedRoute: ActivatedRoute, private router: Router) {
        this.resetPasswordForm = new FormGroup({
            password: new FormControl('', Validators.required),
            password_confirm: new FormControl('', Validators.required),
        });
    }

    ngOnInit(): void {}

    submitPassword() {
        const sendJSON: any = {
            ...this.resetPasswordForm.getRawValue(),
            token: this.activatedRoute.snapshot.params['token'],
        };

        this.resetService
            .resetPassword(sendJSON)
            .pipe(take(1))
            .subscribe(() => {
                this.router.navigate(['/my-account/login']);
            });
    }
}
