import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { SnakBarAlertComponent } from 'src/app/core/components/snak-bar-alert/snak-bar-alert.component';
import { AuthErrorModel } from 'src/app/core/models/auth-error.model';
import { AuthResponseModel } from 'src/app/core/models/auth-response.model';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public loading: boolean;
  public showpass: boolean;

  constructor(
    private authService: AuthenticationService,
    private formBuild: FormBuilder,
    private snakBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.formBuild.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.loading = false;
  }

  ngOnInit() {
  }

  public submit(): void {
    this.loading = true;

    this.authService.login(this.form.value).subscribe((response) => {
      const auth = AuthResponseModel.fromJson(response);
      
      localStorage.setItem('token', auth.token);
      localStorage.setItem('displayName', auth.displayName);
      localStorage.setItem('email', auth.email);
      localStorage.setItem('nicename', auth.nicename);

      this.router.navigate(['/perfil/detalles']);

      this.loading = false;
    }, (error) => {
      const authError = AuthErrorModel.fromJson(error.error);

      const messagesplit = authError.message.split('<a');
      let message = authError.message;

      if (messagesplit.length > 1) {
        message = authError.message[0];
      }

      this.snakBar.openFromComponent(SnakBarAlertComponent, {
        data: {
          message: authError.clearCode,
          subMessage: authError.message,
          type: 'error'
        },
        panelClass: 'snack-message',
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 2500
      });

      this.loading = false;
    });
  }

  public showAndHidePassword(): void {
    this.showpass = !this.showpass;
}
}
