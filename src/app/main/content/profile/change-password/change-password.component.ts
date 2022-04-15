import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { appAnimations } from 'src/app/core/animations';
import { SnakBarAlertComponent } from 'src/app/core/components/snak-bar-alert/snak-bar-alert.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { WoocommerceService } from 'src/app/core/services/woocommerce.service';
import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss'],
    animations: appAnimations,
    encapsulation: ViewEncapsulation.None
})
export class ChangePasswordComponent {

    public loading: boolean = false;
    public form: FormGroup;

    constructor(
        private formBuild: FormBuilder,
        private auth: AuthService,
        private authenticationService: AuthenticationService,
        private snakBar: MatSnackBar,
        private service: WoocommerceService
    ) {
        this.form = this.formBuild.group({
            current_password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
            new_password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]],
            confirm_password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
        });
    }

    public submit(): void{

        if (this.form.get('new_password').value != this.form.get('confirm_password').value) {
            this.showAlert('Error', 'Las contraseñas no son iguales', 'error');
            return;
        }

        this.loading = true;

        this.authenticationService.login({ 
            username: this.auth.email,
            password: this.form.get('current_password').value
        }).subscribe((_) => {
            this.service.request({
                password: this.form.get('new_password').value
            }, `wp-json/wc/v3/customers/${this.auth.id}`).subscribe((response) => {
                this.showAlert('Exitoso', 'La Contraseña fue actualizada', 'success');
                this.form.reset();
                this.loading = false;
            }, (_) => {
                this.loading = false;
                this.showAlert('Error', 'Occurio un error al actualizar la contraseña', 'error');
            });
        }, (err) => {
            this.showAlert('Error', 'La Contraseña actual no es correcta', 'error');
            this.loading = false;
        });
    }

    public inputValid(control: string): boolean {
        return this.form.get(control).valid;
    }

    private showAlert(message: string, subMessage: string, type: 'error' | 'success'): void {
        this.snakBar.openFromComponent(SnakBarAlertComponent, {
            data: {
                message,
                subMessage,
                type
            },
            panelClass: 'snack-message',
            horizontalPosition: 'right',
            verticalPosition: 'top',
            duration: 3000
        });
    }
}