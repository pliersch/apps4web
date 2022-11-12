import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Photo, PhotoUpdate } from '@gallery/store/photos/photo.model';
import { Order } from "@app/common/const/order.constant";
import { PhotoMetaDataDto } from "@gallery/store/photos/dto/photo-meta-data.dto";
import { PhotoDto } from "@gallery/store/photos/dto/photo.dto";
import { Tag } from "@gallery/store/tags/tag.model";

const PHOTO_BASE_URL = `${environment.apiUrl}/photos`;
const DOWNLOAD_BASE_URL = `${environment.apiUrl}/download`;

@Injectable({
  providedIn: 'any'
})
export class PhotoService {

  constructor(private http: HttpClient) { }

  loadMetaData(): Observable<PhotoMetaDataDto> {
    return this.http.get<PhotoMetaDataDto>(PHOTO_BASE_URL + '/meta');
  }

  getPhotos(take: number, from: number): Observable<PhotoDto> {
    console.log('PhotoService getPhotos: ', take, from)
    return this.http.get<PhotoDto>(PHOTO_BASE_URL, {
      params: {
        order: Order.ASC,
        from: from,
        take: take
      }
    });
  }

  // getById(id: string): Observable<Photo> {
  //   return this.http.get<Photo>(`${PHOTO_BASE_URL}/${id}`);
  // }

  create(file: File, userId: string, tags: Tag[], created: number, isPrivate: boolean): Observable<Photo> {
    const stringify = JSON.stringify(tags);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('tags', stringify);
    formData.append('userid', userId);
    formData.append('isPrivate', JSON.stringify(isPrivate));
    formData.append('created', created.toString());
    return this.http.post<Photo>(PHOTO_BASE_URL + '/file', formData);
  }

  // todo use PhotoUpdate as return result
  updateTagsOfPhoto(id: string, tags: Tag[]): Observable<string[]> {
    const dto = {tags: tags}
    return this.http.patch<string[]>(`${PHOTO_BASE_URL}/${id}`, dto);
  }

  delete(id: string): Observable<PhotoUpdate> {
    return this.http.delete<PhotoUpdate>(`${PHOTO_BASE_URL}/${id}`);
  }

  // deletePhotos(ids: string[]): Observable<PhotoUpdate> {
  //   const dto = {ids: ids}
  //   return this.http.post<PhotoUpdate>(PHOTO_BASE_URL + '/delmany', dto);
  // }

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
