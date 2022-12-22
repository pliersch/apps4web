import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { HttpClient } from '@angular/common/http';

const baseUrl = `${environment.apiUrl}/user`;

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) {
  }

  // update(id: string, dto: Partial<User>): Observable<User> {
  //   return this.http.patch<User>(`${baseUrl}/${id}`, dto);
  // }

  // delete(id: string): Observable<any> {
  //   return this.http.delete(`${baseUrl}/${id}`);
  //   // .pipe(
  //   // finalize(() => {
  //   // auto logout if the logged in account was deleted
  //   // if (id === this.accountValue.id) {
  //   //   // this.logout();
  //   // }
  //   // })
  //   // );
  // }
}
