import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './auth/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Planner for your exam learing path';
  isLoggedIn = false;

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
    ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.tokenStorage.getToken() ? true : false;
  }

  logout() {
    this.tokenStorage.signOut();
    this.router.navigateByUrl('/auth/login');
    this.isLoggedIn = false;
    window.location.reload();
  }
}
