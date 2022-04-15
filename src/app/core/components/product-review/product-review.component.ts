import { HttpClient } from "@angular/common/http";
import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AuthService } from "../../services/auth.service";
import { WoocommerceService } from "../../services/woocommerce.service";

@Component({
    selector: 'app-product-review',
    templateUrl: './product-review.component.html',
    styleUrls: ['./product-review.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProductReviewComponent {

    public comment: string = '';
    public form: FormGroup;
    public loading: boolean = false;

    constructor(
        private formBuild: FormBuilder,
        private authService: AuthService,
        private wcService: WoocommerceService,
        public dialogRef: MatDialogRef<ProductReviewComponent>,
        @Inject(MAT_DIALOG_DATA) private inputs: {
            name: string,
            productid: number,
            rating: number
        }
    ) {
        this.form = this.formBuild.group({
            product_id: [inputs.productid, Validators.required],
            review: ['', Validators.required],
            reviewer: ['', Validators.required],
            reviewer_email: ['', [Validators.required, Validators.email]],
            rating: [inputs.rating, [Validators.required, Validators.min(1), Validators.max(5)]],
        });

        this.dialogRef.disableClose = true;
    }

    public changeRating(value: number): void {
        this.form.get('rating').setValue(value);
    }

    public get rating(): number {
        return this.form.get('rating').value ?? 0;
    }

    public submitReview(): void {
        this.loading = true;
        this.wcService.request(this.form.value, 'wp-json/wc/v3/products/reviews').subscribe((response) => {
            this.close(true);
            this.loading = false;
        });
    }

    public isAuthenticated(): boolean {
        return this.authService.isAuthenticated;
    }

    public close(success: boolean): void {
        this.dialogRef.close({
            success,
            rating: this.rating
        });
    }

    public get productName(): string {
        return this.inputs.name;
    }
}