import { Injectable } from '@angular/core';
import { environment } from "@environments/environment";
import { HttpClient } from "@angular/common/http";
import { User } from "@modules/user-managaer/store/user";
import { Observable } from "rxjs";
import { GoogleUser } from "@modules/google-signin/google-user.model";

const baseUrl = `${environment.apiUrl}/auth`;

@Injectable({
  providedIn: 'root'
})
export class SigninService {

  constructor(private http: HttpClient) {
  }

  signin(user: GoogleUser): Observable<User> {
    return this.http.post<User>(baseUrl + '/login', user);
  }
}