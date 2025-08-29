export class Amount<const T extends string> {
    private type: T;
    private rawValue: bigint;
    constructor (type: T, rawValue: bigint) {
        this.type = type;
        this.rawValue = rawValue;
    }

    public getType (): T {
        return this.type;
    }

    public getRawValue (): bigint {
        return this.rawValue;
    }

    public add (other: Amount<T>): Amount<T> {
        if (this.type !== other.type) {
            throw new Error('Cannot add amounts of different types');
        }
        return new Amount<T>(this.type, this.rawValue + other.rawValue);
    }

    public minus (other: Amount<T>): Amount<T> {
        if (this.type !== other.type) {
            throw new Error('Cannot subtract amounts of different types');
        }
        return new Amount<T>(this.type, this.rawValue - other.rawValue);
    }

    public div (other: Amount<T>): bigint {
        if (this.type !== other.type) {
            throw new Error('Cannot divide amounts of different types');
        }
        return this.rawValue / other.rawValue;
    }

    public multiply (other: Amount<T>): Amount<T> {
        if (this.type !== other.type) {
            throw new Error('Cannot multiply amounts of different types');
        }
        return new Amount<T>(this.type, this.rawValue * other.rawValue);
    }

    public equals (other: Amount<T>): boolean {
        return this.type === other.type && this.rawValue === other.rawValue;
    }

    public isZero (): boolean {
        return this.rawValue === 0n;
    }

    public isPositive (): boolean {
        return this.rawValue > 0n;
    }

    public isNegative (): boolean {
        return this.rawValue < 0n;
    }

    public toString (): string {
        return `${this.rawValue.toString()} ${this.type}`;
    }

    static isType<U extends string>(obj: any, type: U): obj is Amount<U> {
        return obj instanceof Amount && obj.getType() === type && typeof obj.getRawValue() === 'bigint';
    }
}
