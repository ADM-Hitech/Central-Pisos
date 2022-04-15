import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SharedModule } from 'src/app/core/modules/shared.module';
import { AuthenticationRouting } from './authentication.routing';
import { AuthenticationService } from './authentication.service';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AuthenticationRouting
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent
  ],
  providers: [
    AuthenticationService
  ]
})
export class AuthenticationModule { }
