import { Injectable } from '@angular/core';
import { ServerSentService } from "@app/common/services/base-server-sent.service";
import { PhotoSseData } from "@modules/photos/store/photos/photo.model";

export type PhotoSseEvent = {
  'photo_added': PhotoSseData;
  'photo_changed': PhotoSseData;
  'tag_added': PhotoSseData;
  'tag_changed': PhotoSseData;
}

@Injectable({
  providedIn: 'root'
})
export class PhotosSseService extends ServerSentService<PhotoSseEvent> {

  constructor() {
    super();
  }

  protected getServerEvents(): string[] {
    return ['photos'];
  }
}
