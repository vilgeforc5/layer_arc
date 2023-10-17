import { inject, injectable } from "inversify";
import { TYPES_DI } from "../../inversify/inversify.types";
import { ILogger } from "../../common/logger/logger.types";
import { UserRepository } from "./user.repository";
import { UserCreateDTO } from "./dto/user.dto.create";
import { ServiceWithRepository } from "../../common/serviceWithRepository/serviceWithRepository";
import { UserDeleteDTO } from "./dto/user.dto.delete";
import { UserUpdateDTO } from "./dto/user.dto.update";

@injectable()
export class UserService extends ServiceWithRepository<UserRepository> {
	constructor(
		@inject(TYPES_DI.ILogger) logger: ILogger,
		@inject(TYPES_DI.UserRepository) repository: UserRepository,
	) {
		super(logger, repository);
	}

	create(user: UserCreateDTO) {
		return this.processWithCheck({
			id: user.social_id,
			method: "create",
			messages: {
				existanceFail: "Пользователь уже существует",
				fail: "Ошибка при создании пользователя",
				success: "Пользователь успешно создан",
			},
			shouldExist: false,
			args: [user],
		});
	}

	all(params: { videos?: boolean; categories?: boolean }) {
		return this.repository.all(params);
	}

	delete({ social_id }: UserDeleteDTO) {
		return this.processWithCheck({
			id: social_id,
			method: "delete",
			messages: {
				existanceFail: "Пользователя не существует",
				fail: "Ошибка при удалении пользователя",
				success: "Пользователь успешно удален",
			},
			shouldExist: true,
			args: [social_id],
		});
	}

	update(changes: UserUpdateDTO) {
		return this.processWithCheck({
			id: changes.social_id,
			method: "update",
			messages: {
				existanceFail: "Пользователя не существует",
				fail: "Ошибка при измении пользователя",
				success: "Пользователь успешно изменен",
			},
			shouldExist: true,
			args: [changes],
		});
	}
}
