import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreComponent } from './components/store/store.component';
import { StoreRoutingModule } from './store-routing.module';
import { AddProductComponent } from './components/add-product/add-product.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AddUserDataComponent } from './components/add-user-data/add-user-data.component';

@NgModule({
    declarations: [StoreComponent, AddProductComponent, AddUserDataComponent],
    imports: [
        CommonModule,
        StoreRoutingModule,
        MatDialogModule,
        MatInputModule,
        ReactiveFormsModule,
        MatButtonModule,
        FormsModule,
        MatProgressSpinnerModule,
    ],
})
export class StoreModule {}
