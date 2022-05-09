import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {SocialAuthService, SocialUser} from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.scss']
})
export class AccountMenuComponent {
  // account: Account;

  user: SocialUser;

  constructor(private router: Router,
              /*private accountService: AccountService,*/
              private authService: SocialAuthService) {
    // this.accountService.account.subscribe((account) => {
    //   this.account = account;
    //   this.loggedIn = account != null;
    // });
    this.authService.authState.subscribe((user) => {
      this.user = user;
    });
  }

  logout(): void {
    // this.accountService.logout();
    this.authService.signOut(true).then(r => {
      // TODO find a way to detect result ('r' is undefined)
      this.router.navigate(['']);
    });
  }
}
