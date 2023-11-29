import { NestFactory } from '@nestjs/core'

import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

import { AppModule } from './app.module'

async function bootstrap() {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
        cors: true,
        logger: ['error', 'warn'],
    })

    app.setGlobalPrefix('api')

    const config = new DocumentBuilder()
        .setTitle('X System')
        .setDescription('The X system API description')
        .setVersion('1.0')
        .addBearerAuth()
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('docs', app, document, { customSiteTitle: 'X System Swagger Documents' })

    await app.listen(5000, '127.0.0.1', async () => {
        console.log(`Application is running on: ${await app.getUrl()}`)
    })
}
bootstrap()
