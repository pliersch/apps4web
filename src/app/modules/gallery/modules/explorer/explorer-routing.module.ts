import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryEditorComponent } from "@gallery/modules/explorer/pages/editor/gallery-editor.component";
import { GalleryExplorerComponent } from "@gallery/modules/explorer/pages/explorer/gallery-explorer.component";

const routes: Routes = [
  {path: 'editor', title: 'Editor', component: GalleryEditorComponent},
  {path: 'finder', title: 'Finder', component: GalleryExplorerComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExplorerRoutingModule {}
