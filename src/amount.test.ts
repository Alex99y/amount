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
    
})