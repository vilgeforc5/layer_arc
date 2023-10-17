import { inject, injectable } from "inversify";
import { ServiceWithRepository } from "../../common/serviceWithRepository/serviceWithRepository";
import { TYPES_DI } from "../../inversify/inversify.types";
import { ILogger } from "../../common/logger/logger.types";
import { VideoRepository } from "./video.repository";
import { VideoCreateInput } from "../../database/prisma.types";
import { VideoCreateDTO } from "./dto/video.dto.create";

@injectable()
export class VideoService extends ServiceWithRepository<VideoRepository> {
	constructor(
		@inject(TYPES_DI.ILogger) logger: ILogger,
		@inject(TYPES_DI.VideoRepository) repository: VideoRepository,
	) {
		super(logger, repository);
	}

	create(video: VideoCreateDTO) {
		return this.processWithCheck({
			method: "create",
			id: video.video_id,
			messages: {
				existanceFail: "Видео уже существует",
				fail: "Ошибка при создании видео",
				success: "Видео успешно создано",
			},
			shouldExist: false,
			args: [video],
		});
	}
}
