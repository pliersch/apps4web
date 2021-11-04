import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {DashboardItem} from "./DashboardItem";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  defaultCards = [
    new DashboardItem("Card 1", "", 1, 1),
    new DashboardItem("Card 1", "", 1, 1),
    new DashboardItem("Card 1", "", 1, 1),
    new DashboardItem("Card 1", "", 1, 1)
  ];

  cards: Observable<DashboardItem[]> = of(this.defaultCards);

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit(): void {
    this.observeXSmall();
    this.observeSmall();
    this.observeMedium();
    this.observeLarge();
    this.observeXLarge();
  }

  private observeXSmall(): void {
    this.cards = this.breakpointObserver.observe(Breakpoints.XSmall).pipe(
      map(({matches}) => {
        if (matches) {
          return [
            new DashboardItem("Card 1", '"', 1, 1),
            new DashboardItem("Card 1", '"', 1, 1),
            new DashboardItem("Card 1", '"', 1, 1),
            new DashboardItem("Card 1", '"', 1, 1)
          ];
        } else {
          return this.defaultCards;
        }
      })
    );
  }

  private observeSmall(): void {
    this.cards = this.breakpointObserver.observe(Breakpoints.Small).pipe(
      map(({matches}) => {
        if (matches) {
          return [
            new DashboardItem("Card 1", '"', 1, 1),
            new DashboardItem("Card 1", '"', 1, 1),
            new DashboardItem("Card 1", '"', 1, 1),
            new DashboardItem("Card 1", '"', 1, 1)
          ];
        } else {
          return this.defaultCards;
        }
      })
    );
  }

  private observeMedium(): void {
    this.cards = this.breakpointObserver.observe(Breakpoints.Medium).pipe(
      map(({matches}) => {
        if (matches) {
          return [
            new DashboardItem("Card 1", '"', 1, 1),
            new DashboardItem("Card 1", '"', 1, 1),
            new DashboardItem("Card 1", '"', 1, 1),
            new DashboardItem("Card 1", '"', 1, 1)
          ];
        } else {
          return this.defaultCards;
        }
      })
    );
  }

  private observeLarge(): void {
    this.cards = this.breakpointObserver.observe(Breakpoints.Large).pipe(
      map(({matches}) => {
        if (matches) {
          return [
            new DashboardItem("Card 1", '"', 2, 1),
            new DashboardItem("Card 1", '"', 1, 1),
            new DashboardItem("Card 1", '"', 1, 1),
            new DashboardItem("Card 1", '"', 1, 1)
          ];
        } else {
          return this.defaultCards;
        }
      })
    );
  }

  private observeXLarge(): void {
    this.cards = this.breakpointObserver.observe(Breakpoints.XLarge).pipe(
      map(({matches}) => {
        if (matches) {
          return [
            new DashboardItem("Card 1", '"', 2, 1),
            new DashboardItem("Card 2", '"', 1, 1),
            new DashboardItem("Card 3", '"', 1, 2),
            new DashboardItem("Card 4", '"', 1, 1)
          ];
        } else return this.defaultCards;
      })
    );
  }
}
