function slowIsPrime(p) {
  let d = 2
  while (d < p - 1) {
    if (p % d === 0) return false
    d += 1
  }
  return true
}

export function calculateNthPrime(n) {
  let p = 2
  while (n > 1) {
    p += 1
    if (slowIsPrime(p)) n -= 1
  }
  return p
}

export const sizes = [1, 10, 50, 100, 250, 500, 750, 1000]
