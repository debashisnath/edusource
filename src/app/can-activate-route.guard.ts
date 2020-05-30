import { Injectable } from '@angular/core';
import { CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { TokenStorage } from './core/token.storage';

@Injectable()
export class CanActivateRouteGuard implements CanActivate{

    constructor(private authservice:TokenStorage){}

    canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean{
        return this.authservice.isAuthenticated();
    }
}