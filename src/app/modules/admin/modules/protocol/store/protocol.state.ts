import { Injectable } from "@angular/core";
import { AlertService } from "@app/common/services/alert.service";
import { VisitsService } from "@modules/admin/modules/protocol/service/visits.service";
import * as protocolActions from "@modules/admin/modules/protocol/store/protocol.actions";
import { Visit } from "@modules/admin/modules/protocol/store/visit";
import { TagStateModel } from "@modules/photos/store/tags/tag.state";
import { DeleteResult } from "@modules/share/interfaces/models/delete-result";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { asapScheduler, Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";

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
  loadVisits(ctx: StateContext<ProtocolStateModel>): Observable<Visit[]> {
    return this.visitsService.getAll()
      .pipe(
        tap((visits: Visit[]) =>
          asapScheduler.schedule(() =>
            ctx.dispatch(new protocolActions.LoadVisitsSuccess(visits))
          )
        ),
        catchError(error => {
          asapScheduler.schedule(() =>
            ctx.dispatch(new protocolActions.LoadVisitsFail(error))
          )
          return throwError(() => error);
        })
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
  deleteVisits(ctx: StateContext<TagStateModel>): Observable<DeleteResult> {
    return this.visitsService.deleteAll()
      .pipe(
        tap((result: DeleteResult) =>
          asapScheduler.schedule(() =>
            ctx.dispatch(new protocolActions.DeleteVisitsSuccess(result))
          )
        ),
        catchError(error => {
          asapScheduler.schedule(() =>
            ctx.dispatch(new protocolActions.DeleteVisitsFail(error))
          )
          return throwError(() => error);
        })
      );
  }

  @Action(protocolActions.DeleteVisitsSuccess)
  deleteVisitsSuccess({patchState}: StateContext<ProtocolStateModel>): void {
    patchState({visits: []});
  }

  @Action(protocolActions.DeleteVisitsFail)
  deleteVisitsFail(): void {
    this.alertService.error('Delete Visits fail');
  }

  //endregion

  // region add (by server sent)
  //////////////////////////////////////////////////////////
  //                   add
  //////////////////////////////////////////////////////////

  @Action(protocolActions.AddVisit)
  addVisits(ctx: StateContext<ProtocolStateModel>, action: protocolActions.AddVisit): void {
    const state = ctx.getState();
    ctx.patchState({
      visits: [...state.visits, action.visit]
    })
  }

  //endregion
}
