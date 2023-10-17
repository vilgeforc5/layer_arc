import { inject, injectable } from "inversify";
import { TYPES_DI } from "../../inversify/inversify.types";
import { PrismaService } from "../../database/prisma.service";
import { UserCreateInput } from "../../database/prisma.types";
import { UserUpdateDTO } from "./dto/user.dto.update";

@injectable()
export class UserRepository {
	constructor(@inject(TYPES_DI.Database) private prisma: PrismaService) {}

	create(user: UserCreateInput) {
		return this.prisma.client.user.create({
			data: {
				...user,
				categories: {
					connectOrCreate: user.categories?.map((c) => ({
						create: {
							name: c.name,
						},
						where: {
							name: c.name,
						},
					})),
				},
			},
		});
	}

	find(id: string) {
		return this.prisma.client.user.findFirst({
			where: {
				social_id: id,
			},
		});
	}

	all(params: { categories?: boolean; videos?: boolean }) {
		return this.prisma.client.user.findMany({
			include: {
				categories: params.categories,
				videos: params.videos,
			},
		});
	}

	delete(id: string) {
		return this.prisma.client.user.delete({
			where: {
				social_id: id,
			},
		});
	}

	update(user: UserUpdateDTO) {
		return this.prisma.client.user.update({
			where: {
				social_id: user.social_id,
			},
			data: {
				...user,
				categories: {
					set: [],
					connectOrCreate: user.categories?.map((c) => ({
						create: {
							name: c.name,
						},
						where: {
							name: c.name,
						},
					})),
				},
			},
		});
	}
}
