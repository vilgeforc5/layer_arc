import { IsString } from "class-validator";

export class UserDeleteDTO {
	@IsString({ message: "social_id не является строкой" })
	social_id: string;
}
