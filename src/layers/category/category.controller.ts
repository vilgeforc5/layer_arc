import { inject, injectable } from "inversify";
import { BaseController } from "../../common/baseController/baseController";
import { TYPES_DI } from "../../inversify/inversify.types";
import { ILogger } from "../../common/logger/logger.types";
import { NextFunction, Request, Response } from "express";
import { RequestBodyValidator } from "../../validator/bodyValidator";
import { CreateCategoryDTO } from "./dto/category.create";
import { CategoryService } from "./category.service";

@injectable()
export class CategoryController extends BaseController {
	constructor(
		@inject(TYPES_DI.ILogger) logger: ILogger,
		@inject(TYPES_DI.CategoryService) private service: CategoryService,
	) {
		super(logger, "/category");
		this.connectJsonMiddleware();
		this.bindRoutes([
			{
				path: "/create",
				method: "post",
				callback: this.create,
				middleware: [new RequestBodyValidator(CreateCategoryDTO)],
			},
			{
				path: "/all",
				method: "get",
				callback: this.all,
			},
		]);
	}

	async create(req: Request<{}, {}, CreateCategoryDTO>, res: Response, next: NextFunction) {
		console.log(123);
		this.handleResultWithError((d) => this.service.create(d), req, res, next);
	}

	async all(req: Request<{}, {}, {}>, res: Response) {
		const params = {
			users: req.query.users !== undefined ? true : false,
		};

		const categories = await this.service.all(params);
		res.send(categories);
	}
}
