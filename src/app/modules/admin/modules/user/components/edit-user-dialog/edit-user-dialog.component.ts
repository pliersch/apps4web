import { User } from "@account/store/user.model";
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from "@angular/material/dialog";
import { getValuesOfEnum } from "@app/common/util/enum-utils";
import { Role } from "@modules/admin/modules/user/store/role";
import { Status } from "@modules/admin/modules/user/store/status";
import { MatButtonModule } from "@angular/material/button";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { NgIf, NgFor } from "@angular/common";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";

export interface EditUserDialogData {
  user: User;
}

@Component({
    selector: 'app-edit-user-dialog',
    templateUrl: './edit-user-dialog.component.html',
    styleUrls: ['./edit-user-dialog.component.scss'],
    standalone: true,
    imports: [MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, NgIf, MatSelectModule, NgFor, MatOptionModule, MatButtonModule]
})
export class EditUserDialogComponent implements OnInit {

  user: User;
  userValues: any;
  changed = false;
  valid = false;
  roles = getValuesOfEnum(Role);
  statuses = getValuesOfEnum(Status);

  form = this.fb.group({
    givenName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    role: ['', Validators.required],
    status: ['', Validators.required],
  });

  constructor(private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: EditUserDialogData,
              public dialogRef: MatDialogRef<EditUserDialogComponent>) {
    this.user = data.user;
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe(res => {
      this.changed =
        JSON.stringify(this.form.value) != JSON.stringify(this.userValues);
    });
    this.form.statusChanges.subscribe(result => {
      this.valid = result === 'VALID';
    });
    this.fillForm(this.user);
  }

  onSubmit(): void {
    let user: Partial<User> = this.createUserFromForm();
    if (this.user) {
      user = this.deleteUnchangedProperties(user, this.user);
      user.id = this.user.id;
    }
    this.dialogRef.close(user);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private fillForm(user: User): void {
    this.form.setValue({
      givenName: user.givenName,
      lastName: user.surName,
      email: user.email,
      role: Role[user.role],
      status: Status[user.status]
    });
    this.userValues = this.form.value;
    this.changed = false;
  }

  private deleteUnchangedProperties(after: Partial<User>, before: User): Partial<User> {
    if (after.givenName == before.givenName) {
      delete after.givenName;
    }
    if (after.surName == before.surName) {
      delete after.surName;
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

  private createUserFromForm(): Partial<User> {
    const controls = this.form.controls;
    const roleString = controls.role.value!;
    const statusString = controls.status.value!;

    return {
      givenName: controls.givenName.value!,
      surName: controls.lastName.value!,
      email: controls.email.value!,
      role: Role[roleString as keyof typeof Role],
      status: Status[statusString as keyof typeof Status],
    };
  }
}
