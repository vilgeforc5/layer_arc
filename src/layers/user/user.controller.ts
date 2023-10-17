import { inject, injectable } from "inversify";
import { BaseController } from "../../common/baseController/baseController";
import { TYPES_DI } from "../../inversify/inversify.types";
import { ILogger } from "../../common/logger/logger.types";
import { NextFunction, Request, Response } from "express";
import { UserCreateDTO } from "./dto/user.dto.create";
import { RequestBodyValidator } from "../../validator/bodyValidator";
import { UserDeleteDTO } from "./dto/user.dto.delete";
import { UserService } from "./user.service";
import { RequestQueryValidator } from "../../validator/queryValidator";
import { UserQueryAll } from "./dto/user.query.all";
import { UserUpdateDTO } from "./dto/user.dto.update";

@injectable()
export class UserController extends BaseController {
	constructor(
		@inject(TYPES_DI.ILogger) logger: ILogger,
		@inject(TYPES_DI.UserService) private service: UserService,
	) {
		super(logger, "/user");
		this.connectJsonMiddleware();
		this.bindRoutes([
			{
				path: "/create",
				method: "post",
				callback: this.create,
				middleware: [new RequestBodyValidator(UserCreateDTO)],
			},
			{
				path: "/delete",
				method: "delete",
				callback: this.delete,
				middleware: [new RequestBodyValidator(UserDeleteDTO)],
			},
			{
				path: "/all",
				method: "get",
				callback: this.all,
				middleware: [new RequestQueryValidator(UserQueryAll)],
			},
			{
				path: "/update",
				method: "patch",
				callback: this.update,
				middleware: [new RequestBodyValidator(UserUpdateDTO)],
			},
		]);
	}

	async create(req: Request<{}, {}, UserCreateDTO>, res: Response, next: NextFunction) {
		this.handleResultWithError((d) => this.service.create(d), req, res, next);
	}

	async all(req: Request, res: Response) {
		const params = {
			videos: req.query.videos !== undefined ? true : false,
			categories: req.query.categories !== undefined ? true : false,
		};
		const users = await this.service.all(params);
		res.send(users);
	}

	async delete(req: Request<{}, {}, UserDeleteDTO>, res: Response, next: NextFunction) {
		this.handleResultWithError((d) => this.service.delete(d), req, res, next);
	}

	async update(req: Request<{}, {}, UserUpdateDTO>, res: Response, next: NextFunction) {
		this.handleResultWithError((d) => this.service.update(d), req, res, next);
	}
}
