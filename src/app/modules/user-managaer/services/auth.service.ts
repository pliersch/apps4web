import {environment} from "@environments/environment";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable, of} from 'rxjs';
import {User} from "@modules/user-managaer/store/user";

const baseUrl = `${environment.apiUrl}/users`;

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(user: { username: string; password: string }): Observable<any> {
    return of({token: 'foo-token'});
    // return this.http.post<User>(baseUrl + '/login', user);
  }

  logout(token: string): Observable<any> {
    return this.http.post<User>(baseUrl + '/logout', token);
  }
}
