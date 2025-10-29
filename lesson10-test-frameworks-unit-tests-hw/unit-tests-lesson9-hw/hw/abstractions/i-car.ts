
export interface ICar {
    brand: string;
    model: string;
    speed: number;

    start(): void;
    stop(): void;
    accelerate(): void;
    getInfo(): string;
}
