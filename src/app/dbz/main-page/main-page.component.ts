import { Component } from '@angular/core';
import { Personaje } from '../interfaces/dbz.interfaces';

//Aquí importamos el servicio @Injectable();
import { DbzService } from '../services/dbz.services';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html'
})
export class MainPageComponent {

  

  nuevo:Personaje = {
    nombre: 'Maestro Roshi',
    poder: 1000
  }
  
/*  agregarNuevoPersonaje(personaje:Personaje){
   
   this.personajes.push(personaje);
 } */

 //Aquí consumimos el servicio @Injectable()
 constructor( private dbzService: DbzService ) {};

}
