import { reduceByKey } from 'type-plus'

export function reduceFlatMessage(s: Record<string, string[]>) {
  return reduceByKey(s, (p, code, i, a, s) => {
    const messages = s[code]
    messages.forEach((message, i) => p.push({ key: i === 0 ? code : `${code}-${i}`, message }))
    return p
  }, [] as Array<{ key: string, message: string }>)
}
