import { Injectable } from '@nestjs/common'

@Injectable()
export class ThirdService {
    useClass() {
        return ''
    }

    useFactory() {
        return 'constructor provider 2'
    }
}
