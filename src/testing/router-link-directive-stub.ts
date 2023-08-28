import { Directive, Input, HostListener } from '@angular/core';

// export for convenience.
export { RouterLink} from '@angular/router';

@Directive({
    selector: '[routerLink]',
    standalone: true
})
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  @HostListener('click')
  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

/// Dummy module to satisfy Angular Language service. Never used.
import { NgModule } from '@angular/core';


