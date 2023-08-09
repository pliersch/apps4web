import { EditProfileDialogData } from "@account/components/profile/account-profile.component";
import { User } from "@account/store/user.model";
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.scss']
})
export class EditProfileDialogComponent implements OnInit {

  private user: User;
  valid = false;
  changed = false;
  userValues: any;

  form = this.fb.group({
    givenName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
  });

  constructor(public dialogRef: MatDialogRef<EditProfileDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: EditProfileDialogData,
              private fb: FormBuilder) {

    data.user$.subscribe(user => this.user = user).unsubscribe();
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

  private fillForm(user: User): void {
    this.form.setValue({
      givenName: user.givenName,
      lastName: user.surName,
      email: user.email,
    });
    this.userValues = this.form.value;
    this.changed = false;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  saveChanges(): void {
    let user: Partial<User> = this.createUserFromForm();
    if (this.user) {
      user = this.deleteUnchangedProperties(user, this.user);
      user.id = this.user.id;
    }
    this.dialogRef.close(user);
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

    return {
      givenName: controls.givenName.value!,
      surName: controls.lastName.value!,
      email: controls.email.value!,
    };
  }
}
