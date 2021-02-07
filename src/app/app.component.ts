import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from './auth/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Planner for your exam learing path';

  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
    ) {}

  logout() {
    this.tokenStorage.signOut();
    this.router.navigateByUrl('/auth/login');
  }
}
