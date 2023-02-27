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

  private routes: RouteConfig[] = [
    // {route: '/dashboard', name: 'Dashboard'},
    {route: '/gallery', name: 'Galerie'},
    {route: '/chat', name: 'Chat'},
    // {route: '/account', name: 'Account'},
    // {route: '/recipes', name: 'Rezepte'},
    {route: '/three', name: 'Three'},
    // {route: '/admin', name: 'Admin'},
    // {route: '/samples/address', name: 'Adresse'},
    // {route: '/doctor', name: 'Doc'},
  ];

  getRoutes(): Observable<RouteConfig[]> {
    return of(this.routes);
  }

  // addRoute(conf: RouteConfig): void {
  //   this.routes.push(conf);
  // }

  enableAdminRoute(): void {
    if (this.findIndex('/admin') < 0) {
      this.routes.push({name: 'Admin', route: '/admin'});
    }
  }

  disableAdminRoute(): void {
    const res = this.findIndex('/admin');
    if (res > -1) {
      this.routes.splice(res)
    }
  }

  enableAccountRoute(): void {
    if (this.findIndex('/account') < 0) {
      this.routes.push({name: 'Account', route: '/account'});
    }
  }

  disableAccountRoute(): void {
    const res = this.findIndex('/account');
    if (res > -1) {
      this.routes.splice(res)
    }
  }

  private findIndex(route: string): number {
    return this.routes.findIndex(config => config.route == route);
  }

}
