import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Select } from "@ngxs/store";
import { UserState } from "@modules/admin/modules/user/store/user.state";
import { Observable, Subscription } from "rxjs";
import { User } from "@modules/admin/modules/user/store/user";
import { UserFormComponent } from "@modules/admin/modules/user/components/user-form/user-form.component";
import { UserTableComponent } from "@modules/admin/modules/user/components/user-table/user-table.component";

export enum Mode {
  AddUser = 'Create',
  EditUser = 'Update',
  None = 'None'
}

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.scss']
})
export class UserOverviewComponent implements OnInit, OnDestroy {

  @ViewChild(UserFormComponent)
  form: UserFormComponent;

  @ViewChild(UserTableComponent)
  table: UserTableComponent;

  @Select(UserState.getUsers)
  users$: Observable<User[]>;
  users: User[];

  ModeType = Mode;

  mode = Mode.None;

  subscription: Subscription;

  ngOnInit(): void {
    this.subscription = this.users$.subscribe(res => {
      this.users = res;
      // this.table.setUsers(res);
    });
  }

  updateForm(user: User): void {
    this.mode = Mode.EditUser;
    this.form.setUser(user);
  }

  addUser(): void {
    this.mode = Mode.AddUser;
    this.form.setUser(null);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
