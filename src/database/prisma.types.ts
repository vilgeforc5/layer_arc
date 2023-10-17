import { type Prisma } from "@prisma/client";

export type UserCreateInput = Omit<Prisma.UserCreateInput, "categories" | "videos"> & {
	categories?: CategoryCreateInput[];
};
export type VideoCreateInput = Prisma.VideoCreateInput;
export type CategoryCreateInput = Prisma.CategoryCreateInput;
