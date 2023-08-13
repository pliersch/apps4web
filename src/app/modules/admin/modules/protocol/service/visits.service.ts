import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { environment } from "@environments/environment";
import { Visit } from "@modules/admin/modules/protocol/store/visit";
import { DeleteResult } from "@modules/share/interfaces/models/delete-result";
import { Observable } from "rxjs";

const baseUrl = `${environment.apiUrl}/visits`;

@Injectable({
  providedIn: 'root'
})
export class VisitsService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Visit[]> {
    return this.http.get<Visit[]>(baseUrl);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<DeleteResult> {
    return this.http.post<DeleteResult>(baseUrl + '/delete-all', null);
  }
}
