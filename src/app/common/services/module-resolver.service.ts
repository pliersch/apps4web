import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModuleResolverService implements Resolve<any> {

  constructor() { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    console.log('ModuleResolverService resolve: ', route)
    console.log('ModuleResolverService resolve: ', state)
    return of(undefined);
  }
}
