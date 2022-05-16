import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Photo, PhotoUpdate } from '@gallery/store/photos/photo.model';
import { PageDto } from "@app/common/dto/page.dto";
import { Order } from "@app/common/constants/order.constant";
import { PageOptionsDto } from "@app/common/dto/page-options.dto";
import { PageMetaDto } from "@app/common/dto/page-meta.dto";
import { PhotoMetaDataDto } from "@gallery/store/photos/dto/photo-meta-data.dto";

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

  getAll(): Observable<PageDto<Photo>> {
    return this.http.get<PageDto<Photo>>(PICTURE_BASE_URL, {
      params: {
        order: Order.ASC,
        page: 1,
        take: 30
      }
    });
  }

  getPage(dto: PageOptionsDto): Observable<PageDto<Photo>> {
    console.log('PhotoService getPage: ', dto.page)
    return this.http.get<PageDto<Photo>>(PICTURE_BASE_URL, {
      params: {
        order: Order.ASC,
        page: dto.page,
        take: dto.take
      }
    });
  }

  getById(id: string): Observable<Photo> {
    return this.http.get<Photo>(`${PICTURE_BASE_URL}/${id}`);
  }

  create(file: File, tags: string[]): Observable<Photo> {
    const stringify = JSON.stringify(tags);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('tags', stringify);
    return this.http.post<Photo>(PICTURE_BASE_URL + '/file', formData);
  }

  /**
   * @param id picture id
   * @param tags all existing tags
   */
  updateTagsOfPicture(id: string, tags: string[]): Observable<string[]> {
    const dto = {tags: tags}
    return this.http.patch<string[]>(`${PICTURE_BASE_URL}/${id}`, dto);
  }

  delete(id: string): Observable<PhotoUpdate> {
    return this.http.delete<PhotoUpdate>(`${PICTURE_BASE_URL}/${id}`);
  }

  download(photos: Photo[]): Observable<any> {
    let fileNames: string[] = [];
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
