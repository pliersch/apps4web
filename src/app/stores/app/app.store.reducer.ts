import { AppState } from '@app/stores/app/app.store.state';
import { AppActions, AppActionTypes } from '@app/stores/app/app.store.actions';

export function appStateReducer(state: AppState = { users: [] }, action: AppActions): AppState {
  switch (action.type) {
    case AppActionTypes.UsersLoaded: {
      return { ...state, users: action.payload };
    }
    default: {
      return state;
    }
  }
}
