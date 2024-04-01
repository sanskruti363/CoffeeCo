import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { AddProductComponent } from '../add-product/add-product.component';
import { take } from 'rxjs';

@Component({
    selector: 'app-add-user-data',
    templateUrl: './add-user-data.component.html',
    styleUrls: ['./add-user-data.component.scss'],
})
export class AddUserDataComponent implements OnInit {
    public customerDataForm!: FormGroup;

    public fetchingData = false;

    constructor(private dialogRef: MatDialogRef<AddProductComponent>, private authService: AuthService) {
        this.customerDataForm = new FormGroup({
            first_name: new FormControl('', Validators.required),
            last_name: new FormControl('', Validators.required),
            email: new FormControl('', Validators.required),
        });
    }

    ngOnInit(): void {
        this.fetchingData = true;
        this.authService
            .getUser()
            .pipe(take(1))
            .subscribe((response) => {
                if (response?.status) {
                    this.customerDataForm.patchValue(response.data);
                    this.fetchingData = false;
                }
            });
    }

    proceed() {
        if (this.customerDataForm?.valid) {
            this.dialogRef.close(this.customerDataForm.getRawValue());
        }
    }
}
