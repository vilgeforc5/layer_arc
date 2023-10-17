import { IRoute, RequestHandler } from "express";

interface IMiddleware {
	execute: RequestHandler;
}

export interface IRouteBase {
	path: string;
	method: keyof Omit<IRoute, "path" | "stack">;
	callback: RequestHandler;
	middleware?: IMiddleware[];
}
