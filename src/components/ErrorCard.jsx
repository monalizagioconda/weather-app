import './ErrorCard.css'

const ErrorCard = ({ children }) => {
  return (
    <div className="error-card">
      <p className="error">{children}</p>
    </div>
  );
};

export default ErrorCard;
