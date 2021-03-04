import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthHolderService } from './auth/auth-holder.service';
import { TokenStorageService } from './auth/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'Planner for your exam learing path';
  isLoggedIn: boolean;

  constructor(
    private tokenStorage: TokenStorageService,
    private authHolder: AuthHolderService
    ) {}

  ngOnInit(): void {
    this.authHolder.isAuthenticatedObs().subscribe(flag => this.isLoggedIn = flag);
  }

  logout() {
    window.location.reload();
    this.tokenStorage.clear();
    this.authHolder.logout();
  }

  ngOnDestroy(): void {
    this.tokenStorage.clear();
  }
  
}
