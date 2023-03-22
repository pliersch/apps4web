import { AccountState } from "@account/store/account.state";
import { User } from "@account/store/user.model";
import { Component, OnDestroy, OnInit } from '@angular/core';
import { GalleryAdminService } from "@gallery/modules/admin/service/gallery-admin.service";
import { PhotoState } from "@gallery/store/photos/photo.state";
import { Select } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";

@Component({
  selector: 'app-gallery-admin',
  templateUrl: './gallery-admin.component.html',
  styleUrls: ['./gallery-admin.component.scss']
})
export class GalleryAdminComponent implements OnInit, OnDestroy {

  @Select(PhotoState.getAvailablePhotos)
  availablePhotos$: Observable<number>;

  @Select(AccountState.getUser)
  user$: Observable<User>;
  user: User;
  private subscription: Subscription;


  constructor(private service: GalleryAdminService) { }

  ngOnInit(): void {
    this.subscription = this.user$.subscribe(res => {
      this.user = res;
    })
  }

  onClickDeletePhotos(): void {
    this.service.deleteAllPhotos(this.user).subscribe(res => {
      console.log('GalleryAdminComponent delete all result: ', res);
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
