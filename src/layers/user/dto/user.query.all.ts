import { IsOptional } from "class-validator";

export class UserQueryAll {
	@IsOptional()
	// @IsBoolean()
	videos?: boolean;

	@IsOptional()
	categories?: boolean;
}
