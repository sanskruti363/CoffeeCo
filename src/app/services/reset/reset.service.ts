import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ResetService {
    constructor(private http: HttpClient) {}

    public forgotPassword(email: any) {
        const sendJSON = {
            'email': email,
        };
        return this.http.post<any>(`${environment.api}/forgot`, sendJSON).pipe(
            switchMap((response) => {
                return of(response);
            })
        );
    }

    public resetPassword(sendJSON: any) {
        return this.http.post<any>(`${environment.api}/reset`, sendJSON).pipe(
            switchMap((response) => {
                return of(response);
            })
        );
    }
}
