﻿import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';

import {AlertService} from "@app/services/alert.service";
import {AccountService} from "@modules/account/services/account.service";
import {mustMatch} from "@app/core/helpers/must-match.validator";

@Component({templateUrl: 'add-edit.component.html'})
export class AddEditComponent implements OnInit {
  form: FormGroup;
  id: string;
  isAddMode: boolean;
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
    this.id = this.route.snapshot.params.id;
    this.isAddMode = !this.id;

    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      password: ['', [Validators.minLength(6), this.isAddMode ? Validators.required : Validators.nullValidator]],
      confirmPassword: ['']
    }, {
      validator: mustMatch('password', 'confirmPassword')
    });

    if (!this.isAddMode) {
      this.accountService.getById(this.id)
        .pipe(first())
        .subscribe(x => this.form.patchValue(x));
    }
  }

  // convenience getter for easy access to form fields
  get f(): { [p: string]: AbstractControl } { return this.form.controls; }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createAccount();
    } else {
      this.updateAccount();
    }
  }

  private createAccount(): void {
    this.accountService.create(this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Account created successfully');
          this.router.navigate(['../'], {relativeTo: this.route});
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  private updateAccount(): void {
    this.accountService.update(this.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Update successful');
          this.router.navigate(['../../'], {relativeTo: this.route});
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }
}
