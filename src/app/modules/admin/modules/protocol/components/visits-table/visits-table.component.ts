import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { Visit } from "@modules/admin/modules/protocol/store/visit";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
  selector: 'app-visits-history',
  templateUrl: './visits-table.component.html',
  styleUrls: ['./visits-table.component.scss']
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
