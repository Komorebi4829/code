// Class Decorator
const HelloDerorator = <T extends new (...args: any[]) => any>(target: T) => {
  return class extends target {
    newProperty = 'new property'

    hello = 'override'

    sayHello() {
      return this.hello
    }
  }
}

@HelloDerorator
export class Hello {
  [key: string]: any

  hello: string

  constructor() {
    this.hello = 'test'
  }
}

const exp2 = () => {
  console.log('------------------示例2:简单的类装饰器------------------')
  console.log('------------------动态添加一个sayHello方法以及覆盖hello的值------------------')
  console.log()
  const hello = new Hello()
  console.log(hello.sayHello())
  console.log()
  console.log('------------------示例2:执行完毕------------------')
}

exp2()
// 控制台打印 override
