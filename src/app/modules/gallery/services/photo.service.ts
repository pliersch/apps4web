import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { formatEnglish } from "@app/common/util/date-util";
import { environment } from '@environments/environment';
import { Photo, PhotoDeleteDto, PhotoDto, PhotoMetaDataDto, PhotoUpdate } from '@gallery/store/photos/photo.model';
import { Tag } from "@gallery/store/tags/tag.model";
import { DeleteResult } from "@modules/share/interfaces/models/delete-result";
import { Observable } from 'rxjs';

const PHOTO_BASE_URL = `${environment.apiUrl}/photos`;
const DOWNLOAD_BASE_URL = `${environment.apiUrl}/download`;

@Injectable()
export class PhotoService {

  constructor(private http: HttpClient) { }

  loadMetaData(): Observable<PhotoMetaDataDto> {
    return this.http.get<PhotoMetaDataDto>(PHOTO_BASE_URL + '/meta');
  }

  getPhotos(from: number, take: number, tagIds: string[]): Observable<PhotoDto> {
    console.log('PhotoService getPhotos: ', from, take)
    return this.http.get<PhotoDto>(PHOTO_BASE_URL, {
      params: {
        from: from,
        take: take,
        tagIds: tagIds
      }
    });
  }

  // getById(id: string): Observable<Photo> {
  //   return this.http.get<Photo>(`${PHOTO_BASE_URL}/${id}`);
  // }

  create(file: File, userId: string, tags: Tag[], created: Date, isPrivate: boolean): Observable<Photo> {
    const stringify = JSON.stringify(tags);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('tags', stringify);
    formData.append('userid', userId);
    formData.append('isPrivate', JSON.stringify(isPrivate));
    formData.append('created', formatEnglish(created));
    return this.http.post<Photo>(PHOTO_BASE_URL + '/file', formData);
  }

  // todo use PhotoUpdate as return result
  updatePhoto(id: string, dto: PhotoUpdate): Observable<Photo> {
    return this.http.patch<Photo>(`${PHOTO_BASE_URL}/${id}`, dto);
  }

  delete(id: string): Observable<PhotoDeleteDto> {
    return this.http.delete<PhotoDeleteDto>(`${PHOTO_BASE_URL}/${id}`);
  }

  deletePhotos(ids: string[]): Observable<DeleteResult> {
    const dto = {ids: ids}
    return this.http.post<DeleteResult>(PHOTO_BASE_URL + '/delmany', dto);
  }

  setRating(photo: Photo, rate: number): Observable<PhotoUpdate> {
    const dto = {rating: rate}
    return this.http.patch<PhotoUpdate>(`${PHOTO_BASE_URL}/${photo.id}`, dto);
  }

  download(photos: Photo[]): Observable<Blob> {
    const fileNames: string[] = [];
    for (const photo of photos) {
      fileNames.push(photo.fileName);
    }
    const stringify = JSON.stringify(fileNames);
    return this.http.post(DOWNLOAD_BASE_URL, stringify, {
      responseType: 'blob',
      headers: {
        'Accept': 'application/zip',
        'Content-Type': 'application/json'
      }
    });
  }
}
