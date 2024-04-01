import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
    },
    {
        path: 'home',
        loadChildren: () => import('./modules/dashboard/dashboard.module').then((m) => m.DashboardModule),
    },
    {
        path: 'store',
        loadChildren: () => import('./modules/store/store.module').then((m) => m.StoreModule),
    },
    {
        path: 'my-account',
        loadChildren: () => import('./modules/my-account/my-account.module').then((m) => m.MyAccountModule),
    },
    { path: '**', redirectTo: '/home' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
