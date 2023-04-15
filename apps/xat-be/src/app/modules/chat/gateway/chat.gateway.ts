import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
} from '@nestjs/websockets';
import { AuthService } from '../../auth/auth-services/auth.service';
import { Server, Socket } from 'socket.io';
import { IPage, IRoom, IUser } from '@realtime-xat/interfaces';
import { UserService } from '../../user/service/user.service';
import { UnauthorizedException } from '@nestjs/common';
import { RoomService } from '../services/room-service/room.service';

@WebSocketGateway({
  cors: {
    origin: [
      'https://hoppscotch.io',
      'http://localhost:3333',
      'http://localhost:4200',
    ],
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private roomService: RoomService
  ) {}

  @WebSocketServer()
  server: Server;

  async handleConnection(socket: Socket) {
    try {
      const decodedToken = await this.authService.verifyJwt(
        socket.handshake.headers.authorization
      );
      const user: IUser = await this.userService.getOne(decodedToken.id);

      if (!user) {
        return this.disconect(socket);
      } else {
        socket.data.user = user;

        console.log(socket.data.user);

        this.server.to(socket.id).emit('user-data-ready', true);

        const rooms = await this.roomService.getRoomsForUser(user.id, {
          page: 1,
          limit: 10,
        });

        //Substract page -1 to match the Angular material paginator
        rooms.meta.currentPage = rooms.meta.currentPage - 1;

        //Only emit rooms to specific connected client.
        return this.server.to(socket.id).emit('rooms', rooms);
      }
    } catch {
      return this.disconect(socket);
    }
  }

  handleDisconnect(socket: Socket) {
    socket.disconnect();
  }

  private disconect(socket: Socket) {
    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();
  }

  @SubscribeMessage('createRoom')
  async onCreateRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() room: IRoom
  ) {
    // console.log('Message socket.id: ' + socket.id);
    return this.roomService.createRoom(room, socket.data.user);
  }

  @SubscribeMessage('paginateRooms')
  async onPaginateRoom(
    @ConnectedSocket() socket: Socket,
    @MessageBody() page: IPage
  ) {
    page.limit = page.limit > 100 ? 100 : page.limit;

    //Add page +1 to match angular material paginator.
    page.page = page.page + 1;

    console.log( "OnPaginate" + JSON.stringify(socket.data));

    const rooms = await this.roomService.getRoomsForUser(socket.data.user.id, {
      page: page.page,
      limit: page.limit,
    });

    //Substract page -1 to match the Angular material paginator
    rooms.meta.currentPage = rooms.meta.currentPage - 1;

    return this.server.to(socket.id).emit('rooms', rooms);
  }
}
