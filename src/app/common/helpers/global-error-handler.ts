import { ErrorHandler, Injectable } from '@angular/core';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(/*private messageService: MessageService*/) {
  }

  handleError(error: Error): void {
    console.error(error);
    throw error;
  }

}
