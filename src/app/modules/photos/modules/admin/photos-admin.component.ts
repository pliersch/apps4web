import { AccountState } from "@account/store/account.state";
import { User } from "@account/store/user.model";
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PhotosAdminService } from "@modules/photos/modules/admin/service/photos-admin.service";
import { PhotoState } from "@modules/photos/store/photos/photo.state";
import { Select } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";

@Component({
    selector: 'app-photos-admin',
    templateUrl: './photos-admin.component.html',
    styleUrls: ['./photos-admin.component.scss'],
    standalone: true,
    imports: [MatCardModule, MatButtonModule, MatIconModule, AsyncPipe]
})
export class PhotosAdminComponent implements OnInit, OnDestroy {

  @Select(PhotoState.getAvailablePhotos)
  availablePhotos$: Observable<number>;

  @Select(AccountState.getUser)
  user$: Observable<User>;
  user: User;
  private subscription: Subscription;


  constructor(private service: PhotosAdminService) { }

  ngOnInit(): void {
    this.subscription = this.user$.subscribe(res => {
      this.user = res;
    })
  }

  // todo use store (action)
  onClickDeletePhotos(): void {
    this.service.deleteAllPhotos(this.user);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
