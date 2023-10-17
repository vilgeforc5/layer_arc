import { injectable } from "inversify";
import { ObjectParams } from "../../utils/utils.types";
import { ILogger } from "../logger/logger.types";

@injectable()
export class ServiceWithRepository<
	Repository extends Record<any, any> & { find: (id: string) => any },
> {
	constructor(
		protected logger: ILogger,
		protected repository: Repository,
	) {}

	async processWithCheck<Method extends keyof Repository>({
		method,
		id,
		shouldExist,
		messages,
		args,
	}: {
		method: Method;
		id: string;
		shouldExist: boolean;
		messages: {
			existanceFail: string;
			success: string;
			fail: string;
		};
		args: ObjectParams<Repository>[Method];
	}) {
		const doesExist = await this.repository.find(id);
		if (doesExist && !shouldExist) {
			return {
				result: false,
				message: messages.existanceFail,
			};
		}
		try {
			await this.repository[method](...args);
			this.logger.log(messages.success, ...args);
			return {
				result: true,
				message: messages.success,
			};
		} catch (e) {
			this.logger.error(messages.fail, "\n", e);
			return {
				result: false,
				message: messages.fail,
			};
		}
	}
}
