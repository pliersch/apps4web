import { Injectable } from '@angular/core';
import { EventEmitter } from "@app/common/base/event-emitter";

@Injectable({
  providedIn: 'root'
})
export class VisibilityStateService extends EventEmitter {

  public static VISIBLE = 'visible';
  public static HIDDEN = 'hidden';

  constructor() {
    super();
    this.initListener();
  }

  private initListener(): void {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === "visible") {
        this.emit(VisibilityStateService.VISIBLE)
      } else {
        this.emit(VisibilityStateService.HIDDEN)
      }
    });
  }
}
