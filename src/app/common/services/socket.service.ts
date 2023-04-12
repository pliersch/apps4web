import { Injectable } from '@angular/core';
import { Socket } from "ngx-socket-io";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) { }

  // emit event
  sendMessage(msg: any): void {
    this.socket.emit('todo', msg);
  }

  // listen event
  onFetchMovies(): Observable<unknown> {
    return this.socket.fromEvent('todo');
  }
}
