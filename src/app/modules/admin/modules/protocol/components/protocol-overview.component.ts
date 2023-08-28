import { Component } from '@angular/core';
import { DeleteVisits } from "@modules/admin/modules/protocol/store/protocol.actions";
import { ProtocolState } from "@modules/admin/modules/protocol/store/protocol.state";
import { Visit } from "@modules/admin/modules/protocol/store/visit";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { VisitsTableComponent } from './visits-table/visits-table.component';

@Component({
    selector: 'app-protocol-overview',
    templateUrl: './protocol-overview.component.html',
    styleUrls: ['./protocol-overview.component.scss'],
    standalone: true,
    imports: [VisitsTableComponent, MatButtonModule, MatIconModule]
})
export class ProtocolOverviewComponent {

  @Select(ProtocolState.getVisits)
  visits$: Observable<Visit[]>;

  constructor(private store: Store) { }

  deletePhotos(): void {
    this.store.dispatch(new DeleteVisits());
  }
}
