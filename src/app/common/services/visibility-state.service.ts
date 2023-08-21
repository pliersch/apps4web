import { Injectable } from '@angular/core';
import { EventEmitter } from "@app/common/base/event-emitter";

export type VisibilityEvent = {
  'visible': undefined;
  'hidden': undefined;
}

@Injectable({
  providedIn: 'root'
})
export class VisibilityStateService extends EventEmitter<VisibilityEvent> {

  constructor() {
    super();
    this.initListener();
  }

  private initListener(): void {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === "visible") {
        this.emit('visible')
      } else {
        this.emit('hidden')
      }
    });
  }
}
