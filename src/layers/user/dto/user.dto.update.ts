import { IsArray, IsDateString, IsNumber, IsOptional, IsString } from "class-validator";
import { CategoryCreateInput } from "../../../database/prisma.types";

export class UserUpdateDTO {
	@IsString({ message: "social_id не является строкой" })
	social_id: string;

	@IsOptional()
	@IsString({ message: "name не является строкой" })
	name?: string;

	@IsOptional()
	@IsDateString({}, { message: "last_updated не является ISO датой" })
	last_updated?: Date;

	@IsOptional()
	@IsString({ message: "info не является строкой" })
	info?: string;

	@IsOptional()
	@IsNumber({}, { message: "episodes_count не является числом" })
	episodes_count?: number;

	@IsOptional()
	@IsArray()
	categories?: CategoryCreateInput[];
}
