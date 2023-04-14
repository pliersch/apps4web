import { CreateUserDto, User } from "@account/store/user.model";
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { UserDialogComponent } from "@modules/admin/modules/user/components/user-dialog/user-dialog.component";
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

  @ViewChild(UserDialogComponent)
  form: UserDialogComponent;

  @ViewChild(UserTableComponent)
  table: UserTableComponent;

  @Select(UserState.getUsers)
  users$: Observable<User[]>;
  users: User[];

  mode: Mode;

  subscription: Subscription;

  constructor(private store: Store,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.subscription = this.users$.subscribe(res => {
      this.users = res;
    });
  }

  handleDeleteEvent(user: User): void {
    this.store.dispatch(new userActions.DeleteUser(user.id))
  }

  handleEditEvent(user: User): void {
    this.openUserFormDialog(user);
    this.mode = Mode.EditUser;
  }

  addUser(): void {
    this.openUserFormDialog();
    this.mode = Mode.AddUser;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openUserFormDialog(user?: User): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      data: user,
      restoreFocus: false,
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe((user: Partial<User>) => {
      if (!user) {
        return;
      }
      if (this.mode === Mode.AddUser) {
        this.store.dispatch(new userActions.CreateUser(user as CreateUserDto))
      } else {
        const id = user.id!;
        delete user.id
        this.store.dispatch(new userActions.UpdateUser(id, user))
      }
    });
  }

}
