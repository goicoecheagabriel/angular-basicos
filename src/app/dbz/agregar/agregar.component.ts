import { Component, Input, Output,EventEmitter } from '@angular/core';
import { Personaje } from '../interfaces/dbz.interfaces';
import { DbzService } from '../services/dbz.services';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent{

  @Input() nuevo:Personaje = {
    nombre: '',
    poder: 0
  }

  constructor( private dbzService:DbzService ) {

  }
  /* @Output() onNuevoPersonaje: EventEmitter<Personaje> = new EventEmitter(); */

  agregar(){
    if ( this.nuevo.nombre.trim().length === 0 ) {return;}

    console.log(this.nuevo);
    /* this.onNuevoPersonaje.emit( this.nuevo ); */
    this.dbzService.agregarPersonaje(this.nuevo)

    this.nuevo = {
      nombre: '',
      poder: 0
    }

  }

}
