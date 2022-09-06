import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import RoomGateway from './room/room.gateway';
import { RoomModule } from './room/room.module';
import { jwtModule } from './modules.config';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './http-exceptions.filter';

@Module({
  imports: [ConfigModule.forRoot(), jwtModule, RoomModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
