import { AccountState } from "@account/store/account.state";
import { User } from "@account/store/user.model";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { BreakpointService } from "@app/common/services/breakpoint.service";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @Select(AccountState.getUser)
  user$: Observable<User>;

  protected readonly Breakpoints = Breakpoints;
  currentBreakpoint: Observable<string>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private breakpointService: BreakpointService) { }

  ngOnInit(): void {
    this.currentBreakpoint = this.breakpointService.breakpoint;
  }

}
