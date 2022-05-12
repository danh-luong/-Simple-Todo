import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class TodoRequestUpdate {
  @IsUUID()
  id: string;

  @IsString()
  description: string;
}

export class TodoRequestCreate {
  @IsNotEmpty()
  @IsString()
  description: string;
}
