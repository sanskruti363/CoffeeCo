import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { MyAccountComponent } from './components/my-account/my-account.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: '',
                component: MyAccountComponent,
            },
        ],
    },
    { path: '**', redirectTo: '/login' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MyAccountRoutingModule {}
