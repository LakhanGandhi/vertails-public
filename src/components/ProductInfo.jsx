function ProductInfo({ product }) {
  const {
    name,
    brand,
    category,
    description,
    countryOfOrigin,
    storageCondition,
    images,
    ingredients = [],
    nutritionPer100g,
    allergens = [],
    certifications = [],
    brandInactive,
    productDiscontinued,
  } = product

  const imageList = Object.values(images || {}).filter(Boolean)

  return (
    <section className="section">
      {productDiscontinued && (
        <div className="discontinued-banner">
          <span aria-hidden="true">ⓘ</span>
          <span>This product has been discontinued and is no longer manufactured.</span>
        </div>
      )}

      <p className="product-name">{name}</p>
      {brand && (
        <p className="product-subline">
          {brand}{category ? ` · ${category}` : ''}
        </p>
      )}
      {brandInactive && (
        <p className="inactive-note">
          <span aria-hidden="true">ⓘ</span>
          <span>Brand currently inactive</span>
        </p>
      )}

      {description && <p style={{ margin: '0 0 1rem' }}>{description}</p>}

      {imageList.length > 0 && (
        <div className="image-row">
          {imageList.map((src, i) => (
            <img key={i} src={src} alt={`${name} ${i + 1}`} />
          ))}
        </div>
      )}

      {(countryOfOrigin || storageCondition) && (
        <dl className="field-grid" style={{ marginBottom: '1.25rem' }}>
          {countryOfOrigin && (
            <>
              <dt>Origin</dt>
              <dd>{countryOfOrigin}</dd>
            </>
          )}
          {storageCondition && (
            <>
              <dt>Storage</dt>
              <dd>{storageCondition}</dd>
            </>
          )}
        </dl>
      )}

      {ingredients.length > 0 && (
        <div style={{ marginBottom: '1.25rem' }}>
          <p className="field-label">Ingredients</p>
          <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: 1.55 }}>{ingredients.join(', ')}</p>
        </div>
      )}

      {allergens.length > 0 && (
        <div style={{ marginBottom: '1.25rem' }}>
          <p className="field-label">Allergens</p>
          <div className="pill-row">
            {allergens.map((a) => (
              <span key={a} className="pill pill--danger">{a}</span>
            ))}
          </div>
        </div>
      )}

      {certifications.length > 0 && (
        <div style={{ marginBottom: '1.25rem' }}>
          <p className="field-label">Certifications</p>
          <div className="pill-row">
            {certifications.map((c) => (
              <span key={c} className="pill pill--safe">{c}</span>
            ))}
          </div>
        </div>
      )}

      {nutritionPer100g && Object.keys(nutritionPer100g).length > 0 && (
        <div>
          <p className="field-label">Nutrition (per 100g)</p>
          <table className="nutrition-table">
            <tbody>
              {Object.entries(nutritionPer100g).map(([key, value]) => (
                <tr key={key}>
                  <td>{key.replace(/([A-Z])/g, ' $1')}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default ProductInfo
