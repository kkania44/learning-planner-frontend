import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthHolderService {
  authenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private storageService: TokenStorageService) {
    if (storageService.getToken()) {
      this.authenticate();
    }
   }

  isAuthenticatedObs() {
    return this.authenticatedSubject.asObservable();
  }

  isAuthenticated() {
    return this.authenticatedSubject.value;
  }

  authenticate() {
    this.authenticatedSubject.next(true);
  }

  logout() {
    this.authenticatedSubject.next(false);
  }
}
