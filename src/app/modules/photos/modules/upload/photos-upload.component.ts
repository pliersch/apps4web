import { AccountState } from "@account/store/account.state";
import { AsyncPipe, NgIf } from "@angular/common";
import { Component } from '@angular/core';
import { Select } from "@ngxs/store";
import { Observable } from "rxjs";
import { UploadPanelComponent } from "./components/upload/upload-panel.component";

@Component({
  selector: 'app-photos-upload',
  templateUrl: './photos-upload.component.html',
  styleUrls: ['./photos-upload.component.scss'],
  standalone: true,
  imports: [NgIf, UploadPanelComponent, AsyncPipe]
})


export class PhotosUploadComponent {

  @Select(AccountState.isAdmin)
  isAdmin$: Observable<boolean>;

}
