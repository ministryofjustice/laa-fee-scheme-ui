import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button
      className="govuk-button govuk-button--secondary"
      data-module="govuk-button"
      onClick={() => navigate(-1)}
    >
      Back
    </button>
  );
};

export default BackButton;
