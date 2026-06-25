/**
 * FormField
 *
 * Reusable labeled input component.
 * Handles the label → input association, error display,
 * and input type switching in one place.
 */
const FormField = ({ id, label, type = "text", value, onChange, error, placeholder }) => {
  return (
    <div className="form-field">
      <label className="form-field__label" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder || label}
        className={`form-field__input${error ? " form-field__input--error" : ""}`}
        autoComplete="off"
      />
      {error && (
        <span className="form-field__error" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};

export default FormField;
