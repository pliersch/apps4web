import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from '@angular/core';
import { environment } from "@environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const stringObservable = this.http.get<any>(environment.apiUrl);
    stringObservable.subscribe(res => console.log(res.msg))
  }

}
