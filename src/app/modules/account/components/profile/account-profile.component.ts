import { AccountState } from "@account/store/account.state";
import { User } from "@account/store/user.model";
import { Component } from '@angular/core';
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { MatCardModule } from "@angular/material/card";

@Component({
    selector: 'app-account-info',
    templateUrl: './account-profile.component.html',
    styleUrls: ['./account-profile.component.scss'],
    standalone: true,
    imports: [MatCardModule, AsyncPipe]
})
export class AccountProfileComponent {

  @Select(AccountState.getUser)
  user$: Observable<User>;

}
