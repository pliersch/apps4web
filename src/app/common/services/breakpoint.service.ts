import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Injectable } from '@angular/core';
import { distinctUntilChanged, Observable, ReplaySubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {

  private bp: ReplaySubject<string> = new ReplaySubject<string>();

  public get breakpoint(): Observable<string> {
    return this.bp;
  }

  readonly breakpoint$ = this.breakpointObserver
    .observe([Breakpoints.XLarge, Breakpoints.Large, Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall])
    .pipe(
      distinctUntilChanged()
    );

  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpoint$.subscribe(() =>
      this.breakpointChanged()
    );
  }

  private breakpointChanged(): void {
    let bp: string = Breakpoints.XSmall;
    if (this.breakpointObserver.isMatched(Breakpoints.Small)) {
      bp = Breakpoints.Small;
    } else if (this.breakpointObserver.isMatched(Breakpoints.Medium)) {
      bp = Breakpoints.Medium;
    } else if (this.breakpointObserver.isMatched(Breakpoints.Large)) {
      bp = Breakpoints.Large;
    } else if (this.breakpointObserver.isMatched(Breakpoints.XLarge)) {
      bp = Breakpoints.XLarge;
    }
    this.bp.next(bp)
  }
}
