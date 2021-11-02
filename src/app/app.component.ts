import { Component } from '@angular/core';
import {Fuck} from "./fuck";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fooFuck';
  fuck = new Fuck('fickteuch', '2', 2, 3);
}
