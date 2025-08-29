# Amount

A simple TypeScript library for representing and manipulating typed amounts using arbitrary precision integers (`bigint`).  
Supports arithmetic operations, type safety, decimal conversion, and equality checks for values such as currencies, tokens, or units.


# Usage

```typescript
// Example usage of Amount

import { Amount } from './amount.js'

const usd = new Amount('USD', 100n)
const eur = new Amount('EUR', 50n)

console.log(usd.toString()) // "100 USD"
console.log(eur.toString()) // "50 EUR"

// Add two amounts of the same type
const moreUsd = new Amount('USD', 25n)
const totalUsd = usd.add(moreUsd)
console.log(totalUsd.toString()) // "125 USD"

// Check equality
console.log(usd.equals(totalUsd)) // false

// Check if amount is positive
console.log(usd.isPositive()) // true

// Subtract amounts
const diffUsd = totalUsd.minus(usd)
console.log(diffUsd.toString()) // "25 USD"
```
