import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProtocolOverviewComponent } from "@modules/admin/modules/protocol/components/protocol-overview.component";

const routes: Routes = [
  {
    path: '', component: ProtocolOverviewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProtocolRoutingModule {}
