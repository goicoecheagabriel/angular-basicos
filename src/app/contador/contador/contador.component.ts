import { Component } from '@angular/core'

@Component({
    selector:'app-contador',
    template: `
        <div>
          <h1>{{title}}</h1>
          <h3>La base es: <strong> {{ this.base }} </strong>{{title}}</h3>
          <button (click)=" this.acumular(+this.base); "> + {{ this.base }} </button>
          <span> {{numero}} </span>
          <button (click)=" this.acumular(-base); "> - {{ this.base }} </button>
        </div>

    `
})
export class ContadorComponente {
public title:   string = 'Contador App';
  public numero:  number = 10;
  public base:    number = 10;



  public acumular( valor: number ):void {
    this.numero +=valor;
  }
}