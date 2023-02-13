import { Injectable } from '@angular/core';
import { IRoom, IRoomPaginate, IUser } from '@realtime-xat/interfaces';
import { CustomSocket } from '../../sockets/custom-socket';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private socket: CustomSocket) {}

  sendMessage() {}

  getMessage() {
    return this.socket.fromEvent('message');
  }

  getMyRooms() {
    return this.socket.fromEvent<IRoomPaginate>('rooms');
  }

  creareRoom() {
    const user2: IUser = {
      id: 1,
    };

    const room: IRoom = {
      name: 'TestRoom',
      users: [user2],
    };

    this.socket.emit('createRoom', room);
  }
}
