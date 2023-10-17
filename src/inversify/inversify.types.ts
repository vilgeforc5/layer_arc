export const TYPES_DI = {
	ILogger: Symbol.for("ILogger"),
	App: Symbol.for("App"),
	ErrorBoundary: Symbol.for("ErrorBoundary"),
	Controller: Symbol.for("Controller"),
	Database: Symbol.for("Database"),

	UserService: Symbol.for("UserService"),
	UserRepository: Symbol.for("UserRepository"),

	CategoryService: Symbol.for("CategoryService"),
	CategoryRepository: Symbol.for("CategoryRepository"),

	VideoService: Symbol.for("VideoService"),
	VideoRepository: Symbol.for("VideoRepository"),
};
