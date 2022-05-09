import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {AlertService} from '@app/services';
import {AccountService} from "@modules/account/services/account.service";
import {mustMatch} from "@app/core/helpers/must-match.validator";

enum TokenStatus {
  Validating,
  Valid,
  Invalid
}

@Component({templateUrl: 'reset-password.component.html'})
export class ResetPasswordComponent implements OnInit {
  TokenStatus = TokenStatus;
  tokenStatus = TokenStatus.Validating;
  token = null;
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      {
        validator: mustMatch('password', 'confirmPassword')
      }
    );

    const token = this.route.snapshot.queryParams.token;

    // remove token from url to prevent http referer leakage
    this.router.navigate([], {relativeTo: this.route, replaceUrl: true});

    this.accountService
      .validateResetToken(token)
      .pipe(first())
      .subscribe({
        next: () => {
          this.token = token;
          this.tokenStatus = TokenStatus.Valid;
        },
        error: () => {
          this.tokenStatus = TokenStatus.Invalid;
        }
      });
  }

  // convenience getter for easy access to form fields
  get f(): { [p: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.accountService
      // @ts-ignore
      .resetPassword(this.token, this.f.password.value, this.f.confirmPassword.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Password reset successful, you can now login');
          this.router.navigate(['../login'], {relativeTo: this.route});
        },
        error: (error) => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }
}
