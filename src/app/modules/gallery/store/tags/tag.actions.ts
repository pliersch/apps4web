import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Tag } from './tag.model';
import { HttpErrorResponse } from '@angular/common/http';

// load/set all
export const loadTags = createAction(
  '[Tag/API] Fetch Tags'
);

export const loadTagsSuccess = createAction(
  '[Tag/API] Load Tags',
  props<{ tags: Tag[] }>()
);

export const loadTagsFailure = createAction(
  '[Tag/API] Fetch Tags Failure',
  props<{ error: HttpErrorResponse }>()
);


// add one
export const addTag = createAction(
  '[Tag/API] Push Tag',
  props<{ tag: Tag }>()
);

export const addTagSuccess = createAction(
  '[Tag/API] Add Tag Success',
  props<{ tag: Tag }>()
);

export const addTagFailure = createAction(
  '[Tag/API] Add Tag Failure',
  props<{ error: HttpErrorResponse }>()
);


// update
export const updateTag = createAction(
  '[Tag/API] Update Tag',
  props<{ tagUpdate: Update<Tag> }>()
);

export const updateTagSuccess = createAction(
  '[Tag/API] Update Tag Success',
  props<{ tagUpdate: Update<Tag> }>()
);

export const updateTagFailure = createAction(
  '[Tag/API] Add Tag Failure',
  props<{ error: HttpErrorResponse }>()
);


// delete one
export const deleteTag = createAction(
  '[Tag/API] Delete Tag',
  props<{ id: string }>()
);

export const deleteTagSuccess = createAction(
  '[Tag/API] Delete Tag Success',
  props<{ tag: Tag }>()
);

export const deleteTagFailure = createAction(
  '[Tag/API] Add Tag Failure',
  props<{ error: HttpErrorResponse }>()
);

// export const addTagsFailure = createAction(
//   '[Tag/API] Fetch Tags Failure',
//   props<{ error: any }>()
// );
//
// export const setTag = createAction(
//   '[Tag/API] Set Tag',
//   props<{ tag: Tag }>()
// );
//
// export const upsertTag = createAction(
//   '[Tag/API] Upsert Tag',
//   props<{ tag: Tag }>()
// );
//
// export const addTags = createAction(
//   '[Tag/API] Add Tags',
//   props<{ tags: Tag[] }>()
// );
//
// export const upsertTags = createAction(
//   '[Tag/API] Upsert Tags',
//   props<{ tags: Tag[] }>()
// );
//
// export const updateTags = createAction(
//   '[Tag/API] Update Tags',
//   props<{ tags: Update<Tag>[] }>()
// );
//

//
// export const deleteTags = createAction(
//   '[Tag/API] Delete Tags',
//   props<{ ids: string[] }>()
// );
//
// export const clearTags = createAction(
//   '[Tag/API] Clear Tags'
// );
