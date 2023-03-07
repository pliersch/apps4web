import { LoginWithId } from "@account/store/account.actions";
import { AccountState } from "@account/store/account.state";
import { User } from "@account/store/user.model";
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { RouterState } from "@app/core/stores/routes/router.state";
import { Select, Store } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: 'app-hidden-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  @Select(RouterState.getRouteBeforeSignin)
  routeBeforeSignin$: Observable<string>;
  routeBeforeSignin: string;

  @Select(AccountState.getUser)
  user$: Observable<User>;
  user: User;

  id: string;
  private subscription: Subscription;

  constructor(private store: Store,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.subscription = this.user$.subscribe(res => {
      this.user = res;
      if (this.routeBeforeSignin != ('' || undefined)) {
        void this.router.navigateByUrl(this.routeBeforeSignin);
      }
    });
    this.subscription.add(this.route.queryParams
      .subscribe(params => {
          this.id = params.id;
          if (params.id) {
            this.store.dispatch(new LoginWithId(params.id));
          }
        }
      ));
    this.subscription.add(
      this.routeBeforeSignin$.subscribe(url => this.routeBeforeSignin = url));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
