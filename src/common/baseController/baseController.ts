import { injectable } from "inversify";
import { NextFunction, Request, Response, Router } from "express";
import { IRouteBase } from "./baseController.types";
import { ILogger } from "../logger/logger.types";
import { json } from "body-parser";
import { logCharAround } from "../../utils/logCharAround";
import { HTTPError } from "../../errorBoundary/errorBoundary";

@injectable()
export abstract class BaseController {
	private readonly router_: Router;

	constructor(
		private logger: ILogger,
		public name = "/",
	) {
		this.router_ = Router();
	}

	get router(): Router {
		return this.router_;
	}

	protected connectJsonMiddleware() {
		this.router.use(json());
	}

	@logCharAround("#", 50)
	protected bindRoutes(routes: IRouteBase[]) {
		this.logger.log(`\n${this.name}`);
		routes.map((route) => {
			const handler = route.middleware
				? [...route.middleware.map((m) => m.execute.bind(m)), route.callback.bind(this)]
				: route.callback.bind(this);
			this.logger.log(`\nPATH: ${route.path} | METHOD: ${route.method}`);
			this.router[route.method](route.path, handler);
		});
	}

	protected ok<T>(res: Response, body: T) {
		this.send(res, 200, body);
	}

	protected send<T>(res: Response, code: number, body: T) {
		res.status(code);
		res.send(body);
	}

	protected async handleResultWithError<D, R extends { result: boolean; message: string }>(
		fn: (dto: D) => Promise<R>,
		req: Request<{}, {}, D>,
		res: Response,
		next: NextFunction,
	) {
		const result = await fn(req.body);
		if (!result.result) {
			next(new HTTPError(500, result.message));
		} else {
			res.send(result);
		}
	}
}
