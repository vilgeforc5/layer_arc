import "reflect-metadata";
import { Container } from "inversify";
import { ILogger } from "../common/logger/logger.types";
import { TYPES_DI } from "./inversify.types";
import { LoggerService } from "../common/logger/logger.service";
import { App } from "../app";
import { ErrorBoundary } from "../errorBoundary/errorBoundary";
import { BaseController } from "../common/baseController/baseController";
import { UserController } from "../layers/user/user.controller";
import { UserService } from "../layers/user/user.service";
import { UserRepository } from "../layers/user/user.repository";
import { IDatabase } from "../database/database.types";
import { PrismaService } from "../database/prisma.service";
import { CategoryService } from "../layers/category/category.service";
import { CategoryRepository } from "../layers/category/category.repository";
import { CategoryController } from "../layers/category/category.controller";
import { VideoController } from "../layers/video/video.controller";
import { VideoService } from "../layers/video/video.service";
import { VideoRepository } from "../layers/video/video.repository";

export const bootstrapApp = (): Container => {
	const appContainer = new Container();
	appContainer.bind<ILogger>(TYPES_DI.ILogger).to(LoggerService).inSingletonScope();
	appContainer.bind<App>(TYPES_DI.App).to(App);
	appContainer.bind<ErrorBoundary>(TYPES_DI.ErrorBoundary).to(ErrorBoundary);
	appContainer.bind<BaseController>(TYPES_DI.Controller).to(UserController);
	appContainer.bind<BaseController>(TYPES_DI.Controller).to(CategoryController);
	appContainer.bind<BaseController>(TYPES_DI.Controller).to(VideoController);

	// db
	appContainer.bind<IDatabase>(TYPES_DI.Database).to(PrismaService).inSingletonScope();
	// user
	appContainer.bind<UserService>(TYPES_DI.UserService).to(UserService);
	appContainer.bind<UserRepository>(TYPES_DI.UserRepository).to(UserRepository);
	// category
	appContainer.bind<CategoryService>(TYPES_DI.CategoryService).to(CategoryService);
	appContainer.bind<CategoryRepository>(TYPES_DI.CategoryRepository).to(CategoryRepository);
	// video
	appContainer.bind<VideoService>(TYPES_DI.VideoService).to(VideoService);
	appContainer.bind<VideoRepository>(TYPES_DI.VideoRepository).to(VideoRepository);
	return appContainer;
};
