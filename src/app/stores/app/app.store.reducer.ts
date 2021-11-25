import {AppState} from '@app/stores/app/app.store.state';
import {AppActions, AppActionTypes} from '@app/stores/app/app.store.actions';
import {ActionReducer, MetaReducer} from '@ngrx/store';
import {environment} from '@environments/environment';
import {User} from "@app/models/user";

export function appStateReducer(state: AppState = {users: []}, action: AppActions): AppState {
  switch (action.type) {
    case AppActionTypes.UsersLoaded: {
      return {...state, users: action.payload};
    }
    default: {
      return state;
    }
  }
}

// export interface AppState {
//   users: Array<User>;
//   // theme: State;
// }
//
// // export const reducers: ActionReducerMap<AppState> = {
// //   router: routerReducer
// // };
//
// export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
//   return (state, action) => {
//     console.log('state before: ', state);
//     console.log('action', action);
//
//     return reducer(state, action);
//   };
// }
//
// export const metaReducers: MetaReducer<AppState>[] =
//   !environment.production ? [logger] : [];
