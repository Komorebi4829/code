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
        .build()
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('docs', app, document)

    await app.listen(5000, '127.0.0.1', () => {
        console.log('api: http://localhost:5000')
    })
}
bootstrap()
