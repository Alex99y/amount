export class Amount<const T extends string> {
    private type: T;
    private rawValue: bigint;
    private decimals: number;
    constructor (type: T, rawValue: bigint, decimals: number = 0) {
        this.type = type;
        this.rawValue = rawValue;
        if (decimals < 0 || !Number.isInteger(decimals) || decimals > 18) {
            throw new Error('Decimals must be a non-negative integer between 0 and 18');
        }
        this.decimals = decimals;
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

    public toDecimalString (): string {
        const rawStr = this.rawValue.toString()
        if (this.decimals === 0) {
            return rawStr;
        }
        const isNegative = rawStr.startsWith('-');
        const absRawStr = isNegative ? rawStr.slice(1) : rawStr;

        if(absRawStr.length <= this.decimals) {
            const leadingZeros = '0'.repeat(this.decimals - absRawStr.length);
            return `${isNegative ? '-' : ''}0.${leadingZeros}${absRawStr.replace(/^0+/, '')}`;
        }
        else {
            const fractionalPart = absRawStr.slice(-this.decimals);
            const integerPart = absRawStr.slice(0, absRawStr.length - this.decimals);
            return `${isNegative ? '-' : ''}${integerPart}.${fractionalPart.replace(/^0+/, '')}`;
        }
    }

    public toString (): string {
        return `${this.rawValue.toString()} ${this.type}`;
    }

    static isType<U extends string>(obj: any, type: U): obj is Amount<U> {
        return obj instanceof Amount && obj.getType() === type && typeof obj.getRawValue() === 'bigint';
    }
}
