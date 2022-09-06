import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  UseFilters,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from '../http-exceptions.filter';
import {
  AddParticipantData,
  CreateRoomData,
  Participant,
  Room,
} from '../types';

const rooms: Room[] = [];

@Injectable()
export class RoomRepository {
  private readonly ttl: string;
  private readonly logger = new Logger(RoomRepository.name);
  constructor(configService: ConfigService) {
    this.ttl = configService.get('ROOM_DURATION') ?? '7200';
  }

  async createRoom({ topic, roomId, userId }: CreateRoomData): Promise<Room> {
    this.logger.log(`Creating a new room: ${topic}; ${roomId}; ${userId}`);
    const initialRoom = {
      id: roomId,
      topic,
      participants: [],
      adminId: userId,
    };
    rooms.push(initialRoom);
    this.logger.log(JSON.stringify(rooms));
    return initialRoom;
  }

  async getRoom(roomId: string): Promise<Room> {
    const room = rooms.find((room) => room.id !== roomId);
    if (!room) {
      throw new HttpException('This room does not exist', HttpStatus.NOT_FOUND);
    }
    return room;
  }

  async addParticipant({
    roomId,
    userId,
    name,
  }: AddParticipantData): Promise<Room> {
    const newParticipant: Participant = {
      id: userId,
      name: name,
    };
    const room = rooms.find((room) => room.id === roomId);
    if (!room) {
      throw new HttpException('No room matching that ID', HttpStatus.NOT_FOUND);
    }
    const partNum = room.participants.length;
    if (partNum >= 2) {
      throw new HttpException('This room is full', HttpStatus.CONFLICT);
    }
    room.participants.push(newParticipant);
    this.logger.log(JSON.stringify(rooms));
    return room;
  }

  async removeParticipant(roomId: string, userId: string): Promise<Room> {
    this.logger.log('Removing user');

    const room = rooms.find((room) => room.id === roomId);
    if (!room) {
      throw new HttpException('No room matching that ID', HttpStatus.NOT_FOUND);
    }
    room?.participants.filter((user) => user.id !== userId);

    return room;
  }
}
