import { SetUser } from "@account/store/account.actions";
import { CreateUserDto, User } from "@account/store/user.model";
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UserFormComponent } from "@modules/admin/modules/user/components/user-form/user-form.component";
import { UserTableComponent } from "@modules/admin/modules/user/components/user-table/user-table.component";
import * as userActions from "@modules/admin/modules/user/store/user.actions";
import { UserState } from "@modules/admin/modules/user/store/user.state";
import { Select, Store } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";

export enum Mode {
  AddUser = 'Create',
  EditUser = 'Update',
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

  mode: Mode;

  subscription: Subscription;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.subscription = this.users$.subscribe(res => {
      this.users = res;
    });
  }

  handleEditEvent(user: User): void {
    this.mode = Mode.EditUser;
    this.form.setUser(user);
  }

  handleDeleteEvent(user: User): void {
    this.store.dispatch(new userActions.DeleteUser(user.id))
  }

  handleLoginAsEvent(user: User): void {
    this.store.dispatch(new SetUser(user));
  }

  addUser(): void {
    this.mode = Mode.AddUser;
    this.form.setUser(null);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  handleUserFormChanges($event: Partial<User>): void {
    if (this.mode === Mode.AddUser) {
      this.store.dispatch(new userActions.CreateUser($event as CreateUserDto))
    } else {
      const id = $event.id!;
      delete $event.id
      this.store.dispatch(new userActions.UpdateUser(id, $event))
    }
  }
}
