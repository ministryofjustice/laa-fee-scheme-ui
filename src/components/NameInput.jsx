export default function NameInput() {
  return (
    <div className="govuk-form-group">
      <label className="govuk-label" htmlFor="name">
        Full name
      </label>
      <input
        className="govuk-input"
        id="name"
        name="name"
        type="text"
      />
    </div>
  )
}
