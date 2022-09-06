import { Length, IsInt, IsString, Min, Max } from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @Length(1, 100)
  topic: string;

  //   @IsInt()
  //   @Min(1)
  //   @Max(5)
  //   votesPerVoter: number;

  @IsString()
  @Length(1, 25)
  name: string;
}

export class JoinRoomDto {
  @IsString()
  @Length(6, 6)
  roomId: string;

  @IsString()
  @Length(1, 25)
  name: string;
}

export class NominationDto {
  @IsString()
  @Length(1, 100)
  text: string;
}
