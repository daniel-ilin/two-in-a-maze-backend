import { Socket } from 'socket.io';
import { Request } from 'express';

export type CreateRoomFields = {
  topic: string;
  name: string;
};
export type JoinRoomFields = {
  roomId: string;
  name: string;
};

export type RejoinRoomFields = {
  roomId: string;
  userId: string;
  name: string;
};

// Repo types

export interface Participant {
  id: string;
  name: string;
}

export interface Room {
  id: string;
  topic: string;
  participants: Participant[];
  adminId: string;
}

export type CreateRoomData = {
  roomId: string;
  topic: string;
  userId: string;
};

export type AddParticipantData = {
  roomId: string;
  name: string;
  userId: string;
};

// Auth types

type AuthPayload = {
  userId: string;
  roomId: string;
  name: string;
};

export type RequestWithAuth = Request & AuthPayload;
export type SocketWithAuth = Socket & AuthPayload;

// Exception

export interface HttpExceptionResponse {
  statusCode: number;
  error: string;
}

export interface CustomHttpExceptionResponse extends HttpExceptionResponse {
  path: string;
  mathod: string;
  timeStamp: Date;
}
