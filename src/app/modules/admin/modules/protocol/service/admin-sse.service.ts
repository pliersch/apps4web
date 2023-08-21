import { Injectable } from '@angular/core';
import { ServerSentService } from "@app/common/services/base-server-sent.service";
import { Visit } from "@modules/admin/modules/protocol/store/visit";

export type AdminSseEvent = {
  'visit_added': Visit;
}

@Injectable({
  providedIn: 'root'
})
export class AdminSseService extends ServerSentService<AdminSseEvent> {

  constructor() {
    super();
  }

  protected getServerEvents(): string[] {
    // TODO try to set 'user' -> 'admin' or 'visit'
    // https://trello.com/c/TlIzcrNM/6-sse-f%C3%BCr-visits-nicht-user-sonder-admin-oder-visits
    return ['user'];
  }

}
