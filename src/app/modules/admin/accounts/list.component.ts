import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';

import {AccountService} from "@modules/account/services/account.service";
import {Account} from "@modules/account/models/account";

@Component({templateUrl: 'list.component.html'})
export class ListComponent implements OnInit {
  accounts: Account[];

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService
      .getAll()
      .pipe(first())
      .subscribe((accounts) => (this.accounts = accounts));
  }

  deleteAccount(id: string): void {
    const account = this.accounts.find((x) => x.id === id);
    // @ts-ignore
    account.isDeleting = true;
    this.accountService
      .delete(id)
      .pipe(first())
      .subscribe(() => {
        this.accounts = this.accounts.filter((x) => x.id !== id);
      });
  }
}
