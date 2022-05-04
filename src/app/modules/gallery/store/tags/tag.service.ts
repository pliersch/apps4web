import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {environment} from '@environments/environment';
import {Tag, TagUpdate} from '@gallery/store/tags/tag.model';
import {Update} from '@ngrx/entity';

const baseUrl = `${environment.apiUrl}/tags`;

@Injectable({providedIn: 'root'})
export class TagService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Tag[]> {
    return this.http.get<Tag[]>(baseUrl);
  }

  create(tag: Tag): Observable<Tag> {
    return this.http.post<Tag>(baseUrl, tag);
  }

  update(id: string, update: TagUpdate): Observable<Tag> {
    return this.http.patch<Tag>(`${baseUrl}/${id}`, update);
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
