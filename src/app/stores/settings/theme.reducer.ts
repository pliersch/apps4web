import {createReducer, on} from '@ngrx/store';
import * as ThemeActions from './actions/theme.actions';

export interface State {
  theme: string;
}

const initialState: State = {
  theme: 'light-theme'
};

export const reducer = createReducer(
  initialState,
  on(ThemeActions.loadThemes, (state) => ({theme: 'fixme'})),
  on(ThemeActions.loadThemesSuccess, (state) => ({theme: 'fixme'})),
  on(ThemeActions.loadThemesFailure, (state) => ({theme: 'fixme'})),
  // on(ThemeActions.setTheme, (state) => ({theme: 'fixme'}))
  // on(ThemeActions.setTheme, (state, action) => ({ ...state, ...action })),
  on(ThemeActions.setTheme, (state) => ({theme: state.theme}))
);

// export const selectShowSidenav = (state: State) => state.showSidenav;
