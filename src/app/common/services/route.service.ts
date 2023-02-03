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

  private routes = [
    // {route: '/dashboard', name: 'Dashboard'},
    {route: '/gallery', name: 'Galerie'},
    {route: '/chat', name: 'Chat'},
    {route: '/account', name: 'Account'},
    // {route: '/recipes', name: 'Rezepte'},
    {route: '/three', name: 'Three'},
    // {route: '/admin', name: 'Admin'},
    // {route: '/samples/address', name: 'Adresse'},
    // {route: '/doctor', name: 'Doc'},
  ];

  getRoutes(): Observable<RouteConfig[]> {
    return of(this.routes);
  }

  addRoute(conf: RouteConfig): void {
    this.routes.push(conf);
  }

}
