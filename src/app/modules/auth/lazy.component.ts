import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AuthState } from "@modules/auth/store/auth-state";
import { LoginWithGoogleAction } from "@modules/auth/store/auth.actions";
import { SocialUser } from "@abacritt/angularx-social-login";


@Component({
  selector: 'app-lazy',
  template: `
    <p>
      User: {{ user$ | async }}<br>
      <button (click)="add()">login</button>
    </p>
  `
})
export class LazyComponent {

  @Select(AuthState.user)
  user$: Observable<SocialUser>;

  constructor(private store: Store) {}

  add() {
    this.store.dispatch(new LoginWithGoogleAction());
  }
}
