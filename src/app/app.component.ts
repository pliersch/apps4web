import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  ngOnInit(): void {
    const eventSource = new EventSource('http://localhost:3000/sse');
    eventSource.onmessage = ({data}): void => {
      // console.log('AppComponent SSE msg: ', data)
    }
  }

}
