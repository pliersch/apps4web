import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Tag, TagCategory, TagCategoryUpdate, TagUpdate } from '@gallery/store/tags/tag.model';

const tagUrl = `${environment.apiUrl}/tags`;
const categoryUrl = `${environment.apiUrl}/category`;

@Injectable({providedIn: 'any'})
export class TagService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<TagCategory[]> {
    return this.http.get<TagCategory[]>(tagUrl);
  }

  createTag(tag: Tag): Observable<Tag> {
    console.log('TagService createTag: ',)
    return this.http.post<Tag>(tagUrl, tag);
  }

  createCategory(category: TagCategory): Observable<TagCategory> {
    return this.http.post<TagCategory>(categoryUrl, category);
  }

  updateTag(id: string, update: TagUpdate): Observable<Tag> {
    return this.http.patch<Tag>(`${tagUrl}/${id}`, update);
  }

  updateCategory(id: string, update: TagCategoryUpdate): Observable<TagCategory> {
    return this.http.patch<TagCategory>(`${categoryUrl}/${id}`, update);
  }

  deleteTag(id: string): Observable<any> {
    return this.http.delete(`${tagUrl}/${id}`);
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${categoryUrl}/${id}`);
  }

}

