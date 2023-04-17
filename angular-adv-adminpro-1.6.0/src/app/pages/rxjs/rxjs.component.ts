import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription, interval } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  intervalSubs: Subscription;

  constructor() {


    // this.retornarObserver()
    // .pipe(retry()) // se agrege el "retry" que se ejecuta cuando el observe manda "error()" y se puede especiciar el numero de retry(2)
    // .subscribe(
    //   valor => console.log('valor', valor),
    //   err => console.warn('err', err),
    //   () => console.info('Obs terminado')
    // );

    this. intervalSubs = this.retornaInterval().subscribe(console.log,)
  }

  // ngOnInit(): void {
  // }

  ngOnDestroy(): void {
      this.intervalSubs.unsubscribe();
  }



  retornaInterval(): Observable<string> {
    return interval(500)
    // el pipe recibe argumentos para ejecutar los opoeradores definidos!
      .pipe(
        filter(valor => !(valor % 2 === 0)), // filtra en base a una condicion
        map(valor => `Hola Mundo ${valor + 1}`), // recibe el valor y puede manipularse
        // take(10), // veces que se ejecuta, de preferencia que sea el ultimo argumento de pipe o dependiendo de la logica por el filter
      )
    ;
  }

  retornarObserver(): Observable<number> {
    let i = -1;

    return new Observable<number>(observer => {
      const interval = setInterval(() => {
        i++;
        observer.next(i); // emitira valores

        if (i === 4) {
          clearInterval(interval); // limpiar el interval
          observer.complete(); // finalizar el observe
        }

        if (i === 2) {
          i = 0;
          observer.error('finaliza en 2') // lanzar el error
        }

      }, 1000)
    });
  }
}
