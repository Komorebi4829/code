import { Inject, Injectable, forwardRef } from '@nestjs/common'

import { FifthService } from './fifth.service'

@Injectable()
export class SixthService {
    constructor(
        @Inject(forwardRef(() => FifthService))
        protected fifth: WrapperType<FifthService>,
    ) {}

    circular() {
        return `circular dependency2  + ${this.fifth.circular()}`
    }
}
