import { describe, it, expect } from 'vitest'
import { Amount } from './amount.js'

describe('Amount', () => {
    const typeA = 'TypeA' as const
    const typeB = 'TypeB' as const

    it('should create an Amount instance', () => {
        const amount = new Amount(typeA, 100n)
        expect(amount.getType()).toBe(typeA)
        expect(amount.getRawValue()).toBe(100n)
    })

    it('should add two Amounts of the same type', () => {
        const amount1 = new Amount(typeA, 100n)
        const amount2 = new Amount(typeA, 50n)
        const result = amount1.add(amount2)
        expect(result.getType()).toBe(typeA)
        expect(result.getRawValue()).toBe(150n)
    })

    it('should throw an error when adding Amounts of different types', () => {
        const amount1 = new Amount(typeA, 100n)
        const amount2 = new Amount(typeB, 50n)
        expect(() => amount1.add(amount2 as any)).toThrow('Cannot add amounts of different types')
    })

    it('should correctly identify the type using isType', () => {
        const amount = new Amount(typeA, 100n)
        expect(Amount.isType(amount, typeA)).toBe(true)
        expect(Amount.isType(amount, typeB)).toBe(false)
        expect(Amount.isType({}, typeA)).toBe(false)
    })

    it('should check equality correctly', () => {
        const amount1 = new Amount(typeA, 100n)
        const amount2 = new Amount(typeA, 100n)
        const amount3 = new Amount(typeA, 50n)
        const amount4 = new Amount(typeB, 100n)
        expect(amount1.equals(amount2)).toBe(true)
        expect(amount1.equals(amount3)).toBe(false)
        expect(amount1.equals(amount4 as any)).toBe(false)
    })

    it('should check if the amount is zero, positive, or negative', () => {
        const zeroAmount = new Amount(typeA, 0n)
        const positiveAmount = new Amount(typeA, 100n)
        const negativeAmount = new Amount(typeA, -100n)
        expect(zeroAmount.isZero()).toBe(true)
        expect(zeroAmount.isPositive()).toBe(false)
        expect(zeroAmount.isNegative()).toBe(false)
        expect(positiveAmount.isZero()).toBe(false)
        expect(positiveAmount.isPositive()).toBe(true)
        expect(positiveAmount.isNegative()).toBe(false)
        expect(negativeAmount.isZero()).toBe(false)
        expect(negativeAmount.isPositive()).toBe(false)
        expect(negativeAmount.isNegative()).toBe(true)
    })

    it('should convert to string correctly', () => {
        const amount = new Amount(typeA, 100n)
        expect(amount.toString()).toBe('100 TypeA')
    })

    it('should subtract two Amounts of the same type', () => {
        const amount1 = new Amount(typeA, 100n)
        const amount2 = new Amount(typeA, 50n)
        const result = amount1.minus(amount2)
        expect(result.getType()).toBe(typeA)
        expect(result.getRawValue()).toBe(50n)
    })

    it('should throw an error when subtracting Amounts of different types', () => {
        const amount1 = new Amount(typeA, 100n)
        const amount2 = new Amount(typeB, 50n)
        expect(() => amount1.minus(amount2 as any)).toThrow('Cannot subtract amounts of different types')
    })

    it('should divide two Amounts of the same type', () => {
        const amount1 = new Amount(typeA, 100n)
        const amount2 = new Amount(typeA, 25n)
        const result = amount1.div(amount2)
        expect(result).toBe(4n)
    })

    it('should throw an error when dividing Amounts of different types', () => {
        const amount1 = new Amount(typeA, 100n)
        const amount2 = new Amount(typeB, 25n)
        expect(() => amount1.div(amount2 as any)).toThrow('Cannot divide amounts of different types')
    })

    it('should multiply two Amounts of the same type', () => {
        const amount1 = new Amount(typeA, 10n)
        const amount2 = new Amount(typeA, 5n)
        const result = amount1.multiply(amount2)
        expect(result.getType()).toBe(typeA)
        expect(result.getRawValue()).toBe(50n)
    })

    it('should throw an error when multiplying Amounts of different types', () => {
        const amount1 = new Amount(typeA, 10n)
        const amount2 = new Amount(typeB, 5n)
        expect(() => amount1.multiply(amount2 as any)).toThrow('Cannot multiply amounts of different types')
    })

    describe('toDecimalString', () => {
        it('should convert to decimal string correctly with default decimals', () => {
            const amount = new Amount(typeA, 123456n, 2)
            expect(amount.toDecimalString()).toBe('1234.56')
        })

        it('should convert to decimal string correctly with custom decimals', () => {
            const amount = new Amount(typeA, 123456n, 4)
            expect(amount.toDecimalString()).toBe('12.3456')
        })

        it('should handle negative values correctly', () => {
            const amount = new Amount(typeA, -123456n)
            expect(amount.toDecimalString()).toBe('-123456')
        })

        it('should handle zero correctly', () => {
            const amount = new Amount(typeA, 0n)
            expect(amount.toDecimalString()).toBe('0')
        })

        it('should handle small values correctly', () => {
            const amount = new Amount(typeA, 5n, 3)
            expect(amount.toDecimalString()).toBe('0.005')
        })

        it('should handle values smaller than one unit correctly', () => {
            const amount = new Amount(typeA, 50n, 2)
            expect(amount.toDecimalString()).toBe('0.50')
        })

        it('should handle large values correctly', () => {
            const amount = new Amount(typeA, 12345678901234567890n, 8)
            expect(amount.toDecimalString()).toBe('123456789012.34567890')
        })

        it('should handle zero decimals correctly', () => {
            const amount = new Amount(typeA, 123456n, 0)
            expect(amount.toDecimalString()).toBe('123456')
        })

        it('should handle very large decimals correctly', () => {
            const amount = new Amount(typeA, 1n, 18)
            expect(amount.toDecimalString()).toBe('0.000000000000000001')
        })

        it('should throw an error for invalid decimals', () => {
            expect(() => new Amount(typeA, 100n, -1)).toThrow('Decimals must be a non-negative integer between 0 and 18')
            expect(() => new Amount(typeA, 100n, 19)).toThrow('Decimals must be a non-negative integer between 0 and 18')
            expect(() => new Amount(typeA, 100n, 2.5)).toThrow('Decimals must be a non-negative integer between 0 and 18')
        })
    })
    
    describe('fromDecimal', () => {
        it('should create Amount from decimal string correctly with default decimals', () => {
            const amount = Amount.fromDecimal(typeA, '1234.56', 2)
            expect(amount.getRawValue()).toBe(123456n)
        })

        it('should create Amount from decimal string correctly with custom decimals', () => {
            const amount = Amount.fromDecimal(typeA, '12.3456', 4)
            expect(amount.getRawValue()).toBe(123456n)
        })

        it('should handle negative values correctly', () => {
            const amount = Amount.fromDecimal(typeA, '-1234.56', 2)
            expect(amount.getRawValue()).toBe(-123456n)
        })

        it('should handle zero correctly', () => {
            const amount = Amount.fromDecimal(typeA, '0', 2)
            expect(amount.getRawValue()).toBe(0n)
        })

        it('should handle small values correctly', () => {
            const amount = Amount.fromDecimal(typeA, '0.005', 3)
            expect(amount.getRawValue()).toBe(5n)
        })

        it('should handle values smaller than one unit correctly', () => {
            const amount = Amount.fromDecimal(typeA, '0.5', 2)
            expect(amount.getRawValue()).toBe(50n)
        })

        it('should handle large values correctly', () => {
            const amount = Amount.fromDecimal(typeA, '123456789012.34567890', 8)
            expect(amount.getRawValue()).toBe(12345678901234567890n)
        })

        it('should handle zero decimals correctly', () => {
            const amount = Amount.fromDecimal(typeA, '123456', 2)
            expect(amount.getRawValue()).toBe(12345600n)
        })

        it('should handle very large decimals correctly', () => {
            const amount = Amount.fromDecimal(typeA, '0.000000000000000001', 18)
            expect(amount.getRawValue()).toBe(1n)
        })

        it('should handle small values correctly', () => {
            const amount = Amount.fromDecimal(typeA, '0.005', 10)
            expect(amount.getRawValue()).toBe(50000000n)
        })

        it('should throw an error for invalid decimal strings', () => {
            expect(() => Amount.fromDecimal(typeA, 'abc', 2)).toThrow('Invalid decimal string format')
            expect(() => Amount.fromDecimal(typeA, '12.34.56', 2)).toThrow('Invalid decimal string format')
            expect(() => Amount.fromDecimal(typeA, '', 2)).toThrow('Invalid decimal string format')
        })

        it('should throw an error for invalid decimals', () => {
            expect(() => Amount.fromDecimal(typeA, '123.45', -1)).toThrow('Decimals must be a non-negative integer between 0 and 18')
            expect(() => Amount.fromDecimal(typeA, '123.45', 19)).toThrow('Decimals must be a non-negative integer between 0 and 18')
            expect(() => Amount.fromDecimal(typeA, '123.45', 2.5)).toThrow('Decimals must be a non-negative integer between 0 and 18')
        })
    })
})