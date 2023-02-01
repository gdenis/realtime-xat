import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { AuthService } from '../../auth/auth-services/auth.service';
import { Server, Socket } from 'socket.io';
import { IUser } from '@realtime-xat/interfaces';
import { UserService } from '../../user/service/user.service';
import { UnauthorizedException } from '@nestjs/common';

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
    private userService: UserService
  ) {}

  @WebSocketServer()
  server: Server;

  title: string[] = [];

  async handleConnection(socket: Socket) {
    try {
      const decodedToken = await this.authService.verifyJwt(
        socket.handshake.headers.authorization
      );
      const user: IUser = await this.userService.getOne(decodedToken.id);

      if (!user) {
        return this.disconect(socket);
      } else {
        this.title.push('Value' + Math.random().toString());
        this.server.emit('message', this.title);
      }

      console.log('On Connect');

    } catch {
      return this.disconect(socket);
    }

  }

  handleDisconnect(socket: Socket) {
    socket.disconnect()
  }

  private disconect(socket: Socket) {

    socket.emit('Error', new UnauthorizedException());
    socket.disconnect();

  }
}
