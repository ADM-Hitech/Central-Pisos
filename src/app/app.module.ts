import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './core/modules/shared.module';
import { AppMainModule } from './main/main.module';
import { ConfigService } from './core/services/config.service';
import { NavigationService } from './core/services/navigation.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    AppMainModule
  ],
  providers: [
    ConfigService,
    NavigationService,
    JwtHelperService,
    NavigationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
