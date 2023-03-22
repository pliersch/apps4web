import { User } from "@account/store/user.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlertService } from "@app/common/services/alert.service";
import { environment } from "@environments/environment";
import { Role } from "@modules/admin/modules/user/store/role";
import { DeleteResult } from "@modules/share/interfaces/models/delete-result";
import { Observable, of } from "rxjs";

const PHOTO_BASE_URL = `${environment.apiUrl}/photos`;
const DELETE_ALL_KEY = 'very_special_key';

@Injectable({
  providedIn: 'root'
})
export class GalleryAdminService {

  constructor(private http: HttpClient,
              private alertService: AlertService) { }

  deleteAllPhotos(user: User): Observable<DeleteResult> {
    if (user.role !== Role.Admin) {
      const result: DeleteResult = {
        raw: [],
        affected: 0
      }
      this.alertService.error("Why try to delete photos? This shouldn't possible");
      return of(result);
    }
    const dto = {
      key: DELETE_ALL_KEY,
      user: user
    };
    return this.http.post<DeleteResult>(PHOTO_BASE_URL + '/deleteAll', dto);
  }
}
