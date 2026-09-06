import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchPublicBatch } from '../api/batches.js'

/**
 * Reads `id` from the URL query string (?id=BAT_xxx) and fetches the
 * corresponding public batch bundle.
 *
 * Returns:
 *   - status: 'missing_id' | 'loading' | 'not_found' | 'company_unavailable' | 'error' | 'success'
 *   - data: the batch bundle (only set when status === 'success')
 *   - errorMessage: human-readable message (only set when status === 'error')
 *
 * P0-3: 'company_unavailable' is a distinct outcome from 'not_found' - it
 * fires when the API's error code is "COMPANY_UNAVAILABLE" (an archived
 * company), so the consumer-facing page can show the specific
 * "no longer available" message rather than the generic invalid-code text.
 */
export function useBatchLookup() {
  const [searchParams] = useSearchParams()
  const batchId = searchParams.get('id')

  const [status, setStatus] = useState(batchId ? 'loading' : 'missing_id')
  const [data, setData] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    if (!batchId) {
      setStatus('missing_id')
      setData(null)
      return
    }

    let cancelled = false
    setStatus('loading')
    setData(null)
    setErrorMessage(null)

    fetchPublicBatch(batchId)
      .then((result) => {
        if (cancelled) return
        setData(result)
        setStatus('success')
      })
      .catch((err) => {
        if (cancelled) return
        if (err.status === 404 && err.code === 'COMPANY_UNAVAILABLE') {
          setStatus('company_unavailable')
        } else if (err.status === 404) {
          setStatus('not_found')
        } else {
          setStatus('error')
          setErrorMessage(err.message)
        }
      })

    return () => {
      cancelled = true
    }
  }, [batchId])

  return { batchId, status, data, errorMessage }
}
