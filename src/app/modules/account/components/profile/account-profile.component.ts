import { EditProfileDialogComponent } from "@account/components/edit-profile-dialog/edit-profile-dialog.component";
import { AccountState } from "@account/store/account.state";
import { User } from "@account/store/user.model";
import { Component } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";

export interface EditProfileDialogData {
  user$: Observable<User>;
}

@Component({
  selector: 'app-account-info',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.scss']
})
export class AccountProfileComponent {

  @Select(AccountState.getUser)
  user$: Observable<User>;

  // user: User;

  constructor(public dialog: MatDialog) { }

  openProfileDialog(): void {
    const dialogRef = this.dialog.open(EditProfileDialogComponent, {
      data: {user$: this.user$},
      restoreFocus: false,
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(res => {
      console.log('AccountProfileComponent : ', res)
    });
  }
}
