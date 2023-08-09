import { User } from "@account/store/user.model";
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { getValuesOfEnum } from "@app/common/util/enum-utils";
import { Role } from "@modules/admin/modules/user/store/role";
import { Status } from "@modules/admin/modules/user/store/status";


@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.scss']
})
export class CreateUserDialogComponent implements OnInit {

  form = this.fb.group({
    givenName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    role: ['', Validators.required],
    status: ['', Validators.required],
  });

  valid = false;
  roles = getValuesOfEnum(Role);
  statuses = getValuesOfEnum(Status);


  constructor(private fb: FormBuilder,
              public dialogRef: MatDialogRef<CreateUserDialogComponent>
  ) { }

  ngOnInit(): void {
    this.form.statusChanges.subscribe(result => {
      this.valid = result === 'VALID';
    });
  }

  onSubmit(): void {
    this.dialogRef.close(this.createUserFromForm());
  }

  onCancel(): void {
    this.dialogRef.close();
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
