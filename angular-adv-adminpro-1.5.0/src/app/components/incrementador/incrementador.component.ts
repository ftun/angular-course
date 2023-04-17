import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
// import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [
  ]
})
export class IncrementadorComponent implements OnInit {
  ngOnInit(): void {
    this.btnClass = `btn btn-${this.btnClass}`;
  }

  // Con este decorardor se especifica que esta propiedad puede recibirse desde un componente padre
  // se puede pasar como string para renombrar el props ejemplo: @Input('valor')
  // Como props ejemplo: <app-incrementador [progreso]="15" /> o <app-incrementador [valor]="15" />
  @Input('valor') progreso: number = 40;
  // @Input() progreso: number = 40;

  // si se pasa entre [] marac error, asi que se puede enviar desde el componente de la sig manera:
  // Como props ejemplo: <app-incrementador btnClass="btn btn-primary" />
  // lo recomenado es siempre enviar entre [] el valor por lo cual encerar en comilla simples: <app-incrementador btnClass="'btn btn-primary'" />
  @Input() btnClass: string = 'btn btn-primary';

  // Para disparar un evento: click, change, etc..
  // de igual manera se puede renombrar
  // // Como props ejemplo: <app-incrementador (valorSalida)="paramExt = $event" /> o <app-incrementador (valor)="paramExt = $event" />
  @Output('valor') valorSalida: EventEmitter<number> = new EventEmitter();

  cambiarValor(valor: number) {
    if(this.progreso >= 100 && valor >= 0) {
      this.valorSalida.emit(100);
      this.progreso = 100;
    }

    if(this.progreso <= 0 && valor < 0) {
      this.valorSalida.emit(0);
      this.progreso = 0;
    }

    this.progreso += valor;
    this.valorSalida.emit(this.progreso);
  }

  onChange(valor: number) {
    
    if (valor >= 100) {
      this.progreso = 100;
    } else if(valor <= 0) {
      this.progreso = 0;
    } else {
      this.progreso = valor;
    }
    this.valorSalida.emit(this.progreso);
  }

}
