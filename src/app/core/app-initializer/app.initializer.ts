import {SocialAuthService, SocialUser} from '@abacritt/angularx-social-login';
import {filter, take} from 'rxjs/operators';


export function initApplication(/*store: Store<AppState>,*/
                                /*authService: SocialAuthService,
                                userService: UserService*/): () => Promise<unknown> {
  return () => new Promise(resolve => {
    resolve(true);
    // authService.authState.subscribe((authUser) => {
    //     if (authUser) {
    //       userService.login(createUserByAuth(authUser)).subscribe((user) => {
    //         return !!user;
    //
    //       });
    //       // console.log(userService.getAll());
    //       // store.dispatch(new StartAppInitializer());
    //       // store.dispatch(new LoadUsers());
    //       // store.select((state: any) => state.appState.users).pipe(
    //       //   filter(users => users !== null && users !== undefined && users.length > 0),
    //       //   take(1)
    //       // ).subscribe((users) => {
    //       //   store.dispatch(new FinishAppInitializer());
    //       //   console.log('app init: login -> resolve "true"');
    //       //   resolve(true);
    //       // });
    //     }
    //     // reject();
    //     resolve(false);
    //     console.log('app init: no login -> resolve "false"');
    //   },
    //   error => {
    //     console.log('app init: error', error);
    //   },
    //   () => {
    //     console.log('app init: complete');
    //   });
  });
}

// function createUserByAuth(authUser: SocialUser): User {
//   return new User(
//     'authUser-authorizationCode',
//     'no title',
//     authUser.firstName,
//     authUser.lastName,
//     authUser.email,
//     'admin');
// }
