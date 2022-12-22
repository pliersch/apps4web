import { Injectable } from '@angular/core';
import { environment } from "@environments/environment";
import { HttpClient } from "@angular/common/http";
import { User } from "@account/store/user.model";
import { Observable } from "rxjs";
import { GoogleUser } from "@account/store/google-user.model";

const baseUrl = `${environment.apiUrl}/user`;

@Injectable()
export class AccountService {

  constructor(private http: HttpClient) {
  }

  signin(user: GoogleUser): Observable<User> {
    return this.http.post<User>(baseUrl + '/login', user);
  }
}
