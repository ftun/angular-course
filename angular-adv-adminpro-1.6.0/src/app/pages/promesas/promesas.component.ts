import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    // const promesa = new Promise((resolve, reject) => {
    //   if (false) {
    //     resolve('Hola Mundo');
    //   } else {
    //     reject('algo salio mal');
    //   }
    // });

    // promesa
    // .then((msn) => console.log('termine promise', msn))
    // .catch(err => console.log('Erroro promise', err))

    // console.log('fin init');
    this.getUsuarios().then(users => {
      console.log('users', users)
    })
  }

  getUsuarios() {
    return new Promise(resolve => {
      fetch('https://reqres.in/api/users')
      .then(res => res.json()) // por el resultado de "res.json()" regresa otra promesa
      .then(res => {
        // console.log('data', res)
        return resolve(res);
      })
      .catch(err => {
        console.error(err)
      })
    });    
  }

}
