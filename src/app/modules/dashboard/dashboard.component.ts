import { AccountState } from "@account/store/account.state";
import { User } from "@account/store/user.model";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, NgIf } from "@angular/common";
import { Component, OnInit } from '@angular/core';
import { BreakpointService } from "@app/common/services/breakpoint.service";
import { Select } from "@ngxs/store";
import { NgScrollbar } from "ngx-scrollbar";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { PlayerComponent } from "../radio/components/player/player.component";
import { PizzaComponent } from "../recipes/pizza/pizza.component";
import { WasteReminderComponent } from "../waste-calendar/waste-reminder.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [NgIf, WasteReminderComponent, PizzaComponent, PlayerComponent, NgScrollbar, AsyncPipe]
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
