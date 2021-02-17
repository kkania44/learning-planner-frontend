import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  isSuccessful = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenStorageService)
     { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.router.navigateByUrl('/topics');
    }
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)])
    })
  };

  register() {
    let navigationExtras: NavigationExtras;
    this.authService.register(this.form.value).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        navigationExtras = { state: { successMsg: 'Registration successful!' }};
        this.router.navigate(['/auth/login'], navigationExtras);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSuccessful = false;
      }
    );
  }

  hasErrors(controlName: string, errorName: string) {
    return this.form.controls[controlName].hasError(errorName);
  }

}
