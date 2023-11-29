import { Injectable } from '@nestjs/common'

@Injectable()
export class FirstService {
    useValue() {
        return ''
    }

    useId() {
        return 'string provider 1'
    }

    useAlias() {
        return 'alias provider 3'
    }
}
