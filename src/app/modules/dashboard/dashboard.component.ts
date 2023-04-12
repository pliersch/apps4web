import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { BreakpointService } from "@app/common/services/breakpoint.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  protected readonly Breakpoints = Breakpoints;
  currentBreakpoint: Observable<string>;

  constructor(private breakpointObserver: BreakpointObserver,
              private breakpointService: BreakpointService) { }

  ngOnInit(): void {
    this.currentBreakpoint = this.breakpointService.breakpoint;
  }

}
