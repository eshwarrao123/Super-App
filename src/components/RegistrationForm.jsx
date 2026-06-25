import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import FormField from "./FormField";

// ---------- Validation constants ----------
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^\d{10}$/;

const INITIAL_FORM = {
  name: "",
  username: "",
  email: "",
  mobile: "",
};

// ---------- Pure validation function ----------
const validate = (formData) => {
  const errors = {};

  if (!formData.name.trim()) {
    errors.name = "Name is required.";
  }
  if (!formData.username.trim()) {
    errors.username = "Username is required.";
  }
  if (!EMAIL_REGEX.test(formData.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!PHONE_REGEX.test(formData.mobile)) {
    errors.mobile = "Mobile number must be exactly 10 digits.";
  }

  return errors;
};

// ---------- Component ----------
const RegistrationForm = () => {
  const setUser = useStore((state) => state.setUser);
  const navigate = useNavigate();

  const [formData, setFormData] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [shareData, setShareData] = useState(false);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    // Clear the field error as the user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setUser(formData);
    navigate("/categories");
  };

  return (
    <form
      className="reg-form"
      onSubmit={handleSubmit}
      noValidate
      aria-label="Registration form"
    >
      <FormField
        id="name"
        label="Name"
        value={formData.name}
        onChange={handleChange("name")}
        error={errors.name}
        placeholder="Name"
      />

      <FormField
        id="username"
        label="UserName"
        value={formData.username}
        onChange={handleChange("username")}
        error={errors.username}
        placeholder="UserName"
      />

      <FormField
        id="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange("email")}
        error={errors.email}
        placeholder="Email"
      />

      <FormField
        id="mobile"
        label="Mobile"
        type="tel"
        value={formData.mobile}
        onChange={handleChange("mobile")}
        error={errors.mobile}
        placeholder="Mobile"
      />

      <label className="reg-form__checkbox-label">
        <input
          type="checkbox"
          className="reg-form__checkbox"
          checked={shareData}
          onChange={(e) => setShareData(e.target.checked)}
        />
        <span>Share my registration data with Superapp</span>
      </label>

      <button type="submit" className="reg-form__submit">
        SIGN UP
      </button>

      <p className="reg-form__legal">
        By clicking on Sign up, you agree to Superapp{" "}
        <a href="#terms" className="reg-form__link">
          Terms and Conditions of Use
        </a>
      </p>

      <p className="reg-form__legal">
        To learn more about how Superapp collects, uses, shares and protects
        your personal data please head Superapp{" "}
        <a href="#privacy" className="reg-form__link">
          Privacy Policy
        </a>
      </p>
    </form>
  );
};

export default RegistrationForm;
