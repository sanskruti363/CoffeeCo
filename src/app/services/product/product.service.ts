import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap, take } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ProductService {
    constructor(private http: HttpClient) {}

    public addProduct(sendJson: any): Observable<any> {
        return this.http.post<any>(`${environment.api}/add-product`, sendJson, { withCredentials: true }).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    public getProducts(): Observable<any> {
        return this.http.get<any>(`${environment.api}/get-products`).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    public startPayment(product: any): Observable<any> {
        return this.http.post<any>(`${environment.api}/create-order`, { product_id: product.product_id }).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    public verifyPayment(data: any): Observable<any> {
        return this.http.post(`${environment.api}/verify-payment`, data).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }

    public fetchOrders(): Observable<any> {
        return this.http.post(`${environment.api}/fetch-orders`, {}, { withCredentials: true }).pipe(
            switchMap((response: any) => {
                return of(response);
            })
        );
    }
}
