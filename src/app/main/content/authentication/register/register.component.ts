import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { SnakBarAlertComponent } from "src/app/core/components/snak-bar-alert/snak-bar-alert.component";
import { AuthErrorModel } from "src/app/core/models/auth-error.model";
import { AuthResponseModel } from "src/app/core/models/auth-response.model";
import { WoocommerceService } from "src/app/core/services/woocommerce.service";
import { AuthenticationService } from "../authentication.service";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

    public form: FormGroup;
    public loading: boolean;
    public showpass: boolean;

    constructor(
        private woocommerService: WoocommerceService,
        private formBuild: FormBuilder,
        private snakBar: MatSnackBar,
        private router: Router
    ) {
        this.form = this.formBuild.group({
           email: ['', [Validators.required, Validators.email]],
           first_name: ['', Validators.required],
           last_name: ['', Validators.required],
           username: ['', Validators.required],
           password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&+])[A-Za-z\d$@$!%*?&+].{8,}')]]
        });
    }

    public submit(): void {
        this.loading = true;

        //Enterprice*1
        this.woocommerService.request(this.form.value, 'wp-json/wc/v3/customers').subscribe((response) => {
            this.loading = false;
            this.form.reset();
            this.router.navigate(['/auth/login']);
        }, (err) => {
            this.loading = false;

            var code = err.error.code.replace(/-/g, ' ');
            var message = err.error.message;

            if (err.error.message.includes('accede')) {
                message = message.replace('#', '/auth/login');
            }

            this.snakBar.openFromComponent(SnakBarAlertComponent, {
                data: {
                    message: code,
                    subMessage: message,
                    type: 'error'
                },
                panelClass: 'snack-message',
                horizontalPosition: 'right',
                verticalPosition: 'top',
                duration: 5000
            });
        });
    }

    public showAndHidePassword(): void {
        this.showpass = !this.showpass;
    }
}