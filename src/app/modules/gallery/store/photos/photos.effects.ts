import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AlertService } from '@app/services/alert.service';
import { PhotoService } from './photo.service';
import * as photoActions from './photo.actions';
import { Photo } from '@gallery/store/photos/photo.model';


// function tagsToJson(photos: Photo[]): Photo[] {
//   console.log('xxx', photos);
//   for (const photo of photos) {
//
//   }
//   return photos;
// }

@Injectable()
export class PhotosEffects {

  loadPhotos$ = createEffect(
    () => this.actions$
      .pipe(
        ofType(photoActions.loadPhotos),
        mergeMap(action => this.photoService.getAll()
          .pipe(
            // tap((photos) => console.log('photos', photos)),
            map(photos => photoActions.loadPhotosSuccess({ photos })),
            catchError((err: HttpErrorResponse) => {
              // TODO extract strings to static file (i118n)
              this.alertService.error('Fotos konnten nicht geladen werden');
              return of(photoActions.loadPhotosFailure({ error: err }));
            })
          )
        )
      )
  );


  // savePhoto$ = createEffect(
  //   () => this.actions$
  //     .pipe(
  //       ofType(PhotoActions.courseUpdated),
  //       concatMap(action => this.photoService.saveCourse(
  //         action.update.id,
  //         action.update.changes
  //       ))
  //     ),
  //   { dispatch: false }
  // );

  constructor(private actions$: Actions,
              private photoService: PhotoService,
              private alertService: AlertService) {
  }
}
