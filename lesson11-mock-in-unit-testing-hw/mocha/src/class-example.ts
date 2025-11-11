export class ClassExample {
    public name: string;
    public age: number;

    public get hiddenProperty(): string {
        return this._hiddenProperty;
    }

    public set hiddenProperty(value: string) {
        this._hiddenProperty = value;
    }

    private _hiddenProperty: string;
    public constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
        this._hiddenProperty = '';
    }

    public sayHello(): string {
        return `Hello ${this.name}`;
    }

    public sayAge = (): string => {
        return `I am ${this.age} years old`;
    };

    public sayFullInfo(): string {
        return `${this.sayHello()} and ${this.sayAge()}`;
    }

    public sayAgeWithArg = (age: number): string => {
        return `I am ${age} years old`;
    };
}
