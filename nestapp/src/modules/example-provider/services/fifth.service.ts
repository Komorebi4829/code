import { Inject, Injectable, forwardRef } from '@nestjs/common'

import { SixthService } from './sixth.service'

@Injectable()
export class FifthService {
    constructor(
        @Inject(forwardRef(() => SixthService))
        protected sixth: WrapperType<SixthService>,
    ) {}

    circular() {
        return `circular dependency1`
    }
}
