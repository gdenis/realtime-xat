import { Injectable } from '@angular/core';
import { IRoom, IRoomPaginate, IUser } from '@realtime-xat/interfaces';
import { Subscription } from 'rxjs';
import { CustomSocket } from '../../sockets/custom-socket';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private socket: CustomSocket) {
    this.socket.connect();
  }

  sendMessage() {}

  getMessage() {
    return this.socket.fromEvent('message');
  }

  getMyRooms() {
    return this.socket.fromEvent<IRoomPaginate>('rooms');
  }

  createRoom(): Subscription {
    const user2: IUser = {
      id: 1,
    };

    const room: IRoom = {
      name: 'TestRoom',
      users: [user2],
    };

    return this.socket.fromEvent('user-data-ready').subscribe(() => {
      this.socket.emit('createRoom', room);
    });
  }
}
