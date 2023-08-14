import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotosEditorComponent } from "@modules/photos/modules/explorer/pages/editor/photos-editor.component";
import { PhotosExplorerComponent } from "@modules/photos/modules/explorer/pages/explorer/photos-explorer.component";

const routes: Routes = [
  {path: 'editor', title: 'Photo Editor', component: PhotosEditorComponent},
  {path: 'finder', title: 'Photo Explorer', component: PhotosExplorerComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExplorerRoutingModule {}
