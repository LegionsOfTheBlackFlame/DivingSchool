export async function fetchJson(url, options) {
  const res = await fetch(url, options)

  const contentType = res.headers.get('content-type')

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} when fetching ${url}`)
  }

  if (!contentType || !contentType.includes('application/json')) {
    const text = await res.text()
    throw new Error(
      `Expected JSON from ${url}, got:\n${text.slice(0, 200)}`
    )
  }

  return res.json()
}
