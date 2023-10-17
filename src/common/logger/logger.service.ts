import { injectable } from "inversify";
import { ILogger } from "./logger.types";
import { Logger } from "tslog";

@injectable()
export class LoggerService implements ILogger {
	private logger: Logger<any>;

	constructor() {
		this.logger = new Logger();
	}

	public log(...args: any[]): void {
		this.logger.info(...args);
	}
	public warn(...args: any[]): void {
		this.logger.warn(...args);
	}
	public error(...args: any[]): void {
		this.logger.error(...args);
	}
}
