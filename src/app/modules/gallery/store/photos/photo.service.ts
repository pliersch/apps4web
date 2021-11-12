import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Photo } from '@gallery/store/photos/photo.model';

const baseUrl = `${environment.apiUrl}/photos`;

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Photo[]> {
    return this.http.get<Photo[]>(baseUrl);
  }

  getById(id: string): Observable<Photo> {
    return this.http.get<Photo>(`${baseUrl}/${id}`);
  }

  create(file: File, tags: string[]): Observable<Photo> {
    console.log('tags array', tags);
    const stringify = JSON.stringify(tags);
    console.log('tags stringify', stringify);
    const formData = new FormData();
    formData.append('image', file);
    formData.append('tags', stringify);
    return this.http.post<Photo>(baseUrl + '/file', formData);
  }

  delete(id: string): Observable<any> {
    throw new Error('PhotoService#delete not implemented');
    // return this.http.delete(`${baseUrl}/${id}`).pipe(
    //   finalize(() => {
    //   })
    // );
  }
}
