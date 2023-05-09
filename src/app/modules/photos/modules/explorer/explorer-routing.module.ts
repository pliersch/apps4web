import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PhotosExplorerComponent } from "@modules/photos/modules/explorer/explorer/photos-explorer.component";
import { PhotosEditorComponent } from "@modules/photos/modules/explorer/pages/editor/photos-editor.component";

const routes: Routes = [
  {path: 'editor', title: 'Editor', component: PhotosEditorComponent},
  {path: 'finder', title: 'Finder', component: PhotosExplorerComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExplorerRoutingModule {}
