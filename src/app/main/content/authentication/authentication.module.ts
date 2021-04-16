import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SharedModule } from 'src/app/core/modules/shared.module';
import { AuthenticationRouting } from './authentication.routing';
import { AuthenticationService } from './authentication.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AuthenticationRouting
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    AuthenticationService
  ]
})
export class AuthenticationModule { }
