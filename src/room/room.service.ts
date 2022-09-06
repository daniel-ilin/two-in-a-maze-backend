import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createRoomID, createUserID } from '../ids';
import { CreateRoomFields, JoinRoomFields, RejoinRoomFields } from '../types';
import { RoomRepository } from './room.repository';

@Injectable()
export class RoomService {
  private readonly logger = new Logger(RoomService.name);
  constructor(
    private readonly roomRepository: RoomRepository,
    private readonly jwtService: JwtService,
  ) {}

  async createRoom(fields: CreateRoomFields) {
    const roomId = createRoomID();
    const userId = createUserID();

    const createdRoom = await this.roomRepository.createRoom({
      ...fields,
      userId,
      roomId,
    });

    this.logger.log(
      `Creating token string for roomId: ${createdRoom.id} and userId ${userId}`,
    );

    const signedString = this.jwtService.sign(
      {
        roomId: createdRoom.id,
        name: fields.name,
      },
      {
        subject: userId,
      },
    );

    return {
      room: createdRoom,
      accessToken: signedString,
    };
  }

  async joinRoom(fields: JoinRoomFields) {
    const userId = createUserID();

    const joinedRoom = fields;

    this.logger.log(
      `Creating token string for roomId: ${joinedRoom.roomId} and userId ${userId}`,
    );

    const signedString = this.jwtService.sign(
      {
        roomId: joinedRoom.roomId,
        name: fields.name,
      },
      {
        subject: userId,
      },
    );

    return {
      room: joinedRoom,
      accessToken: signedString,
    };
  }

  async rejoinRoom(fields: RejoinRoomFields) {
    return {
      ...fields,
    };
  }
}
