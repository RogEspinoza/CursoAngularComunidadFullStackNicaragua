import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { UsuarioComponent } from './usuario/usuario.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { MaterialModule } from 'src/modules/material/material.module';
import { PasajeroComponent } from './pasajero/pasajero.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BuzonPasajerosComponent } from './buzon-pasajeros/buzon-pasajeros.component';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import localeNI from "@angular/common/locales/es-NI";
import localeNiExtra from "@angular/common/locales/es";
registerLocaleData(localeNI, "es-NI", localeNiExtra);



@NgModule({
  declarations: [
    UsuarioComponent,
    HeaderComponent,
    FooterComponent,
    NoPageFoundComponent,
    PasajeroComponent,
    DashboardComponent,
    BuzonPasajerosComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    NoPageFoundComponent,
    BuzonPasajerosComponent
  ],
  providers:[    
    { provide: LOCALE_ID, useValue: "es-NI" },
    { provide: MAT_DATE_LOCALE, useValue: "es-NI" },
  ]
})
export class SharedModule { }
