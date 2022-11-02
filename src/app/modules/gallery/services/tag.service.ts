import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import {
  CreteTagCategoryDto,
  TagCategory,
  UpdateTagCategoryDto,
  UpdateTagGroupResultDto
} from '@gallery/store/tags/tag.model';

const tagUrl = `${environment.apiUrl}/tags`;

@Injectable({providedIn: 'any'})
export class TagService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<TagCategory[]> {
    return this.http.get<TagCategory[]>(tagUrl);
  }

  createCategory(category: CreteTagCategoryDto): Observable<TagCategory> {
    return this.http.post<TagCategory>(tagUrl, category);
  }

  updateCategory(update: UpdateTagCategoryDto): Observable<UpdateTagGroupResultDto> {
    console.log('TagService updateCategory: ', update)
    return this.http.patch<UpdateTagGroupResultDto>(`${tagUrl}/${update.id}`, update);
  }

  deleteCategory(id: string): Observable<any> {
    return this.http.delete(`${tagUrl}/${id}`);
  }

  // createTag(tag: Tag): Observable<Tag> {
  //   console.log('TagService createTag: ',)
  //   return this.http.post<Tag>(tagUrl, tag);
  // }
  //
  // updateTag(id: string, update: TagUpdate): Observable<Tag> {
  //   return this.http.patch<Tag>(`${tagUrl}/${id}`, update);
  // }
  //
  // deleteTag(id: string): Observable<any> {
  //   return this.http.delete(`${tagUrl}/${id}`);
  // }

}

