import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
    selector: 'app-my-account',
    templateUrl: './my-account.component.html',
    styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent implements OnInit {
    public isAuthenticated$!: Observable<any>;

    public isLoginActive = true;

    public isDataLoading = false;

    public orders: any = [];

    constructor(private authService: AuthService, private productService: ProductService) {
        this.isAuthenticated$ = this.authService.isAuthenticated$;
    }

    ngOnInit() {
        this.isDataLoading = true;
        this.authService
            .getUser()
            .pipe(take(1))
            .subscribe({
                next: () => {
                    this.isDataLoading = false;
                    this.fetchOrders();
                },
                error: () => {
                    this.isDataLoading = false;
                },
            });
    }

    public fetchOrders() {
        this.productService
            .fetchOrders()
            .pipe(take(1))
            .subscribe((response) => {
                this.orders = response?.orders;
            });
    }

    public logOut() {
        this.authService.logOutUser().pipe(take(1)).subscribe();
    }

    public changeLocation() {
        this.isLoginActive = !this.isLoginActive;
    }
}
