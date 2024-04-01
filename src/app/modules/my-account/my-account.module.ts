import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { MyAccountRoutingModule } from './my-account-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { MatButtonModule } from '@angular/material/button';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        MyAccountComponent,
    ],
    imports: [CommonModule, MyAccountRoutingModule, ReactiveFormsModule, MatButtonModule, MatProgressSpinnerModule],
})
export class MyAccountModule {}
