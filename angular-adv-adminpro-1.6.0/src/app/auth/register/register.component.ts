import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

// import swal from 'sweetalert';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

  public formSubmitted = false;

  public resgisterForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    checkPrivacy: [false, Validators.required],
  }, {
    validators: this.passwordsEquals('password', 'confirmPassword'),
  });

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { 
    
   }

  createUser() {
    this.formSubmitted = true;
    if (this.resgisterForm.invalid) return;
    this.userService.createUser(this.resgisterForm.value)
      .subscribe(
        res => {
          // console.log('Created!!', res);
          this.router.navigateByUrl('/');
        },
        err => {
          Swal.fire('Error', err.error.msn)
          // console.warn('Error!!', err);
        }
      )
    ;
  }

  inputNotValid(input: string): boolean {
    // console.log(this.resgisterForm.get(input))
    return this.resgisterForm.get(input).invalid && this.formSubmitted;
  }

  validCheckPrivacy() {
    return !this.resgisterForm.get('checkPrivacy').value && this.formSubmitted;
  }

  validPassword() {
    const password = this.resgisterForm.get('password').value;
    const passwordConfirm = this.resgisterForm.get('confirmPassword').value;

    return password !== passwordConfirm && this.formSubmitted;

  }

  passwordsEquals(password: string, confirmPassword: string) {

    return (formGroup: FormGroup) => {
      const passwordInput = formGroup.get(password);
      const passwordConfirmInput = formGroup.get(confirmPassword);

      if (passwordInput.value === passwordConfirmInput.value) {
        passwordConfirmInput.setErrors(null);
      } else {
        passwordConfirmInput.setErrors({ noEquals: true });

      }

    }
  }
}
