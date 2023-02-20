import { DataWithPaginationDto, PaginationParamsDto } from "../../common/pagination/pagination.dto";
import { PostDto } from "./post.dto";

export class GetPostsDto extends PaginationParamsDto { }

export class GetPostsResponseDto extends DataWithPaginationDto<PostDto> { }
