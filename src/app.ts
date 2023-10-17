import { inject, injectable, multiInject } from "inversify";
import { TYPES_DI } from "./inversify/inversify.types";
import { ILogger } from "./common/logger/logger.types";
import express, { Express } from "express";
import { ErrorBoundary } from "./errorBoundary/errorBoundary";
import { BaseController } from "./common/baseController/baseController";
import cors from "cors";
import { IDatabase } from "./database/database.types";

@injectable()
export class App {
	private app: Express;
	private port = process.env.PORT || "3000";

	constructor(
		@inject(TYPES_DI.ILogger) private logger: ILogger,
		@inject(TYPES_DI.ErrorBoundary) private errorBoundary: ErrorBoundary,
		@inject(TYPES_DI.Database) private database: IDatabase,
		@multiInject(TYPES_DI.Controller) private controllers: BaseController[],
	) {
		this.app = express();
	}

	connectErrorBoundary() {
		this.app.use(this.errorBoundary.handle.bind(this.errorBoundary));
	}

	connectRoutes() {
		this.controllers.forEach((c) => {
			this.app.use(c.name, c.router);
		});
	}

	private connectCORS() {
		this.app.use(cors());
	}

	public async init() {
		try {
			await this.database.connect();
			this.connectCORS();
			this.connectRoutes();
			this.connectErrorBoundary();

			this.app.listen(this.port, () => {
				this.logger.log("Server started on port " + this.port);
			});
		} catch (e) {
			if (e instanceof Error) {
				this.logger.error(e.message);
			} else {
				this.logger.error("Can't start server");
			}
		}
	}
}
