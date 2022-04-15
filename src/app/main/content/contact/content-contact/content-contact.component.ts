import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnakBarAlertComponent } from 'src/app/core/components/snak-bar-alert/snak-bar-alert.component';
import { appAnimations } from '../../../../core/animations';
import { ContactService } from '../contact.service';

@Component({
    selector: 'app-content-contact',
    templateUrl: './content-contact.component.html',
    styleUrls: ['./content-contact.component.scss'],
    animations: appAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ContentContactComponent {

    public loading: boolean = false;
    public form: FormGroup;
    
    constructor(private service: ContactService, private formBuild: FormBuilder, private snakbar: MatSnackBar) {
        this.form = this.formBuild.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            telephone: ['', Validators.required],
            message: ['', Validators.required],
            terminos: [false, [Validators.required, Validators.requiredTrue]]
        })
    }

    public submit(): void {
        this.loading = true;

        this.service.contact(this.form.value).subscribe((response) => {
            this.loading = false;
            this.form.reset();
            this.showAlert('Exitoso', 'Su mensaje a sido enviado', 'success');
        }, err => {
            this.loading = false;
            this.showAlert('Error', 'Lo sentimos ocurrio un error', 'error');
        });
    }

    private showAlert(message: string, subMessage: string, type: 'error' | 'success') {

        this.snakbar.openFromComponent(SnakBarAlertComponent, {
            data: {
                message,
                subMessage,
                type
            },
            panelClass: 'snack-message',
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 2500
        });
    }
}