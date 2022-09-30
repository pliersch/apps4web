import { Action, NgxsAfterBootstrap, NgxsOnInit, Selector, State, StateContext } from '@ngxs/store';
import { Add } from './lazy.actions';
import { Injectable } from "@angular/core";

export interface LazyStateModel {
  count: number;
}

@State<LazyStateModel>({
  name: 'Lazy'
})
@Injectable()
export class LazyState implements NgxsOnInit, NgxsAfterBootstrap {

  @Selector()
  static count(state: LazyStateModel) {
    return state.count;
  }

  ngxsOnInit(ctx: StateContext<LazyStateModel>): void {
    console.log('LazyState ngxsOnInit: ', ctx.getState())
  }

  ngxsAfterBootstrap(ctx: StateContext<LazyStateModel>): void {
    console.log('LazyState ngxsAfterBootstrap: ', ctx.getState())
  }

  @Action(Add)
  add(sc: StateContext<LazyStateModel>) {
    const state = sc.getState();
    console.log('Add', state);
    sc.patchState({count: ++state.count})
  }
}
