import { LoginWithEmail } from "@account/store/account.actions";
import { AccountState } from "@account/store/account.state";
import { User } from "@account/store/user.model";
import { NgIf } from "@angular/common";
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Router } from "@angular/router";
import { AlertService } from "@app/common/services/alert.service";
import { RouterState } from "@app/core/stores/routes/router.state";
import { Select, Store } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, NgIf, MatButtonModule]
})
export class LoginComponent implements OnInit, OnDestroy {

  @Select(RouterState.getRouteBeforeSignin)
  routeBeforeSignin$: Observable<string>;
  routeBeforeSignin = '';

  @Select(AccountState.getUser)
  user$: Observable<User>;
  user: User;

  valid = false;
  id: string;
  private subscription: Subscription;

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    password: ['', Validators.required],
  });

  constructor(private store: Store,
              private fb: FormBuilder,
              private alertService: AlertService,
              private router: Router) { }

  ngOnInit(): void {
    this.form.setValue({
      email: 'test@apps4web.de',
      password: ''
    });
    this.form.statusChanges.subscribe(result => {
      this.valid = result === 'VALID';
    });
    this.subscription = this.user$.subscribe(res => {
      if (!res) {
        return;
      }
      this.user = res;
      if (this.routeBeforeSignin != '') {
        void this.router.navigateByUrl(this.routeBeforeSignin);
      } else {
        void this.router.navigateByUrl('');
      }
      this.alertService.info('Hallo ' + this.user.givenName);
    });
    this.subscription.add(
      this.routeBeforeSignin$.subscribe(url => this.routeBeforeSignin = url));
  }

  onSubmit(): void {
    const controls = this.form.controls;
    this.store.dispatch(
      new LoginWithEmail(controls.email.value!, controls.password.value!));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
