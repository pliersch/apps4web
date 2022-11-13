import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { LiveAnnouncer } from "@angular/cdk/a11y";
import { MatSort, Sort } from "@angular/material/sort";
import { Select } from "@ngxs/store";
import { UserState } from "@modules/admin/modules/user/store/user.state";
import { Observable, Subscription } from "rxjs";
import { User } from "@modules/admin/modules/user/store/user";
import { Role } from "@modules/admin/modules/user/store/role";

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss']
})
export class UserOverviewComponent implements OnInit, AfterViewInit, OnDestroy {

  @Select(UserState.getUser)
  user$: Observable<User>;
  user: User;

  @Select(UserState.getUsers)
  users$: Observable<User[]>;
  users: User[];

  subscription: Subscription;
  displayedColumns: string[] = ['givenName', 'lastName', 'email', 'role', 'photoUrl', 'status', 'lastLogin'];
  dataSource: MatTableDataSource<User>;

  constructor(private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.subscription = this.user$.subscribe(res => this.user = res);
    this.subscription.add(this.users$.subscribe(res => {
      this.users = res;
      console.log('UserOverviewComponent : ', Role[Role.Admin])
      console.log('UserOverviewComponent : ', Role[0])
      this.dataSource = new MatTableDataSource(res);
    }))
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort): void {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      void this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      void this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getRole(element: any) {
    console.log('UserOverviewComponent getRole: ', element)
    return 'foo';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
