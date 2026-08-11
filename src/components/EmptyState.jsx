export default function EmptyState({ title, hint }) {
  return (
    <div className="empty-state">
      <span className="empty-state__mark" aria-hidden="true">
        —
      </span>
      <p className="empty-state__title">{title}</p>
      {hint && <p className="empty-state__hint">{hint}</p>}
    </div>
  );
}
