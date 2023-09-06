import { CreateUserDto, User } from "@account/store/user.model";
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { Select, Store } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";
import { CreateUserDialogComponent } from "./components/create-user-dialog/create-user-dialog.component";
import { DeleteUserDialogComponent } from "./components/delete-user-dialog/delete-user-dialog.component";
import { EditUserDialogComponent } from "./components/edit-user-dialog/edit-user-dialog.component";
import { UserTableComponent } from "./components/user-table/user-table.component";
import * as userActions from "./store/user.actions";
import { UserState } from "./store/user.state";

@Component({
  selector: 'app-user-overview',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss'],
  standalone: true,
  imports: [UserTableComponent, MatButtonModule]
})
export class UserAdminComponent implements OnInit, OnDestroy {

  @ViewChild(EditUserDialogComponent)
  form: EditUserDialogComponent;

  @ViewChild(UserTableComponent)
  table: UserTableComponent;

  @Select(UserState.getUsers)
  users$: Observable<User[]>;
  users: User[];

  subscription: Subscription;

  constructor(private store: Store,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.subscription = this.users$.subscribe(res => {
      this.users = res;
    });
  }

  handleDeleteEvent(user: User): void {
    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      data: {user: user},
      restoreFocus: false,
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe((del: boolean) => {
      if (!del) {
        return;
      }
      this.store.dispatch(new userActions.DeleteUser(user.id));
    });
  }

  handleEditEvent(user: User): void {
    this.openUpdateUserDialog(user);
  }

  addUser(): void {
    this.openCreateUserDialog();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openCreateUserDialog(): void {
    const dialogRef =
      this.dialog.open(CreateUserDialogComponent);

    dialogRef.afterClosed().subscribe((user: User) => {
      if (!user) {
        return;
      }
      this.store.dispatch(new userActions.CreateUser(user as CreateUserDto))
    });
  }

  openUpdateUserDialog(user: User): void {
    const dialogRef =
      this.dialog.open(EditUserDialogComponent, {
        data: {user: user}
      });
    dialogRef.afterClosed().subscribe((user: Partial<User>) => {
      if (!user) {
        return;
      }
      const id = user.id!;
      delete user.id
      this.store.dispatch(new userActions.UpdateUser(id, user))
    });
  }

}
