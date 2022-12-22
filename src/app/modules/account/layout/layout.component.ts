import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: 'layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  constructor(private router: Router) {
    // redirect to home if already logged in
    // if (this.accountService.accountValue) {
    //     this.router.navigate(['/']);
    // }
  }
}
