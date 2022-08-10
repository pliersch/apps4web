import {Action, Selector, State, StateContext} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {tap} from "rxjs/operators";
import {AuthService} from "@modules/account/services/auth.service";
import {LoginAction, LogoutAction} from "@modules/account/store/auth.actions";
import {Observable} from "rxjs";

export interface AuthStateModel {
  token: string | null;
  username: string | null;
}

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    username: null
  }
})

@Injectable()
export class AuthState {

  @Selector()
  static token(state: AuthStateModel): string | null {
    return state.token;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.token;
  }

  constructor(private authService: AuthService) {
  }

  @Action(LoginAction)
  login(ctx: StateContext<AuthStateModel>, action: LoginAction): Observable<{ token: string }> {
    return this.authService.login(action.payload).pipe(
      tap((result: { token: string }) => {
        ctx.patchState({
          token: result.token,
          username: action.payload.username
        });
      })
    );
  }

  @Action(LogoutAction)
  logout(ctx: StateContext<AuthStateModel>): Observable<any> {
    const state = ctx.getState();
    return this.authService.logout(state.token!).pipe(
      tap(() => {
        ctx.setState({
          token: null,
          username: null
        });
      })
    );
  }
}
