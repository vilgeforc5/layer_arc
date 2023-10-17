import { inject, injectable } from "inversify";
import { ServiceWithRepository } from "../../common/serviceWithRepository/serviceWithRepository";
import { TYPES_DI } from "../../inversify/inversify.types";
import { ILogger } from "../../common/logger/logger.types";
import { CategoryRepository } from "./category.repository";
import { CreateCategoryDTO } from "./dto/category.create";

@injectable()
export class CategoryService extends ServiceWithRepository<CategoryRepository> {
	constructor(
		@inject(TYPES_DI.ILogger) logger: ILogger,
		@inject(TYPES_DI.CategoryRepository) repository: CategoryRepository,
	) {
		super(logger, repository);
	}

	all(params: { users?: boolean }) {
		return this.repository.all(params);
	}

	create(category: CreateCategoryDTO) {
		return this.processWithCheck({
			method: "create",
			id: category.name,
			messages: {
				existanceFail: "Категория уже существует",
				fail: "Ошибка при создании категории",
				success: "Категория успешно создана",
			},
			shouldExist: false,
			args: [{ name: category.name }],
		});
	}
}
