import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { User } from "@account/store/user.model";
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

  @Output()
  userEvent = new EventEmitter<Partial<User>>();

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
    });
  }

  onSubmit(): void {
    let user: Partial<User> = this.createUserByForm();

    if (this.user) {
      user = this.deleteUnchangedProperties(user, this.user);
      user.id = this.user.id;
    }
    this.userEvent.emit(user);
    this.onCancel()
    this.form.disable()
  }

  onCancel(): void {
    this.setUser(null)
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

  private deleteUnchangedProperties(after: Partial<User>, before: User): Partial<User> {
    console.log('UserFormComponent deleteUnchangedProperties: ',)
    if (after.givenName == before.givenName) {
      delete after.givenName;
    }
    if (after.lastName == before.lastName) {
      delete after.lastName;
    }
    if (after.email == before.email) {
      delete after.email;
    }
    if (after.status == before.status) {
      delete after.status;
    }
    if (after.role == before.role) {
      delete after.role;
    }
    return after;
  }

  private createUserByForm(): Partial<User> {
    const controls = this.form.controls;
    const roleString = controls.role.value!;
    const statusString = controls.status.value!;

    return {
      givenName: controls.givenName.value!,
      lastName: controls.lastName.value!,
      email: controls.email.value!,
      role: Role[roleString as keyof typeof Role],
      status: Status[statusString as keyof typeof Status],
    };
  }
}
