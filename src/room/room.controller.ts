import {
  Body,
  Controller,
  Logger,
  Post,
  Req,
  Request,
  UseFilters,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto, JoinRoomDto } from '../dtos';
import { HttpExceptionFilter } from '../http-exceptions.filter';
import { ControllerAuthGuard } from './controller-auth.guard';
import { RequestWithAuth } from '../types';

@Controller(`rooms`)
@UsePipes(new ValidationPipe())
@UseFilters(HttpExceptionFilter)
export class RoomController {
  private readonly logger = new Logger(RoomController.name);
  constructor(private RoomService: RoomService) {}

  @Post()
  async create(@Body() createRoomDto: CreateRoomDto) {
    const result = await this.RoomService.createRoom(createRoomDto);
    return result;
  }

  @Post(`/join`)
  async join(@Body() joinRoomDto: JoinRoomDto) {
    const result = await this.RoomService.joinRoom(joinRoomDto);
    return result;
  }
  @UseGuards(ControllerAuthGuard)
  @Post(`/rejoin`)
  async rejoin(@Req() request: RequestWithAuth) {
    const { userId, roomId, name } = request;
    const result = await this.RoomService.rejoinRoom({
      name,
      roomId,
      userId,
    });
    return result;
  }
}
