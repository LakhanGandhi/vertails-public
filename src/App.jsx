import { useBatchLookup } from './hooks/useBatchLookup.js'
import StatusBanner from './components/StatusBanner.jsx'
import ProductInfo from './components/ProductInfo.jsx'
import BatchInfo from './components/BatchInfo.jsx'
import PlantInfo from './components/PlantInfo.jsx'
import CompanyInfo from './components/CompanyInfo.jsx'
import logoMark from './assets/logo-mark.png'

function Header() {
  return (
    <div className="passport-header">
      <div className="passport-wordmark-row">
        <img src={logoMark} alt="" className="passport-logo-mark" />
        <div>
          <p className="passport-wordmark">Vertails</p>
          <p className="passport-tagline">Digital Product Passport</p>
        </div>
      </div>
    </div>
  )
}

function Shell({ children }) {
  return (
    <div className="passport-page">
      <div className="passport-card">{children}</div>
    </div>
  )
}

function App() {
  const { batchId, status, data, errorMessage } = useBatchLookup()

  if (status === 'missing_id') {
    return (
      <Shell>
        <Header />
        <p>No product code found in this link. Please rescan the QR code on the package.</p>
      </Shell>
    )
  }

  if (status === 'loading') {
    return (
      <Shell>
        <Header />
        <p style={{ color: 'var(--muted)' }}>Loading product info…</p>
      </Shell>
    )
  }

  if (status === 'not_found') {
    return (
      <Shell>
        <Header />
        <p>We couldn't find a product for code <span className="mrz-strip" style={{ display: 'inline-block', margin: '0.5rem 0' }}>{batchId}</span></p>
        <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>It may be invalid, or the product has been removed.</p>
      </Shell>
    )
  }

  if (status === 'error') {
    return (
      <Shell>
        <Header />
        <p>Something went wrong loading this product{errorMessage ? `: ${errorMessage}` : '.'}</p>
      </Shell>
    )
  }

  // status === 'success'
  return (
    <Shell>
      <Header />
      <StatusBanner recalled={data.batch?.recalled} expiryStatus={data.batch?.expiryStatus} />
      <hr className="section-divider" />
      <ProductInfo product={data} />
      <hr className="section-divider" />
      <BatchInfo batch={data.batch} />
      <PlantInfo plant={data.plant} />
      <CompanyInfo company={data.company} />
    </Shell>
  )
}

export default App
