import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { Add } from './lazy.actions';
import { LazyState } from './lazy.state';

@Component({
  selector: 'app-lazy',
  template: `
    <p>
      Lazy count: {{ count$ | async }}<br>
      <button (click)="add()">add one</button>
    </p>
    <p><a routerLink="/">Back ...</a></p>
  `
})
export class LazyComponent implements OnInit {
  @Select(LazyState.count) count$: Observable<number>;

  constructor(private store: Store) {}

  ngOnInit(): void {
  }

  add() {
    this.store.dispatch(new Add());
  }
}
