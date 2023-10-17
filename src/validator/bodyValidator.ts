import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

export class RequestBodyValidator {
	constructor(private classValidate: ClassConstructor<Record<any, any>>) {}

	async execute(req: Request, res: Response, next: NextFunction) {
		const obj = plainToClass(this.classValidate, req.body);
		const errors = await validate(obj);
		if (errors.length > 0) {
			res.status(422).send(errors);
		} else {
			next();
		}
	}
}
