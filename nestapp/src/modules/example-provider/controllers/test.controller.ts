import { Controller, Get, Inject } from '@nestjs/common'

import { FirstService } from '../services/first.service'
import { FourthService } from '../services/fourth.service'
import { SecondService } from '../services/second.service'

@Controller('test')
export class TestController {
    constructor(
        private first: FirstService,
        @Inject('ID-EXAMPLE') private idExp: FirstService,
        @Inject('FACTORY-EXAMPLE') private ftExp: FourthService,
        @Inject('ALIAS-EXAMPLE') private asExp: FirstService,
        @Inject('ASYNC-EXAMPLE') private acExp: SecondService,
    ) {}

    @Get('value')
    async useValue() {
        return this.first.useValue()
    }

    @Get('alias2')
    async useAlias2() {
        return this.first.useAlias()
    }

    @Get('id')
    async useId() {
        return this.idExp.useId()
    }

    @Get('id_alias')
    async id_useAlias() {
        return this.idExp.useAlias()
    }

    @Get('factory')
    async useFactory() {
        return this.ftExp.getContent()
    }

    @Get('alias')
    async useAlias() {
        return this.asExp.useAlias()
    }

    @Get('async')
    async useAsync() {
        return this.acExp.useAsync()
    }
}
