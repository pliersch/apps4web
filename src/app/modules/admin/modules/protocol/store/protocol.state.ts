import { Injectable } from "@angular/core";
import { AlertService } from "@app/common/services/alert.service";
import { VisitsService } from "@modules/admin/modules/protocol/service/visits.service";
import * as protocolActions from "@modules/admin/modules/protocol/store/protocol.actions";
import { Visit } from "@modules/admin/modules/protocol/store/visit";
import { TagStateModel } from "@modules/photos/store/tags/tag.state";
import { DeleteResult } from "@modules/share/interfaces/models/delete-result";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { asapScheduler, Observable, of, Subscription } from "rxjs";
import { catchError, map } from "rxjs/operators";

export interface ProtocolStateModel {
  visits: Array<Visit>;
}

@State<ProtocolStateModel>({
  name: 'Admin_Protocol',
  defaults: {
    visits: [],
  }
})

@Injectable()
export class ProtocolState {

  @Selector()
  static getVisits(state: ProtocolStateModel): Visit[] {
    return state.visits;
  }

  constructor(private visitsService: VisitsService,
              private alertService: AlertService) {
  }

  // region load
  //////////////////////////////////////////////////////////
  //          load
  //////////////////////////////////////////////////////////

  @Action(protocolActions.LoadVisits)
  loadVisits(ctx: StateContext<ProtocolStateModel>): Observable<Subscription> {
    return this.visitsService.getAll()
      .pipe(
        map((visits: Visit[]) =>
          asapScheduler.schedule(() =>
            ctx.dispatch(new protocolActions.LoadVisitsSuccess(visits))
          )
        ),
        catchError(error =>
          of(
            asapScheduler.schedule(() =>
              ctx.dispatch(new protocolActions.LoadVisitsFail(error))
            )
          )
        )
      );
  }

  @Action(protocolActions.LoadVisitsSuccess)
  loadVisitsSuccess({patchState}: StateContext<ProtocolStateModel>, action: protocolActions.LoadVisitsSuccess): void {
    patchState({visits: action.payload});
  }

  @Action(protocolActions.LoadVisitsFail)
  loadVisitsFail(): void {
    this.alertService.error('cant load users')
  }

  // endregion

  // region delete
  //////////////////////////////////////////////////////////
  //          delete
  //////////////////////////////////////////////////////////

  @Action(protocolActions.DeleteVisits)
  deleteGroup(ctx: StateContext<TagStateModel>): Observable<Subscription> {
    return this.visitsService.deleteAll()
      .pipe(
        map((result: DeleteResult) =>
          asapScheduler.schedule(() =>
            ctx.dispatch(new protocolActions.DeleteVisitsSuccess(result))
          )
        ),
        catchError(error =>
          of(
            asapScheduler.schedule(() =>
              ctx.dispatch(new protocolActions.DeleteVisitsFail(error))
            )
          )
        )
      );
  }

  @Action(protocolActions.DeleteVisitsSuccess)
  deleteGroupSuccess({patchState}: StateContext<ProtocolStateModel>): void {
    patchState({visits: []});
  }

  @Action(protocolActions.DeleteVisitsFail)
  deleteGroupFail(): void {
    this.alertService.error('Delete Visits fail');
  }

  //endregion
}
