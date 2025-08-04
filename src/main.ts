import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { default as helmet } from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  // Global prefix
  app.setGlobalPrefix('api');

  // Segurança
  app.use(helmet());
  app.enableCors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true,
  });

  // Documentação
  const config = new DocumentBuilder()
    .setTitle('Clinicapsi API')
    .setDescription('Documentação da API do Clinicapsi')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

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
