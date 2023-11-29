import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ContentModule } from './modules/content/content.modules'
import { ExampleProviderModule } from './modules/example-provider/example-provider.module'

@Module({
    imports: [ContentModule, ExampleProviderModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
