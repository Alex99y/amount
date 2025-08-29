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
})