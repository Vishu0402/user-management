import { useState } from 'react';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Name is required.';
  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }
  if (!values.phone.trim()) errors.phone = 'Phone is required.';
  return errors;
}

/**
 * Shared by CreateUser and EditUser. The parent owns what happens
 * on submit (create vs update); this component only owns form state
 * and validation.
 */
export default function UserForm({ initialValues, submitLabel, onSubmit, submitting }) {
  const [values, setValues] = useState({
    name: initialValues?.name || '',
    email: initialValues?.email || '',
    phone: initialValues?.phone || '',
    company: initialValues?.company?.name || initialValues?.company || '',
  });
  const [errors, setErrors] = useState({});

  function handleChange(field, value) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    onSubmit(values);
  }

  return (
    <form className="user-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="name">Name *</label>
        <input
          id="name"
          value={values.name}
          onChange={(e) => handleChange('name', e.target.value)}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p className="field__error" id="name-error">
            {errors.name}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="email">Email *</label>
        <input
          id="email"
          type="email"
          value={values.email}
          onChange={(e) => handleChange('email', e.target.value)}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p className="field__error" id="email-error">
            {errors.email}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="phone">Phone *</label>
        <input
          id="phone"
          value={values.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? 'phone-error' : undefined}
        />
        {errors.phone && (
          <p className="field__error" id="phone-error">
            {errors.phone}
          </p>
        )}
      </div>

      <div className="field">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          value={values.company}
          onChange={(e) => handleChange('company', e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn--primary" disabled={submitting}>
        {submitting ? 'Saving…' : submitLabel}
      </button>
    </form>
  );
}
