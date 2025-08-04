"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const helmet_1 = __importDefault(require("helmet"));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, helmet_1.default)());
    app.enableCors({
        origin: process.env.FRONTEND_URL || '*',
        credentials: true,
    });
    app.setGlobalPrefix('api');
    await app.listen(process.env.PORT ?? 8000);
}
async function main() {
    let retries = 0;
    while (retries < 5) {
        try {
            await bootstrap();
            break;
        }
        catch (error) {
            console.error('Erro ao iniciar aplicação:', error);
            retries++;
            await new Promise((resolve) => setTimeout(resolve, 1000));
            if (retries === 5) {
                console.error('Erro após 5 tentativas de inicialização');
                process.exit(1);
            }
        }
    }
}
void main();
//# sourceMappingURL=main.js.map