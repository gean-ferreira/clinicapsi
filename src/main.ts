import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { default as helmet } from 'helmet';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  // Segurança
  app.use(helmet());
  app.enableCors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true,
  });

  // Global prefix
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT ?? 8000);
}

// Retry na inicialização do Nest
async function main(): Promise<void> {
  let retries = 0;
  while (retries < 5) {
    try {
      await bootstrap();
      break;
    } catch (error) {
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
