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
    console.log('SocketService sendMessage: ',)
    this.socket.emit('send-message', msg);
  }

  // listen event
  onFetchMovies(): Observable<unknown> {
    return this.socket.fromEvent('fetchMovies');
  }
}
