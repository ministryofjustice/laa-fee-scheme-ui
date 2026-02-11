const RadioButtonsPanel = ({
  name,
  heading,
  options,
  selectedRadio,
  handleRadioChange,
}) => {
  return (
    <div className="govuk-form-group">
      <fieldset className="govuk-fieldset">
        <legend className="govuk-fieldset__legend govuk-fieldset__legend--l">
          <h2 className="govuk-fieldset__heading">{heading}</h2>
        </legend>
        <div className="govuk-radios" data-module="govuk-radios">
          {options.map((option) => (
            <div key={option.value} className="govuk-radios__item">
              <input
                className="govuk-radios__input"
                id={option.value}
                name={name}
                type="radio"
                value={option.value}
                checked={selectedRadio === option.value}
                onChange={handleRadioChange}
              />
              <label
                className="govuk-label govuk-radios__label"
                htmlFor={option.value}
              >
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
};

export default RadioButtonsPanel;
