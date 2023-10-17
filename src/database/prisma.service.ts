import { inject, injectable } from "inversify";
import { IDatabase } from "./database.types";
import { PrismaClient } from "@prisma/client";
import { TYPES_DI } from "../inversify/inversify.types";
import { ILogger } from "../common/logger/logger.types";

@injectable()
export class PrismaService implements IDatabase {
	client: PrismaClient;

	constructor(@inject(TYPES_DI.ILogger) private logger: ILogger) {
		this.client = new PrismaClient();
	}

	async connect() {
		try {
			await this.client.$connect();
			this.logger.log("\nConnected via Prisma");
			return true;
		} catch (e: any) {
			this.logger.error("Can't connect via Prisma: " + e.message || "");
			return false;
		}
	}

	async disconnect(): Promise<boolean> {
		try {
			await this.client.$disconnect();
			return true;
		} catch (e: any) {
			this.logger.error("Can't disconnect via Prisma: " + e.message || "");
			return false;
		}
	}
}
