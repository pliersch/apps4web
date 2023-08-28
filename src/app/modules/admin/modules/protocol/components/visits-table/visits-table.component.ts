import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { Visit } from "@modules/admin/modules/protocol/store/visit";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DatePipe } from '@angular/common';
import { NgScrollbar } from 'ngx-scrollbar';

@Component({
    selector: 'app-visits-history',
    templateUrl: './visits-table.component.html',
    styleUrls: ['./visits-table.component.scss'],
    standalone: true,
    imports: [NgScrollbar, MatTableModule, DatePipe]
})
export class VisitsTableComponent implements OnInit {

  @Input()
  visits$: Observable<Visit[]>;

  displayedColumns: string[] = ['UserId', 'Date'];
  dataSource: MatTableDataSource<Visit> = new MatTableDataSource<Visit>();

  ngOnInit(): void {
    this.visits$.pipe(
      map(res => this.dataSource.data = res)
    ).subscribe()
  }


}
