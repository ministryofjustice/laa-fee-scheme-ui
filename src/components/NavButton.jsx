const ContinueButton = ({children, disabled = false, onClick}) => {
  return (
    <button
      className="govuk-button"
      data-module="govuk-button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ContinueButton;
