import { customAlphabet, nanoid } from 'nanoid';

export const createRoomID = customAlphabet(
  '0123456789QWERTYUIOPASDFGHJKLZXCVBNM',
  6,
);

export const createUserID = () => nanoid();
export const createominationID = () => nanoid(8);
