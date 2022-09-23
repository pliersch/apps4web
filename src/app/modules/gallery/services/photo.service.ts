import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Photo, PhotoUpdate } from '@gallery/store/photos/photo.model';
import { Order } from "@app/common/constants/order.constant";
import { PhotoMetaDataDto } from "@gallery/store/photos/dto/photo-meta-data.dto";
import { PhotoDto } from "@gallery/store/photos/dto/photo.dto";

const PICTURE_BASE_URL = `${environment.apiUrl}/photos`;
const DOWNLOAD_BASE_URL = `${environment.apiUrl}/download`;

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) {
  }

  loadMetaData(): Observable<PhotoMetaDataDto> {
    return this.http.get<PhotoMetaDataDto>(PICTURE_BASE_URL + '/meta');
  }

  getAll(): Observable<PhotoDto> {
    return this.http.get<PhotoDto>(PICTURE_BASE_URL, {
      params: {
        order: Order.ASC,
        page: 1,
        take: 30
      }
    });
  }

  getPhotos(take: number, from: number): Observable<PhotoDto> {
    console.log('PhotoService getPhotos: ', take, from)
    return this.http.get<PhotoDto>(PICTURE_BASE_URL, {
      params: {
        order: Order.ASC,
        from: from,
        take: take
      }
    });
  }

  getById(id: string): Observable<Photo> {
    return this.http.get<Photo>(`${PICTURE_BASE_URL}/${id}`);
  }

  create(file: File, tags: string[], created: number): Observable<Photo> {
    const stringify = JSON.stringify(tags);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('tags', stringify);
    formData.append('created', created.toString());
    return this.http.post<Photo>(PICTURE_BASE_URL + '/file', formData);
  }

  // todo use PhotoUpdate as return result
  updateTagsOfPicture(id: string, tags: string[]): Observable<string[]> {
    const dto = {tags: tags}
    return this.http.patch<string[]>(`${PICTURE_BASE_URL}/${id}`, dto);
  }

  delete(id: string): Observable<PhotoUpdate> {
    return this.http.delete<PhotoUpdate>(`${PICTURE_BASE_URL}/${id}`);
  }

  setRating(photo: Photo, rate: number): Observable<PhotoUpdate> {
    const dto = {rating: rate}
    return this.http.patch<PhotoUpdate>(`${PICTURE_BASE_URL}/${photo.id}`, dto);
  }

  download(photos: Photo[]): Observable<any> {
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
