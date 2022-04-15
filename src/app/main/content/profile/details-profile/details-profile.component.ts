import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { appAnimations } from 'src/app/core/animations';
import { AuthService } from 'src/app/core/services/auth.service';
import { WoocommerceService } from 'src/app/core/services/woocommerce.service';
import { ProfileService } from '../profile.service';

@Component({
    selector: 'app-details-profile',
    templateUrl: './details-profile.component.html',
    styleUrls: ['./details-profile.component.scss'],
    animations: appAnimations,
    encapsulation: ViewEncapsulation.None
})
export class DetailsProfileComponent {

    public loading: boolean = false;
    public loadingData: boolean = false;
    public form: FormGroup;

    constructor(
        private formBuild: FormBuilder,
        private woocommerService: WoocommerceService,
        private auth: AuthService,
        private service: ProfileService
    ) {
        this.form = this.formBuild.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            birth_date: ['', Validators.required],
            gender: ['', Validators.required],
            telephone: ['', Validators.required]
        });

        this.getCustomer();
    }

    public submit(): void {
        this.loading = true;

        var formRequest = this.form.value;
        var idUser = this.auth.id;

        formRequest.billing = {
            phone: this.form.get('telephone').value
        };
        formRequest.meta_data = [
            {
                key: 'birth_date',
                value: this.form.get('birth_date').value
            },
            {
                key: 'gender',
                value: this.form.get('gender').value
            }
        ];

        this.woocommerService.request(formRequest, `wp-json/wc/v3/customers/${idUser}`).subscribe((response) => {
            this.loading = false;
        });
    }

    public getCustomer(): void {
        var idUser = this.auth.id;
        this.loadingData = true;

        this.service.getCustomer(idUser).subscribe((response) => {
            console.log(response);
            this.form.get('first_name').setValue(response.first_name);
            this.form.get('last_name').setValue(response.last_name);
            this.form.get('email').setValue(response.email);
            this.form.get('telephone').setValue(response.billing.phone);

            var metagender = response.meta_data.find(meta => meta.key == 'gender')?.value;
            var metabirthdate = response.meta_data.find(meta => meta.key == 'birth_date')?.value;

            this.form.get('gender').setValue(metagender);
            this.form.get('birth_date').setValue(metabirthdate);

            this.loadingData = false;
        });
    }
}