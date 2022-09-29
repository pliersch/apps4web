import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss']
})
export class SocialLoginComponent implements OnInit {

  user: SocialUser;
  loggedIn: boolean;

  constructor(private authService: SocialAuthService) {
  }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      console.log('SocialLoginComponent : ', user)
      this.user = user;
      this.loggedIn = user != null;
    });
  }

  signInWithGoogle(): void {
    void this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(r => console.log(r));
  }

  signOut(): void {
    void this.authService.signOut();
  }
}
