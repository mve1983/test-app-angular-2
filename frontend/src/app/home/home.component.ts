import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UserService } from '../services/user.services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  protected userService: UserService = inject(UserService);
  isLoginMode = true;

  protected loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.min(6)]),
  });

  protected registerForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, [Validators.required, Validators.min(6)]),
  });

  protected changeLoginRegister(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  protected onSubmit() {

    if (this.isLoginMode) {
      const user = {
         email: this.registerForm.get('email')?.value as string,
        password: this.registerForm.get('password')?.value as string,
      };
  
      this.userService
        .loginUser(user)
        .pipe(first())
        .subscribe((user) => console.log(user));

    } else {
      const user = {
        name: this.registerForm.get('username')?.value as string,
        email: this.registerForm.get('email')?.value as string,
        password: this.registerForm.get('password')?.value as string,
      };
  
      this.userService
        .registerUser(user)
        .pipe(first())
        .subscribe((user) => console.log(user));
    }

    this.registerForm.reset()
    this.loginForm.reset()
    }


}
