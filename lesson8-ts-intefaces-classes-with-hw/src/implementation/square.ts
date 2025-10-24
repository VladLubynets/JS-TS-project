import { AbstractQuadrangle } from '../abstraction/abstract-classes/abstract-quadrangle';
import { IQuadrangle } from '../abstraction/interfaces/quadrangle';

export class Square implements IQuadrangle {
    public a: number;
    public b: number;
    public c: number;
    public d: number;

    public constructor(a: number) {
        this.a = a;
        this.b = a;
        this.c = a;
        this.d = a;
    }

    public getPerimeter(): number {
        return this.a * 4;
    }
    public getArea(): number {
        return this.a * this.a;
    }
}

export class SquareFromAbstract extends AbstractQuadrangle {
    public constructor(a: number) {
        super(a, a, a, a);
    }

    public getArea(): number {
        return (this.a ?? 0) * (this.a ?? 0);
    }
}
