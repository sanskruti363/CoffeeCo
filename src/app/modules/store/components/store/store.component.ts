import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddProductComponent } from '../add-product/add-product.component';
import { ProductService } from 'src/app/services/product/product.service';
import { WindowRefService } from 'src/app/services/utility/window-ref.service';
import { AddUserDataComponent } from '../add-user-data/add-user-data.component';

@Component({
    selector: 'app-store',
    templateUrl: './store.component.html',
    styleUrls: ['./store.component.scss'],
    providers: [WindowRefService],
})
export class StoreComponent implements OnInit {
    constructor(
        private matDialog: MatDialog,
        private productService: ProductService,
        private winRef: WindowRefService,
        private authService: AuthService
    ) {}

    public isSuperUser$ = this.authService.isSuperUser$;

    public itemsLoading = false;

    public products: any = [];

    public productData: any = undefined;

    public userData: any = {};

    ngOnInit(): void {
        this.authService.getUser().pipe(take(1)).subscribe();
        this.getProductList();
    }

    addProduct() {
        const matDialogRef: MatDialogRef<AddProductComponent> = this.matDialog.open(AddProductComponent, {
            disableClose: false,
            autoFocus: false,
            panelClass: 'fix-max-width-dbox-712',
        });

        matDialogRef
            .afterClosed()
            .pipe(take(1))
            .subscribe((response) => {
                if (response) {
                    this.productService
                        .addProduct(response)
                        .pipe(take(1))
                        .subscribe(() => {
                            this.getProductList();
                        });
                }
            });
    }

    getProductList() {
        this.itemsLoading = true;
        this.productService
            .getProducts()
            .pipe(take(1))
            .subscribe((response) => {
                this.products = response;
                this.itemsLoading = false;
            });
    }

    onClickBuyNow(product: any) {
        const matDialogRef: MatDialogRef<AddUserDataComponent> = this.matDialog.open(AddUserDataComponent, {
            disableClose: false,
            autoFocus: false,
            panelClass: 'fix-max-width-dbox-712',
        });
        matDialogRef
            .afterClosed()
            .pipe(take(1))
            .subscribe((response) => {
                if (response) {
                    this.productData = undefined;
                    this.userData = response;
                    this.productService
                        .startPayment(product)
                        .pipe(take(1))
                        .subscribe((response) => {
                            this.productData = JSON.parse(response.product)[0]?.fields;
                            const options = {
                                key: 'rzp_test_H0k0zI3eBeHwT1',
                                amount: '',
                                currency: 'INR',
                                name: 'Ary By Sanskruti',
                                order_id: response.order.id,
                                handler: this.paymentResponseHandler.bind(this),
                                theme: { color: '#3399cc' },
                            };
                            const rzp = new this.winRef.nativeWindow.Razorpay(options);
                            rzp.open();
                        });
                }
            });
    }

    private paymentResponseHandler(data: any) {
        const combinedData = Object.assign(data, this.userData, this.productData);
        this.productService
            .verifyPayment(combinedData)
            .pipe(take(1))
            .subscribe((response) => {
                console.log('verify payment ->', response);
            });
    }
}
