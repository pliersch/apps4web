import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.scss']
})
export class DashboardCardComponent {

  @Input() title = 'Foo';
  @Input() imgUrl = 'http://localhost:3000/image-1635156183038.jfif';
}
