import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainPageComponent } from './main-page/main-page.component';
import { PersonajesComponent } from './personajes/personajes.component';
import { AgregarComponent } from './agregar/agregar.component';
import { DbzService } from './services/dbz.services';


@NgModule({
  declarations: [
    MainPageComponent,
    PersonajesComponent,
    AgregarComponent
  ],
  imports: [
    FormsModule,
    CommonModule
  ],
  exports: [
    MainPageComponent
  ],
  providers: [
    DbzService
  ]
})
export class DbzModule { }
