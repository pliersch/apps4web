import { LoginWithId } from "@account/store/account.actions";
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngxs/store";

@Component({
  selector: 'app-hidden-login',
  templateUrl: './hidden-login.component.html',
  styleUrls: ['./hidden-login.component.scss']
})
export class HiddenLoginComponent implements OnInit {

  id: string;

  constructor(private store: Store,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
          console.log(params);
          this.id = params.id;
        }
      );
  }

  onClickLogin(): void {
    this.store.dispatch(new LoginWithId(this.id));
  }
}
