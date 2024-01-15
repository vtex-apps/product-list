type FetchWithRetry = (
  url: string,
  retries: number,
  finallyCallback: () => void
) => Promise<PackagesSkuIds>

export const fetchWithRetry: FetchWithRetry = (
  url: string,
  retries: number,
  finallyCallback: () => void
) =>
  fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json()
      }

      if (retries > 0) {
        return fetchWithRetry(url, retries - 1, finallyCallback)
      }

      throw new Error(`Failed to fetch: ${url}`)
    })
    .catch((error) => console.error(error.message))
    .finally(() => {
      finallyCallback()
    })
