export abstract class AbstractQuadrangle {
    public static qname = 'quadrangle';
    public a?: number = undefined;
    public b: number;
    public c: number;
    public d: number;

    public constructor(a: number, b: number, c: number, d: number) {
        if (Object.values(arguments).every((value) => value > 0)) {
            throw new Error('All arguments must be greater than 0');
        }

        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
    }

    public getPerimeter(): number {
        return this.a ?? 0 + this.b + this.c + this.d;
    }

    public abstract getArea(): number;
}
