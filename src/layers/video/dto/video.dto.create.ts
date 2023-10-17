import {
	IsOptional,
	IsString,
	IsBoolean,
	IsInt,
	IsDateString,
	IsUrl,
	IsObject,
} from "class-validator";
import { VideoCreateInput } from "../../../database/prisma.types";

export class VideoCreateDTO {
	@IsString({ message: "video_id не является строкой" })
	video_id: string;

	@IsUrl({}, { message: "url не является url" })
	url: string;

	@IsDateString({}, { message: "createTime не является строкой" })
	createTime: string;

	@IsInt({ message: "duration не является числом" })
	duration: number;

	@IsBoolean({ message: "isPinned не является строкой" })
	isPinned: boolean;

	@IsString({ message: "authorId не является строкой" })
	authorId: string;

	@IsOptional()
	@IsString({ message: "text не является строкой" })
	text?: string;

	@IsOptional()
	@IsObject({ message: "author не является обьектом" })
	author?: VideoCreateInput["author"];
}
