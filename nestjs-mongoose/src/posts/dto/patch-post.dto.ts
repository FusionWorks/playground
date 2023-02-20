import { IsOptional, IsString } from 'class-validator';

export class PatchPostDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;
}

export default PatchPostDto;
