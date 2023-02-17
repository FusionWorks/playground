import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUsersDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export default CreateUsersDto;
