import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { CreateUserDto, User } from "@modules/admin/modules/user/store/user.model";

const baseUrl = `${environment.apiUrl}/user`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>(baseUrl);
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`${baseUrl}/${id}`);
  }

  create(dto: CreateUserDto): Observable<User> {
    return this.http.post<User>(baseUrl, dto);
  }

  update(id: string, dto: Partial<User>): Observable<User> {
    return this.http.patch<User>(`${baseUrl}/${id}`, dto);
  }

  login(user: User): Observable<any> {
    return this.http.post<User>(baseUrl + '/login', user);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`).pipe(
      finalize(() => {
        // auto logout if the logged in account was deleted
        // if (id === this.accountValue.id) {
        //   // this.logout();
        // }
      })
    );
  }
}
