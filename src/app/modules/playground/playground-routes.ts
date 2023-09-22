import { Route } from '@angular/router';
import { PlaygroundComponent } from "@modules/playground/playground.component";

const placeholder = () => import('./components/placeholder/placeholder.component').then((x) => x.PlaceholderComponent);

export default [
  {
    // path: '', component: FlexColumnComponent,
    path: '', component: PlaygroundComponent,
    children: [
      {path: '', title: 'Admin Chat', loadComponent: placeholder},
      // {path: '**', redirectTo: 'user', pathMatch: 'prefix'},
      // {path: '', redirectTo: 'user', pathMatch: 'prefix'}
    ]
  }
] as Route[];

