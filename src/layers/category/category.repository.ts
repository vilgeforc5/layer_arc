import { inject, injectable } from "inversify";
import { TYPES_DI } from "../../inversify/inversify.types";
import { PrismaService } from "../../database/prisma.service";
import { CategoryCreateInput } from "../../database/prisma.types";

@injectable()
export class CategoryRepository {
	constructor(@inject(TYPES_DI.Database) private prisma: PrismaService) {}

	all(params: { users?: boolean }) {
		return this.prisma.client.category.findMany({
			include: {
				users: params.users,
			},
		});
	}

	create(category: CategoryCreateInput) {
		return this.prisma.client.category.create({
			data: {
				name: category.name,
			},
		});
	}

	find(id: string | number) {
		if (typeof id === "number") {
			return this.prisma.client.category.findFirst({
				where: {
					id: id,
				},
			});
		} else {
			return this.prisma.client.category.findFirst({
				where: {
					name: id,
				},
			});
		}
	}
}
