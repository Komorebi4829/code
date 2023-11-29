import { Injectable } from '@nestjs/common'

@Injectable()
export class SecondService {
    useClass() {
        return ''
    }

    useFactory() {
        return 'constructor provider 1'
    }

    useAsync() {
        return 'async provider 1'
    }
}
