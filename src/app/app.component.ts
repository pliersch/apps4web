import {Component, OnInit} from '@angular/core';
import {Fuck} from "./fuck";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'fooFuck';
  fuck = new Fuck('fickt_euch', '2', 2, 3);

  ngOnInit(): void {
    console.log(this.fuck.title)
  }

}
