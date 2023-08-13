import { Component } from '@angular/core';
import { DeleteVisits } from "@modules/admin/modules/protocol/store/protocol.actions";
import { ProtocolState } from "@modules/admin/modules/protocol/store/protocol.state";
import { Visit } from "@modules/admin/modules/protocol/store/visit";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";

@Component({
  selector: 'app-protocol-overview',
  templateUrl: './protocol-overview.component.html',
  styleUrls: ['./protocol-overview.component.scss']
})
export class ProtocolOverviewComponent {

  @Select(ProtocolState.getVisits)
  visits$: Observable<Visit[]>;

  constructor(private store: Store) { }

  deletePhotos(): void {
    this.store.dispatch(new DeleteVisits());
  }
}
