import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AccountService} from "@modules/account/services/account.service";
import {mustMatch} from "@app/core/helpers/must-match.validator";
import {AlertService} from "@app/services/alert.service";

@Component({templateUrl: 'update.component.html'})
export class UpdateComponent implements OnInit {
  account = this.accountService.accountValue;
  form: UntypedFormGroup;
  loading = false;
  submitted = false;
  deleting = false;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [this.account.title, Validators.required],
      firstName: [this.account.firstName, Validators.required],
      lastName: [this.account.lastName, Validators.required],
      email: [this.account.email, [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]],
      confirmPassword: ['']
    }, {
      validator: mustMatch('password', 'confirmPassword')
    });
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
    this.accountService.update(this.account.id, this.form.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.success('Update successful');
          this.router.navigate(['../'], {relativeTo: this.route});
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
  }

  onDelete(): void {
    if (confirm('Are you sure?')) {
      this.deleting = true;
      this.accountService.delete(this.account.id)
        .pipe(first())
        .subscribe(() => {
          this.alertService.success('Account deleted successfully');
        });
    }
  }
}
