import { bootstrapApp } from "./inversify/inversify.config";
import { App } from "./app";
import { TYPES_DI } from "./inversify/inversify.types";

const app = bootstrapApp().get<App>(TYPES_DI.App);
app.init();
