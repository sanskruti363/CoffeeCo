import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './services/auth-service/auth.service';
import { Router } from '@angular/router';
import { Observable, Subscription, take } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    private allSubList = new Subscription();

    public isAuthenticated$!: Observable<any>;

    constructor(public authService: AuthService, private router: Router) {}

    ngOnInit(): void {
        this.isAuthenticated$ = this.authService.isAuthenticated$;
    }

    public goToStore() {
        this.router.navigate(['/store']);
    }

    public goToHome() {
        this.router.navigate(['/home']);
    }

    public goToMyAccount() {
        this.router.navigate(['/my-account']);
    }

    ngOnDestroy(): void {
        this.allSubList.unsubscribe();
    }
}
