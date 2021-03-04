import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthHolderService } from './auth-holder.service';
import { authInterceptorProvider } from './auth-interceptor';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CanActivateGuardService implements CanActivate{

  constructor(
    private router: Router,
    private authHolder: AuthHolderService
    ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let auth = this.authHolder.isAuthenticated();

    if (auth) {
      return true;
    }

    this.router.navigate(['/login']);
    return true;
  }

}
