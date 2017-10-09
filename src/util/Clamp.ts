namespace Phoenix {
  export function clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(value, max))
  }

  export function clamp01(value: number) {
    return clamp(value, 0, 1)
  }

  export function clampMin(value: number, min: number) {
    return Math.max(value, min)
  }
  export function clampMax(value: number, max: number) {
    return Math.min(value, max)
  }
}