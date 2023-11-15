import { NgIf } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AlertService } from "@app/common/services/alert.service";
import { SetNextPhoto, SetPreviousPhoto } from "@modules/photos/store/photos/photo.actions";
import { Photo } from "@modules/photos/store/photos/photo.model";
import { PhotoState } from "@modules/photos/store/photos/photo.state";
import { getPhotoUrl } from "@modules/photos/store/photos/photo.tools";
import { Select, Store } from "@ngxs/store";
import { Observable, Subscription } from "rxjs";
import {
  PhotosHorizontalScrollerComponent as PhotosHorizontalScrollerComponent_1
} from '../share/components/horizontal-scroller/photos-horizontal-scroller.component';
import { SlideShowControlBarComponent } from './components/controlbar/slide-show-control-bar.component';

@Component({
  selector: 'app-photos-slideshow',
  templateUrl: './photos-slideshow.component.html',
  styleUrls: ['./photos-slideshow.component.scss'],
  standalone: true,
  imports: [NgIf, SlideShowControlBarComponent, PhotosHorizontalScrollerComponent_1]
})
export class PhotosSlideshowComponent implements OnInit, OnDestroy {

  @Select(PhotoState.getCurrentPhoto)
  currentPhoto$: Observable<Photo>;

  @Select(PhotoState.getCurrentIndex)
  currentIndex$: Observable<number>;

  imgUrl: string;

  private subscription: Subscription;

  constructor(private store: Store,
              private alertService: AlertService,
              private router: Router) { }

  ngOnInit(): void {
    this.subscription =
      this.currentPhoto$.subscribe(photo => {
        if (photo) {
          this.imgUrl = getPhotoUrl(photo.fileName);
        }
      });
    this.subscription.add(
      this.currentIndex$.subscribe(index => {
        void this.router.navigateByUrl('/photos/slideshow/' + index)
      })
    )
    this.alertService.tip('Benutze die Pfeiltasten ← → für Navigation');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.closeSnackBar();
  }

  nextSlide(): void {
    this.store.dispatch(new SetNextPhoto())
  }

  prevSlide(): void {
    this.store.dispatch(new SetPreviousPhoto())
  }

  closeSnackBar(): void {
    this.alertService.closeSnackBar();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.code == 'ArrowLeft') {
      this.prevSlide();
      this.closeSnackBar();
    } else if (event.code == 'ArrowRight') {
      this.nextSlide();
      this.closeSnackBar();
    }
  }

}
