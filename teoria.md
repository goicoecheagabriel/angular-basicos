### INSTALAR ANGULAR EN NUESTRO SISTEMA
#### WINDOWS
+ Verificar que tenemos instalado nodejs
+ Verificar que tenemos instalado npm
+ Luego correr en una consola el siguiente comando con npm
```
npm install -g @angular/cli
```

### MANEJO DE DATOS ENTRE DISTINAS JERARQUIAS POSICIONALES, ABUELOS, HIJOS, NIETOS
+ INPUT  
Imaginemos que  tenemos un componente padre llamado main-page.component.ts con un arreglo de personajes como vemos en el siguiente ejemplo:
```
export class MainPageComponent {

  personajes: Personaje [] = [
    {
      nombre: 'Goku',
      poder: 15000
    },
    {
      nombre: 'Vegeta',
      poder: 7500
    }
  ];
  ...
```
Luego utilizamos este arreglo `personajes` en un componente hijo. Entonces en el main-page-component.html enviamos el arreglo dentro de la etiqueta del componente hijo. En este caso la etiqueta de este componente se llama `app-personoajes`.
```
<div class="row">
    <div class="col">
        <app-personajes [personajes]="personajes">
        </app-personajes>
    
    </div>
...
```
Para poder utilizar este arreglo en el componente hijo. Debemos utilizar el decorador `@nput()` que se importa de `import { Component, Input } from '@angular/core';`. Ver ejemplo compeleto del componente hijo en personajes.component.ts
```
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html'
})
export class PersonajesComponent {

  @Input() personajes: any[] =[];

  }
```
De esta manera dentro del archivo `personajes.component.html` podemos utilizar el arreglo con los valores originarios del componente padre como se ve en el siguiente ejemplo.
```
<h3>Personajes</h3>
<hr>
<ul>
    <li *ngFor="let personaje of personajes;">
        {{personaje.nombre}} - {{personaje.poder}}
    </li>
</ul>
```
Entonces, en resumen, podemos enviar un atributo de un padre a un hijo en la declaracion html del componente y luego recibirlo en el hijo utilizando el decorador `@input` importado de `import { Component, Input } from '@angular/core';`
+ OUTPUT  
Un componente hijo puede utilizar la anotación `@Output()` para emitir un evento personalizado desde dicho componente.
Realizaremos un ejemplo que trata de lo siguiente: Tenemos un componente llamado `agregar.component.ts` el cual disparará un evento que enviará un nuevo personaje. Ese evento será recibido por su componente padre `main-page.component.ts` el cual al momento de que se emita el evento, el mismo enviará el objeto `Personaje` y podrá ser recibido por el componente padre.
De esta manera, cuando el evento sea disparado, tendremos un método que estará escuchando el evento y recibirá como argumento este `Personaje`, con el que podrá realizar en este método el agregado al arreglo de personajes, que no es ni más ni menos que una propiedad del componente padre.
#### Estructura del objeto personaje
```
nuevo:Personaje = {
    nombre: '',
    poder: 0
  }
```
#### Registro y salida del evento `onNuevoPersonaje`
```
@Output() onNuevoPersonaje: EventEmitter<Personaje> = new EventEmitter();
```
#### Línea utilizada para emitir el evento y enviar un personaje como argumento
```
this.onNuevoPersonaje.emit( this.nuevo );
```
#### En el siguiente código se muestra como el componente padre se pone a escuchar el evento
El que también se encarga de conectarlo al método que se disparará cuando el evento sea lanzado.
En el mismo método enviamos como argumento el `$event` que contendrá el objeto `Personaje`.  
Este código se pone en el selector del componente hijo `<app-agregar>` ubicado en el componente padre `main-page.compoonent.html`
```
<app-agregar 
    [nuevo]="nuevo"
    (onNuevoPersonaje)="agregarNuevoPersonaje($event)"
>
</app-agregar>
```
#### Luego creamos el método en el ts del componente padre `main-page.compoonent.ts`
```
agregarNuevoPersonaje(personaje:Personaje){
   this.personajes.push(personaje);
 }
```
De esta manera queda funcional.  
En resumen, el componente agregar.component al darle click en el boton de agregar arma un objeto con los campos del formulario y dispara un evento que envia el objeto creado. El componente padre se encuentra escuchando este evento y cuando lo escucha dispara el método que agrega al arreglo personajes el objeto recibido con el evento.  
A continuación mostramos los fragmentos de codigo mas relevantes.

#### Clase del componente hijo (agregar.component.ts)
```
import { Component, Input, Output,EventEmitter } from '@angular/core';
import { Personaje } from '../interfaces/dbz.interfaces';

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
  @Output() onNuevoPersonaje: EventEmitter<Personaje> = new EventEmitter();

  agregar(){
    if ( this.nuevo.nombre.trim().length === 0 ) {return;}

    console.log(this.nuevo);
    this.onNuevoPersonaje.emit( this.nuevo );

    this.nuevo = {
      nombre: '',
      poder: 0
    }

  }

}
```
#### HTML del componente padre (main-page.component.html)
```
<h1>Dragon Ball Z</h1>
<hr>

<div class="row">
    <div class="col">
        <app-personajes [personajes]="personajes"></app-personajes>
    
    </div>

    <div class="col">
        <app-agregar 
            [nuevo]="nuevo"
            (onNuevoPersonaje)="agregarNuevoPersonaje($event)"
        >
        </app-agregar>
    </div>
</div>
```
#### Clase del componente padre (main-page.component.ts)
```
import { Component } from '@angular/core';
import { Personaje } from '../interfaces/dbz.interfaces';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html'
})
export class MainPageComponent {

  personajes: Personaje [] = [
    {
      nombre: 'Goku',
      poder: 15000
    },
    {
      nombre: 'Vegeta',
      poder: 7500
    }
  ];

  nuevo:Personaje = {
    nombre: 'Maestro Roshi',
    poder: 1000
  }
  
 agregarNuevoPersonaje(personaje:Personaje){
   this.personajes.push(personaje);
 }

}
```
+ SERVICIOS  

Creamos una carpeta dentro de la zona de dbz (dragon ball Z)
```
// La carpeta se llamará
services
```
Dentro de esta carpeta agregaremos un archivo ts denominado `dbz.services.ts`. Este contendrá una clase exportable igual que las clases de los componentes, con la diferencia de que utilizaremos una notacion distinta a la utilizada en un componente. En este caso la notación será `@Injectable()` que será importada desde `import { Injectable } from "@angular/core";`.
Esto lo que hará esencialmente es crear una clase con el patrón ***singleton*** que garantiza que no importa quien instancie esta clase. Solo se creará una referencia en toda la aplicación, y todos los cambios que se generen en sus métodos y propiedades serán actualizados en todos los componentes que la referencien, sin importar quién genere este cambio.
### Código de una clase servicio con notacion `@Injectable()`
```
import { Injectable } from "@angular/core";

@Injectable()
export class DbzService {

    constructor(

    ){
        console.log('Servicio inicializado.');
    }

    imprimirNombre(nombre:string){
        console.log('Mi nombre es:', nombre);
    }

}
```
### Código de un componente que consume esta clase
```
import { Component } from '@angular/core';
import { Personaje } from '../interfaces/dbz.interfaces';

//Aquí importamos el servicio @Injectable();
import { DbzService } from '../services/dbz.services';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html'
})
export class MainPageComponent {

  personajes: Personaje [] = [
    {
      nombre: 'Goku',
      poder: 15000
    },
    {
      nombre: 'Vegeta',
      poder: 7500
    }
  ];

  nuevo:Personaje = {
    nombre: 'Maestro Roshi',
    poder: 1000
  }
  
 agregarNuevoPersonaje(personaje:Personaje){
   /* debugger; */
   this.personajes.push(personaje);
 }

 //Aquí consumimos el servicio @Injectable()
 constructor( private dbzService: DbzService ) {};

}

```

### Código de otro componente que consume el mismo servicio
```
import { Component, Input } from '@angular/core';
import { Personaje } from '../interfaces/dbz.interfaces';

//Aquí importamos el servicio @Injectable();
import { DbzService } from '../services/dbz.services';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html'
})
export class PersonajesComponent {

  @Input() personajes: Personaje[] =[];

  //Aquí consumimos el servicio @Injectable();
  constructor( private dbzService: DbzService ) {
    dbzService.imprimirNombre('Iñaki Goicoechea')
  };
  }
```

1. PROFUNDIZAR UN POCO MAS EN MODULOS
2. FORMSMODULE
3. NGMODEL
4. @INPUT
5. @OUTPUT
6. SERVICIOS
7. METODOS DE SERVICIOS
8. DEPURACIONES

#### GENERAR UN NUEVO MODULO CON NG CLI
+ desde la terminal debermos poner el siguiente comando.
```
ng generate module dbz
```
o
```
ng g m dbz
```

#### GENERAR UN COMPONENTE DENTRO DEL MODULO ANTERIOR
+ desde la terminal deberemos poner el siguiente comando.

```
ng generate component dbz/mainPage
```
o
```
ng g c dbz/mainPage
```

+ por otro lado si quisieramos evitar que nos genere el archivo de test (pruebas), podemos utilizar la siguiente bandera.
```
ng g c dbz/mainPage --skipTests
```

Si creamos el componente luego de crear el module, se actualizará el modulo de la carpeta antes que el de la app.
Angular es lo sufisientemente inteligente para detectar que ese componente corresponde a ese modulo y no al de la app.  
Lo que queda pendiente para que el componente pueda funcionar, es exportar el componente para que esté disponble para su uso fuera de este modulo.  
Por otro lado, debemos importar en el app.module el module DbzModule en la zona de imports. De esta manera ya estaria todo preparado para utilizar el componente en app.component.html con su nombre <app-main-page>.

#### FORMMODULE
Para evitar que se hagan recargas de la pagina cuando hacemos un submit del formulario. Podriamos utilizar el envio del evento con $event en la llamada de la funcion y recibirlo con event:any || event:Event.  
Pero para esta situacion, podemos importar el FormsModule en nuestro dbz.module.ts desde `import { FormsModule } from '@angular/forms';` y utilizar el `ngSubmit` de la siguiente manera.
```
<form (ngSubmit)="agregar()">
    <input placeholder="Nombre" type="text">
    <input placeholder="Poder" type="number">
    <button type="submit">
        Agregar
    </button>
</form>
```
Realizando esa llamada al evento `ngSubmit`, solo se encarga de prevenir el evento como lo haría `preventDefault()`.

#### ngModel
El ngModel, lo utilizamos para conectar un input con una propiedad especifica de datos definida en nuestra clase.   Ejemplo de objeto Personaje:
```
public nuevo:Personaje = {
    nombre: 'Trucks',
    poder: 14000
  }
```
Para conectar la propiedad `nombre` con el input nombre del formulario. Primero asegurarse que el input tenga definida la propiedad nombre y luego agregar como otra propiedad del input el `ngModel`, como puede verse en el siguiente ejemplo.
```
<input
    placeholder="Poder"
    type="number"
    name="poder"
    [(ngModel)]="nuevo.poder"
/>
```
Esto dejará binding el input con la propiedad. Quiere decir que cualquier cambio que haya en el input se verá reflejado en la propiedad de la clase,  y cualquier cambio que haya en la propiedad se verá reflejado en el input.