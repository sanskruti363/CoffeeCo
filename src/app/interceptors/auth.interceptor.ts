import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, switchMap, take, throwError } from 'rxjs';
import { AuthService } from '../services/auth-service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    private refresh = false;

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const req = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.authService.getAccessToken}`,
            },
        });
        return next.handle(req).pipe(
            catchError((err: HttpErrorResponse) => {
                if (err.status === 403 && !this.refresh) {
                    this.refresh = true;
                    return this.authService.getRefreshToken().pipe(
                        switchMap(() => {
                            const updatedRequest = request.clone({
                                setHeaders: {
                                    Authorization: `Bearer ${this.authService.getAccessToken}`,
                                },
                            });
                            return next.handle(updatedRequest);
                        })
                    );
                }
                this.refresh = false;
                return throwError(() => err);
            })
        );
    }
}
