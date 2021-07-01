import { Component, Input } from '@angular/core';
import { Personaje } from '../interfaces/dbz.interfaces';

//Aquí importamos el servicio @Injectable();
import { DbzService } from '../services/dbz.services';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html'
})
export class PersonajesComponent {

  /* @Input() personajes: Personaje[] =[]; */
  get personajes() {
    return this.dbzService.personajes;
  }

  //Aquí consumimos el servicio @Injectable();
  constructor( private dbzService: DbzService ) {
    dbzService.imprimirNombre('Iñaki Goicoechea')
  };
  
  }

