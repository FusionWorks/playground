import { IsOptional, IsString, IsNotEmpty } from 'class-validator';

interface PostDto {
  title: string;
  content: string;
}

export class UpdatePostDto implements PostDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  content: string;
}

export class CreatePostDto implements PostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}