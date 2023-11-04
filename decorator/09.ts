import 'reflect-metadata'

// import { parse, parseDecorator, UserType } from './07'

class Point {
    x: number
    y: number
    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
}

class Line {
    private _p0: Point
    private _p1: Point

    constructor(private _p0: Point, private _p1: Point) {
        this._p0 = _p0
        this._p1 = _p1
    }

    @validate
    // 这句可以省略,因为design:type是预定义属性
    // @Reflect.metadata('design:type', Point)
    set p0(value: Point) {
        this._p0 = value
    }

    get p0() {
        return this._p0
    }

    @validate
    // @Reflect.metadata('design:type', Point)
    set p1(value: Point) {
        this._p1 = value
    }

    get p1() {
        return this._p1
    }
}

function validate<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) {
    const { set } = descriptor
    descriptor.set = function (value: T) {
        const type = Reflect.getMetadata('design:type', target, propertyKey)
        if (!(value instanceof type)) {
            throw new TypeError('Invalid type.')
        }
        set.apply(this, [value])
    }
    return descriptor
}

export const exp910 = () => {
    console.log()
    console.log('-----------------------示例9:基本元元素类型反射-----------------------')
    console.log('-----------------------为访问器的set方法添加类型验证-----------------------')
    console.log()
    const line = new Line()
    const p0 = new Point()
    p0.x = 1
    p0.y = 2
    line.p1 = p0
    console.log(line)
    console.log()
    console.log('-----------------------示例9:执行完毕-----------------------')
}

// 控制台输出: Line { _p1: Point { x: 1, y: 2 } }
