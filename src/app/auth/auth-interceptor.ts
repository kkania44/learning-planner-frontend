import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { TokenStorageService } from "./token-storage.service";
const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private tokenService: TokenStorageService,
        private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.tokenService.getToken();
        let authRequest = req;

        if (token != null) {
        authRequest = req.clone({ setHeaders: { Authorization: 'Bearer ' + token } });
        }
        return next.handle(authRequest).pipe(
            catchError(
                (err) => {
                    if (err.status === 401) {
                        this.tokenService.deleteToken();
                        this.router.navigateByUrl('/auth/login'); 
                    }
                    throw err;
                }
            )
        );
    }
}

export const authInterceptorProvider = [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
