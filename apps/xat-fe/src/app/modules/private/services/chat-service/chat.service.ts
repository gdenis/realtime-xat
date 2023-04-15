import { Injectable } from '@angular/core';
import { IRoom, IRoomPaginate, IUser } from '@realtime-xat/interfaces';
import { Observable, Subscription } from 'rxjs';
import { CustomSocket } from '../../sockets/custom-socket';

@Injectable({
  providedIn: 'root',
})
export class ChatService {

  private initialized = false;

  constructor(private socket: CustomSocket) {
    this.socket.connect();
  }

  getMyRooms() {
    return this.socket.fromEvent<IRoomPaginate>('rooms');
  }

  emitPaginateRooms(limit: number, page: number) {
    this.socket.emit('paginateRooms', { limit, page });
  }

  get IsReady() : boolean {
    return this.initialized;
  }

  async awaitInfoReady() : Promise<boolean>{
    return this.initialized = await this.socket.fromOneTimeEvent<boolean>('user-data-ready');
  }

  createRoom() {}
}
