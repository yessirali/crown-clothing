import "./form-input-style.scss";

const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className="group">
      {/* we have put this input here so that our shrink mixin works */}
      <input className="form-input" {...otherProps} />
      {/* If label exists then show this label */}
      {label && (
        <label
          className={`${
            /* If the length value is more than 0, append the srhink classs */
            otherProps.value.length ? "shrink" : ""
          }form-input-label`}
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default FormInput;
