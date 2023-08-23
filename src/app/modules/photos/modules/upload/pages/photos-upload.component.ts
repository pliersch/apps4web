import { AccountState } from "@account/store/account.state";
import { Component } from '@angular/core';
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";

@Component({
  selector: 'app-photos-upload',
  templateUrl: './photos-upload.component.html',
  styleUrls: ['./photos-upload.component.scss']
})


export class PhotosUploadComponent {

  @Select(AccountState.isAdmin)
  isAdmin$: Observable<boolean>;

}
