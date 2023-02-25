import { LoginWithId } from "@account/store/account.actions";
import { AccountState } from "@account/store/account.state";
import { User } from "@account/store/user.model";
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";

@Component({
  selector: 'app-hidden-login',
  templateUrl: './hidden-login.component.html',
  styleUrls: ['./hidden-login.component.scss']
})
export class HiddenLoginComponent implements OnInit {

  @Select(AccountState.getUser)
  user$: Observable<User>;

  id: string;
  msg = 'No. Not logged in'

  constructor(private store: Store,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
          this.id = params.id;
          if (params.id) {
            this.store.dispatch(new LoginWithId(params.id));
          }
        }
      );
  }

}
