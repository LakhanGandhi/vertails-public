const SEAL_TEXT = {
  safe: ['SAFE', 'TO', 'CONSUME'],
  near_expiry: ['NEAR', 'EXPIRY'],
  expired: ['EXPIRED'],
}

const SEAL_CLASS = {
  safe: 'seal seal--safe',
  near_expiry: 'seal seal--warn',
  expired: 'seal seal--danger',
}

/**
 * Recall warning + company-suspended warning + verification seal. The seal
 * is the page's signature element — it doubles as the expiry-status
 * indicator, color-coded to match. Recall and company-suspended render
 * separately, above the seal, in that priority order — see the severity
 * hierarchy in PROJECT_STATE.md (Known gap #18): recalled > companySuspended
 * > expired > near_expiry.
 */
function StatusBanner({ recalled, companySuspended, expiryStatus }) {
  const key = expiryStatus?.key || 'safe'
  const lines = SEAL_TEXT[key] || [expiryStatus?.label || '—']
  const hasTopBanner = recalled || companySuspended

  return (
    <div className="section" style={{ marginBottom: hasTopBanner ? '1.25rem' : '1.75rem' }}>
      {recalled && (
        <div className="recall-banner" role="alert">
          <span aria-hidden="true">⚠</span>
          <span>This batch has been recalled. Do not consume this product.</span>
        </div>
      )}

      {companySuspended && (
        <div className="suspended-banner" role="alert">
          <span aria-hidden="true">⚠</span>
          <span>This company is currently suspended on Vertails.</span>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem' }}>
        <div className={SEAL_CLASS[key] || 'seal seal--safe'} aria-hidden="true">
          <span className="seal-text">
            {lines.map((line, i) => (
              <span key={i}>
                {line}
                <br />
              </span>
            ))}
          </span>
        </div>
        <div>
          <p className="field-label" style={{ marginBottom: '0.15rem' }}>Status</p>
          <p style={{ margin: 0, fontWeight: 600 }}>
            {expiryStatus?.label || 'Unknown'}
            {typeof expiryStatus?.daysLeft === 'number' && key !== 'expired' && (
              <span style={{ color: 'var(--muted)', fontWeight: 400 }}>
                {' '}· {expiryStatus.daysLeft} day{expiryStatus.daysLeft === 1 ? '' : 's'} left
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}

export default StatusBanner
