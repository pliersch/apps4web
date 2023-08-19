import { HttpErrorResponse } from '@angular/common/http';
import { Visit } from "@modules/admin/modules/protocol/store/visit";
import { DeleteResult } from "@modules/share/interfaces/models/delete-result";

export class LoadVisits {
  static readonly type = '[User] Load Visits';
}

export class LoadVisitsSuccess {
  static readonly type = '[User] Load Visits Success';

  constructor(public readonly payload: Visit[]) { }
}

export class LoadVisitsFail {
  static readonly type = '[User] Load Visits Fail';

  constructor(public error: HttpErrorResponse) { }
}

export class DeleteVisits {
  static readonly type = '[User] Delete Visits';
}

export class DeleteVisitsSuccess {
  static readonly type = '[User] Delete Visits Success';

  constructor(public readonly payLoad: DeleteResult) { }
}

export class DeleteVisitsFail {
  static readonly type = '[User] Delete Visits Fail';

  constructor(public error: HttpErrorResponse) { }
}

//////////////////////////////////////////////////////////
//                   server sent
//////////////////////////////////////////////////////////

export class AddVisit {
  static readonly type = '[User] Add Visit';

  constructor(public readonly visit: Visit) { }
}
