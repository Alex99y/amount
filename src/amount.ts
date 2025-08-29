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

    static isType<U extends string>(obj: any, type: U): obj is Amount<U> {
        return obj instanceof Amount && obj.getType() === type;
    }
}
