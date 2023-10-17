import { inject, injectable } from "inversify";
import { BaseController } from "../../common/baseController/baseController";
import { TYPES_DI } from "../../inversify/inversify.types";
import { ILogger } from "../../common/logger/logger.types";
import { NextFunction, Request, Response } from "express";
import { VideoCreateDTO } from "./dto/video.dto.create";
import { VideoService } from "./video.service";
import { RequestBodyValidator } from "../../validator/bodyValidator";

@injectable()
export class VideoController extends BaseController {
	constructor(
		@inject(TYPES_DI.ILogger) logger: ILogger,
		@inject(TYPES_DI.VideoService) private service: VideoService,
	) {
		super(logger, "/video");
		this.connectJsonMiddleware();
		this.bindRoutes([
			{
				callback: this.create,
				method: "post",
				path: "/create",
				middleware: [new RequestBodyValidator(VideoCreateDTO)],
			},
		]);
	}

	create(req: Request<{}, {}, VideoCreateDTO>, res: Response, next: NextFunction) {
		this.handleResultWithError((d) => this.service.create(d), req, res, next);
	}
}
