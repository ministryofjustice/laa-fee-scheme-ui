const ContinueButton = ({children, disabled = false, onClick, ...props}) => {
  return (
    <button
      className="govuk-button"
      data-module="govuk-button"
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default ContinueButton;
