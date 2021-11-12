import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TagService } from '@gallery/store/tags/tag.service';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import * as tagActions from './tag.actions';
import { AlertService } from '@app/services/alert.service';
import { Tag } from '@gallery/store/tags/tag.model';
import { Update } from '@ngrx/entity';


@Injectable()
export class TagEffects {

  constructor(private actions: Actions,
              private tagService: TagService,
              private alertService: AlertService) {
  }

  loadTags = createEffect(
    () => this.actions
      .pipe(
        ofType(tagActions.loadTags),
        mergeMap(() => this.tagService.getAll()
          .pipe(
            map(tags => tagActions.loadTagsSuccess({ tags })),
            catchError((err: HttpErrorResponse) => {
              // TODO extract strings to static file (i118n)
              this.alertService.error('Tags konnten nicht geladen werden');
              return of(tagActions.loadTagsFailure({ error: err }));
            })
          )
        )
      )
  );

  addTag = createEffect(
    () => this.actions
      .pipe(
        ofType(tagActions.addTag),
        mergeMap(action => this.tagService.create(action.tag)
          .pipe(
            map((tag: Tag) => {
              return tagActions.addTagSuccess({ tag });
            }),
            catchError((err: HttpErrorResponse) => {
              // TODO extract strings to static file (i118n)
              this.alertService.error('Tag konnte nicht gespeichert werden');
              return of(tagActions.addTagFailure({ error: err }));
            })
          )
        )
      )
  );

  // @ts-ignore
  private update:Update<Tag>;

  updateTag = createEffect(
    () => this.actions
      .pipe(
        ofType(tagActions.updateTag),
        tap(action => {
          this.update = action.tagUpdate
        }),
        mergeMap(action => this.tagService.update(action.tagUpdate)
          .pipe(
            map((tag: Update<Tag>) => { // TODO kann man besser dieses tag nutzen?
              return tagActions.updateTagSuccess({ tagUpdate: this.update });
            }),
            catchError((err: HttpErrorResponse) => {
              // TODO extract strings to static file (i118n)
              this.alertService.error('Tag konnte nicht geändert werden');
              return of(tagActions.updateTagFailure({ error: err }));
            })
          )
        )
      )
  );

  deleteTag = createEffect(
    () => this.actions
      .pipe(
        ofType(tagActions.deleteTag),
        mergeMap(action => this.tagService.delete(action.id)
          .pipe(
            map((tag: Tag) => {
              return tagActions.deleteTagSuccess({ tag });
            }),
            catchError((err: HttpErrorResponse) => {
              // TODO extract strings to static file (i118n)
              this.alertService.error('Tag konnte nicht geändert werden');
              return of(tagActions.deleteTagFailure({ error: err }));
            })
          )
        )
      )
  );
}
