export default function ErrorMessage({ message, onRetry }) {
  if (!message) return null;
  return (
    <div className="error-banner" role="alert">
      <p>{message}</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="error-banner__retry">
          Try again
        </button>
      )}
    </div>
  );
}
