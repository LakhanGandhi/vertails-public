function PlantInfo({ plant, plantInactive }) {
  if (!plant) return null

  const addressParts = [plant.address, plant.city, plant.state, plant.country, plant.pinCode].filter(Boolean)

  return (
    <section className="section">
      <p className="field-label">Manufactured At</p>
      <p style={{ margin: '0 0 0.3rem', fontWeight: 600 }}>{plant.name}</p>
      {addressParts.length > 0 && (
        <p style={{ margin: '0 0 0.5rem', color: 'var(--muted)', fontSize: '0.9rem' }}>
          {addressParts.join(', ')}
        </p>
      )}
      {plant.fssaiLicense && (
        <dl className="field-grid">
          <dt>FSSAI License</dt>
          <dd>{plant.fssaiLicense}</dd>
        </dl>
      )}
      {plantInactive && (
        <p className="inactive-note">
          <span aria-hidden="true">ⓘ</span>
          <span>Manufacturing plant currently inactive</span>
        </p>
      )}
    </section>
  )
}

export default PlantInfo
