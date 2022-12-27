import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";

export interface RouteConfig {
  route: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class RouteService {

  getRoutes(): Observable<RouteConfig[]> {
    return of([
      {route: '/dashboard', name: 'Home'},
      {route: '/gallery', name: 'Galerie'},
      {route: '/chat', name: 'Chat'},
      {route: '/account', name: 'Account'},
      // {route: '/recipes', name: 'Rezepte'},
      {route: '/three', name: 'Three'},
      {route: '/admin', name: 'Admin'},
      // {route: '/samples/address', name: 'Adresse'},
      // {route: '/samples/selection', name: 'Selection'},
      // {route: '/doctor', name: 'Doc'},
      // {route: '/signin', name: 'SignIn'},
    ]);
  }

}
