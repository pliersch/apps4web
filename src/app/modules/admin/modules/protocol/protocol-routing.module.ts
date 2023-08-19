import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProtocolOverviewComponent } from "@modules/admin/modules/protocol/components/protocol-overview.component";
import { AdminProtocolResolver } from "@modules/admin/modules/protocol/resolver/admin-protocol.resolver";

const routes: Routes = [{
  path: '', component: ProtocolOverviewComponent, resolve: {date: AdminProtocolResolver}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtocolRoutingModule {}
