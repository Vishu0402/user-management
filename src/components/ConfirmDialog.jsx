export default function ConfirmDialog({ open, title, body, onConfirm, onCancel, busy }) {
  if (!open) return null;
  return (
    <div className="dialog-overlay" role="presentation" onClick={onCancel}>
      <div
        className="dialog"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        onClick={(e) => e.stopPropagation()}
      >
        <p id="dialog-title" className="dialog__title">
          {title}
        </p>
        <p className="dialog__body">{body}</p>
        <div className="dialog__actions">
          <button type="button" className="btn btn--ghost" onClick={onCancel} disabled={busy}>
            Cancel
          </button>
          <button type="button" className="btn btn--danger" onClick={onConfirm} disabled={busy}>
            {busy ? 'Removing…' : 'Remove user'}
          </button>
        </div>
      </div>
    </div>
  );
}
