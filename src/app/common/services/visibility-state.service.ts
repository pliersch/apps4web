import { Injectable } from '@angular/core';
import { TypedEventEmitter } from "@app/common/base/typed-event-emitter";

export type VisibilityEventTypes = {
  'visible': undefined;
  'hidden': undefined;
}

@Injectable({
  providedIn: 'root'
})
export class VisibilityStateService extends TypedEventEmitter<VisibilityEventTypes> {

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
