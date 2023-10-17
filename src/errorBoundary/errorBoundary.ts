import { inject, injectable } from "inversify";
import { TYPES_DI } from "../inversify/inversify.types";
import { ILogger } from "../common/logger/logger.types";
import { NextFunction, Request, Response } from "express";

export class HTTPError extends Error {
	constructor(
		public code: number,
		public message: string,
	) {
		super(message);
	}
}

@injectable()
export class ErrorBoundary {
	constructor(@inject(TYPES_DI.ILogger) private logger: ILogger) {}
	handle(err: HTTPError | Error, _: Request, res: Response, next: NextFunction) {
		if (err instanceof HTTPError) {
			this.logger.error(err.code, err.message);
			res.status(err.code).send(err.message);
		} else {
			this.logger.error(500, err.message);
			res.status(500).send(err.message);
		}
		next();
	}
}
