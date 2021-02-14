import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isLoggedIn = false;
  loginFailed = false;
  errorMessage = '';
  signupSuccessMsg: string;

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router) { 
      this.signupSuccessMsg = this.getExtraNavMessage();
    }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    } else {
      this.form = new FormGroup({
        username: new FormControl('', [ Validators.required, Validators.minLength(3) ]),
        password: new FormControl('', [ Validators.required, Validators.minLength(3) ])
      });
    }
  }

  login() {
    this.authService.login(this.form.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data.username);
        this.isLoggedIn = true;
        this.loginFailed = false;
        this.router.navigateByUrl('/topics');
      }, 
      err => {
        this.errorMessage = 'Bad credentials'
        this.loginFailed = true;
      }
    )
  }

  hasErrors(controlName: string, errorName: string) {
    return this.form.controls[controlName].hasError(errorName);
  }

  reloadPage() {
    window.location.reload();
  }

  private getExtraNavMessage(): string {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation.extras.state;
    if (state) {
    return state.successMsg; 
    } else {
      return;
    }
  }

}
