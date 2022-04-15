import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { SnakBarAlertComponent } from "src/app/core/components/snak-bar-alert/snak-bar-alert.component";
import { AuthenticationService } from "../authentication.service";

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ForgotPasswordComponent {
    
    public form: FormGroup;
    public loading: boolean = false;

    constructor(
        private rest: AuthenticationService,
        private formBuild: FormBuilder,
        private snakBar: MatSnackBar,
        private router: Router
    ) {
        this.form = this.formBuild.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    public submit(): void {
        this.loading = true;

        this.rest.forgorPassword(this.form.get('email').value).subscribe((response) => {
            this.showAlert('Exitoso', 'Se a enviado un email con su nueva contraseña', 'success');
            this.loading = false;
            this.router.navigate(['/auth/login']);
        }, err => {

            if (err.error.message) {
                this.showAlert('Error', err.error.message, 'error');
            } else {
                this.showAlert('Error', 'Ocurrio un error intentelo mas tarde', 'error');
            }
            
            this.loading = false;
        })
    }

    private showAlert(message: string, subMessage: string, type: 'success' | 'error') {
        this.snakBar.openFromComponent(SnakBarAlertComponent, {
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