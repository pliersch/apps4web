import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { User } from "@modules/admin/modules/user/store/user";
import { getValuesOfEnum } from "@app/common/util/enum-utils";
import { Role } from "@modules/admin/modules/user/store/role";
import { Status } from "@modules/admin/modules/user/store/status";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnChanges {

  @Input()
  user: User | null;
  userValues: any;
  changed = false;
  valid = false;
  roles = getValuesOfEnum(Role);
  statuses = getValuesOfEnum(Status);

  form = this.fb.group({
    givenName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    role: ['', Validators.required],
    status: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form.disable();
    this.form.valueChanges.subscribe(res => {
      this.changed =
        JSON.stringify(this.form.value) != JSON.stringify(this.userValues);
    });
    this.form.statusChanges.subscribe(result => {
      this.valid = result == 'VALID';
      console.log(result)
    });
  }

  onSubmit(): void {
    alert('Thanks!');
  }

  onCancel(): void {
    this.form.reset();
  }

  public setUser(user: User | null): void {
    this.user = user;
    this.form.enable();
    if (user) {
      this.form.setValue({
        givenName: user.givenName,
        lastName: user.lastName,
        email: user.email,
        role: Role[user.role],
        status: Status[user.status]
      });
      this.userValues = this.form.value;
      this.changed = false;
    } else {
      this.form.reset();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.disabled.currentValue === true) {
      this.form.disable();
    } else if (changes.disabled.currentValue === false) {
      this.form.enable();
    }
  }
}
