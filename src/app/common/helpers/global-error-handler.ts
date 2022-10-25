import {ErrorHandler, Injectable} from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(/*private messageService: MessageService*/) {
  }

  handleError(error: Error): void {
    // the AppConfig exception cannot be shown with the growl message since the growl component is within the AppComponent
    // this.messageService.add({ severity: 'error', summary: 'Exception', detail: `Global Exception Handler: ${error.message}` });
    console.error(error);
    throw error;
  }

}
