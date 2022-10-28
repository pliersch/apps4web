import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { TagCategory, TagUpdate } from '@gallery/store/tags/tag.model';

const baseUrl = `${environment.apiUrl}/tags`;

@Injectable({providedIn: 'any'})
export class TagService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<TagCategory[]> {
    return this.http.get<TagCategory[]>(baseUrl);
  }

  create(tag: TagCategory): Observable<TagCategory> {
    return this.http.post<TagCategory>(baseUrl, tag);
  }

  update(id: string, update: TagUpdate): Observable<TagCategory> {
    return this.http.patch<TagCategory>(`${baseUrl}/${id}`, update);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

}

