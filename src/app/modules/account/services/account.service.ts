import { GoogleUser } from "@account/store/google-user.model";
import { User } from "@account/store/user.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from "@environments/environment";
import { Observable } from "rxjs";

const baseUrl = `${environment.apiUrl}/user`;

@Injectable()
export class AccountService {

  constructor(private http: HttpClient) {
  }

  signin(user: GoogleUser): Observable<User> {
    return this.http.post<User>(baseUrl + '/signin', user);
  }

  loginWithId(id: string): Observable<User> {
    return this.http.post<User>(baseUrl + '/login', {id: id});
  }
}
