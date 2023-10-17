import { inject, injectable } from "inversify";
import { TYPES_DI } from "../../inversify/inversify.types";
import { PrismaService } from "../../database/prisma.service";
import { VideoCreateInput } from "../../database/prisma.types";
import { VideoCreateDTO } from "./dto/video.dto.create";

@injectable()
export class VideoRepository {
	constructor(@inject(TYPES_DI.Database) private prisma: PrismaService) {}

	find(id: string) {
		return this.prisma.client.video.findFirst({
			where: {
				video_id: id,
			},
		});
	}

	create(video: VideoCreateDTO) {
		return this.prisma.client.video.create({
			data: {
				createTime: video.createTime,
				duration: video.duration,
				isPinned: video.isPinned,
				url: video.url,
				video_id: video.video_id,
				text: video.text,
				author: {
					connect: {
						social_id: video.authorId,
					},
				},
			},
		});
	}
}
