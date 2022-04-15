import { Component, Inject, ViewEncapsulation } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'app-alert-shipping',
    templateUrl: './alert-shipping.component.html',
    styleUrls: ['./alert-shipping.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AlertShippingComponent {

    constructor(
        private dialogRef: MatDialogRef<AlertShippingComponent>
    ) {
        this.dialogRef.disableClose = true;
    }

    public close(): void {
        this.dialogRef.close();
    }
}