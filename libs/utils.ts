import type { ReadonlyURLSearchParams } from 'next/navigation'

// https://nextjs.org/docs/app/api-reference/functions/use-search-params#examples
export function createQueryString(params: ReadonlyURLSearchParams, name: string, value: string) {
  const param = new URLSearchParams(params.toString())
  if (value.length === 0)
    param.delete(name)

  else
    param.set(name, value)

  return new URLSearchParams(param.toString())
}
