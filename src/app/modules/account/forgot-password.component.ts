import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first, finalize} from 'rxjs/operators';

import {AlertService} from "@app/services/alert.service";
import {AccountService} from "@modules/account/services/account.service";

@Component({templateUrl: 'forgot-password.component.html'})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  // convenience getter for easy access to form fields
  get f(): { [p: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.accountService
      .forgotPassword(this.f.email.value)
      .pipe(first())
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => this.alertService.success('Please check your email for password reset instructions'),
        error: (error) => this.alertService.error(error)
      });
  }
}
