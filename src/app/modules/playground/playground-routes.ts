import { Route } from '@angular/router';
import { PlaygroundComponent } from "@modules/playground/playground.component";

const placeholder = () => import('@modules/playground/components/layout-wrapper/layout-wrapper.component').then((x) => x.LayoutWrapperComponent);

export default [
  {
    // path: '', component: FlexColumnComponent,
    path: '', component: PlaygroundComponent,
    children: [
      {path: '', title: 'Playground', loadComponent: placeholder},
      // {path: '**', redirectTo: 'user', pathMatch: 'prefix'},
      // {path: '', redirectTo: 'user', pathMatch: 'prefix'}
    ]
  }
] as Route[];

