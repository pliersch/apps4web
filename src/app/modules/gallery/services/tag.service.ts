import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import {
  CreteTagGroupDto,
  TagGroup,
  UpdateTagGroupDto,
  UpdateTagGroupResultDto
} from '@gallery/store/tags/tag.model';

const tagUrl = `${environment.apiUrl}/tags`;

@Injectable()
export class TagService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<TagGroup[]> {
    return this.http.get<TagGroup[]>(tagUrl);
  }

  createTagGroup(dto: CreteTagGroupDto): Observable<TagGroup> {
    return this.http.post<TagGroup>(tagUrl, dto);
  }

  updateTagGroup(update: UpdateTagGroupDto): Observable<UpdateTagGroupResultDto> {
    return this.http.patch<UpdateTagGroupResultDto>(`${tagUrl}/${update.id}`, update);
  }

  deleteTagGroup(id: string): Observable<any> {
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

