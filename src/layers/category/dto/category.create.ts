import { IsString } from "class-validator";

export class CreateCategoryDTO {
	@IsString({ message: "Категория должна быть строкой" })
	name: string;
}
