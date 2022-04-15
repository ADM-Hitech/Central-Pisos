import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { appAnimations } from 'src/app/core/animations';
import { SnakBarAlertComponent } from 'src/app/core/components/snak-bar-alert/snak-bar-alert.component';
import { StateModel } from 'src/app/core/models/states.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { WoocommerceService } from 'src/app/core/services/woocommerce.service';
import { ProfileService } from '../profile.service';


@Component({
    selector: 'app-add-address',
    templateUrl: './add-address.component.html',
    styleUrls: ['./add-address.component.scss'],
    animations: appAnimations,
    encapsulation: ViewEncapsulation.None
})
export class AddAddressComponent {

    public type: string = '';
    public form: FormGroup;
    public loading: boolean = false;
    public listStates: Array<StateModel>;
    
    constructor(
        private formBuild: FormBuilder,
        private route: ActivatedRoute,
        private service: WoocommerceService,
        private auth: AuthService,
        private profileService: ProfileService,
        private snakBar: MatSnackBar,
        private router: Router
    ) {
        this.type = this.route.snapshot.paramMap.get('type');
        this.listStates = this.profileService.listStates;

        this.form = this.formBuild.group({
            first_name: [this.profileService?.address?.firstName, Validators.required],
            last_name: [this.profileService?.address?.lastName, Validators.required],
            company: [this.profileService?.address?.company],
            address_1: [this.profileService?.address?.address1, Validators.required],
            city: [this.profileService?.address?.city],
            state: [this.profileService?.address?.state, Validators.required],
            postcode: [this.profileService?.address?.postcode, Validators.required],
            country: ['MX'],
            email: [this.profileService?.address?.email, Validators.required],
            phone: [this.profileService?.address?.phone, Validators.required],
            colony: [this.profileService?.address?.colony],
            number_ext: [this.profileService?.address?.numExt],
            number_int: [this.profileService?.address?.numInt, Validators.required],
            reference: [this.profileService?.address?.reference]
        });
    }

    public submit(): void {
        this.loading = true;
        let object;

        if (this.type == 'envio') {
            object = {
                shipping: this.form.value,
                meta_data: [
                    {
                        key: 'shipping_colony',
                        value: this.form.get('colony').value
                    },
                    {
                        key: 'shipping_number_ext',
                        value: this.form.get('number_ext').value
                    },
                    {
                        key: 'shipping_number_int',
                        value: this.form.get('number_int').value
                    },
                    {
                        key: 'shipping_reference',
                        value: this.form.get('reference').value
                    },
                    {
                        key: 'shipping_email',
                        value: this.form.get('email').value
                    },
                    {
                        key: 'shipping_phone',
                        value: this.form.get('phone').value
                    }
                ]
            };  
        } else {
            object = {
                billing: this.form.value,
                meta_data: [
                    {
                        key: 'billing_colony',
                        value: this.form.get('colony').value
                    },
                    {
                        key: 'billing_number_ext',
                        value: this.form.get('number_ext').value
                    },
                    {
                        key: 'billing_number_int',
                        value: this.form.get('number_int').value
                    },
                    {
                        key: 'billing_reference',
                        value: this.form.get('reference').value
                    }
                ]
            };
        }

        this.service.request(object, `wp-json/wc/v3/customers/${this.auth.id}`).subscribe((response) => {
            this.loading = false;
            this.showAlert('Actualizado', 'La dirección a sido actualizado', 'success');
            this.router.navigate(['/perfil/mis-direcciones']);
        }, err => {
            this.loading = false;
            this.showAlert('Error', 'Error al actualizar la dirección', 'error');
        });

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

    public isValid(control: string): boolean {
        return this.form.get(control).valid;
    }
}