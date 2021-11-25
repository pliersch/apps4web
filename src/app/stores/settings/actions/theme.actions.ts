import {createAction, props} from '@ngrx/store';

export const loadThemes = createAction(
  '[Theme] Load Themes'
);

export const loadThemesSuccess = createAction(
  '[Theme] Load Themes Success',
  props<{ data: string[] }>()
);

export const loadThemesFailure = createAction(
  '[Theme] Load Themes Failure',
  props<{ error: any }>()
);

export const setTheme = createAction(
  '[Theme] Set Theme',
  props<{ theme: string }>()
);
