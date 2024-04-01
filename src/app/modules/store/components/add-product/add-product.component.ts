import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.scss'],
})
export class AddProductComponent {
    public productAddForm!: FormGroup;

    constructor(private dialogRef: MatDialogRef<AddProductComponent>) {
        this.productAddForm = new FormGroup({
            title: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            price: new FormControl('', Validators.required),
            quantity_available: new FormControl('', Validators.required),
            image_url: new FormControl(''),
        });
    }

    saveDetails() {
        if (this.productAddForm?.valid) {
            this.dialogRef.close(this.productAddForm.getRawValue());
        }
    }
}
