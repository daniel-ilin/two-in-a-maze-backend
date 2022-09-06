import { Module, UseGuards } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { jwtModule } from '../modules.config';
import { HttpExceptionFilter } from '../http-exceptions.filter';

import { RoomController } from './room.controller';
import { RoomRepository } from './room.repository';
import { RoomService } from './room.service';
import RoomGateway from './room.gateway';

@Module({
  imports: [ConfigModule, jwtModule],
  controllers: [RoomController],
  providers: [
    RoomService,
    RoomRepository,
    RoomGateway,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class RoomModule {}
