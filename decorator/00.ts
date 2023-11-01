type DecoratorFunc = (
    target: any,
    key: string,
    descriptor: PropertyDescriptor | undefined,
) => void;

const createDecorator =
    (decorator: DecoratorFunc) => (Model: any, key: string) => {
        const target = Model.prototype;
        const descriptor = Object.getOwnPropertyDescriptor(target, key);
        decorator(target, key, descriptor);
    };

const logger: DecoratorFunc = (target, key, descriptor) =>
    Object.defineProperty(target, key, {
        ...descriptor,
        value: async (...args: any[]) => {
            try {
                return descriptor!.value.apply(this, args);
            } finally {
                const now = new Date().valueOf();
                console.log(`lasted logged in ${now}`);
            }
        },
    });

class User {
    async login() {
        console.log('login success');
        await new Promise((resolve) => {
            setTimeout(resolve, 100);
        });
    }
}

export const exp1 = () => {
    const loggerDecorator = createDecorator(logger);
    loggerDecorator(User, 'login');
    const user = new User();
    user.login();
};

exp1()
// 控制台输出
// login success
// 停顿100ms
// lasted logged in 1571771681793