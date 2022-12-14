import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatSort, Sort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { User } from "@modules/admin/modules/user/store/user.model";
import { LiveAnnouncer } from "@angular/cdk/a11y";

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnChanges {

  @ViewChild(MatSort)
  sort: MatSort;

  @Input()
  users: User[]

  @Output()
  userSelectEvent = new EventEmitter<User>();

  displayedColumns: string[] = ['givenName', 'lastName', 'email', 'role', 'status', 'created', 'lastLogin'];
  dataSource: MatTableDataSource<User>;

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  onClickRow(user: User): void {
    this.userSelectEvent.emit(user);
  }

  announceSortChange(sortState: Sort): void {
    if (sortState.direction) {
      void this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      void this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource(changes.users.currentValue);
    this.dataSource.sort = this.sort;
  }

}
