import { Logger, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsException,
  BaseWsExceptionFilter,
} from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';
import { SocketWithAuth } from '../types';
import { RoomService } from './room.service';

@UsePipes(new ValidationPipe())
@WebSocketGateway({ namespace: 'rooms' })
export default class RoomGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly roomService: RoomService) {}

  private readonly logger = new Logger(RoomGateway.name);

  @WebSocketServer() io: Namespace;

  afterInit(): void {
    this.logger.log('Websocket Gateway initialized');
  }

  async handleConnection(client: SocketWithAuth) {
    console.log('hello');
    const sockets = this.io.sockets;

    const roomName = client.roomId;
    await client.join(roomName);
    const connectedSockets = this.io.adapter.rooms.get(roomName)?.size ?? 0;

    this.logger.log(`WS Client with id ${client.id} connected to ${roomName}`);
    this.logger.log(`Room ${roomName} has ${connectedSockets} clients`);
  }

  handleDisconnect(client: SocketWithAuth) {
    const sockets = this.io.sockets;

    this.logger.log(`WS Client with id ${client.id} connected`);
    this.logger.debug(`Number of connected sockets: ${sockets.size}`);
    this.io.emit('Hello', `from ${client.id}`);
  }

  @SubscribeMessage('message')
  @UseFilters(new BaseWsExceptionFilter())
  async handleMessage(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ) {
    throw new WsException({ field: 'field', message: 'You messed up' });
  }
}
