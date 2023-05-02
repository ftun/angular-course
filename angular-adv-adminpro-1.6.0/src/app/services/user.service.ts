import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

declare const google: any;

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

  logout() {
    localStorage.removeItem('token');
    google.accounts.id.revoke('email', () => {
      this.router.navigateByUrl('/login');
    })
  }

  createUser(formData: RegisterForm) {
    console.log('service User', formData)
    return this.http.post(`${base_url}/users`, formData)
      .pipe(
        tap((res: any) => {
          console.log('createUser', res)
          localStorage.setItem('token', res.token)
        })
      )
      ;
  }

  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
    .pipe(
      tap((res: any) => {
        console.log('login', res)
        localStorage.setItem('token', res.token)
      })
    )
    ;
  }

  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, { token }).
    pipe(
      tap((res: any) => {
        console.log('loginGoogle', res)
        localStorage.setItem('token', res.token)
      })
    )
  }

  validatedToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'Authorization': `bearer ${token}`
      }
    }).
      pipe(
        tap((res: any) => {
          console.log('validatedToken', res)
          localStorage.setItem('token', res.token)
        }),
        map(
          res => true
        ),
        catchError( err => of(false)) // crear un observable
      )
  }
}
