import illustrationSrc from "../assets/page1pic.png";
import RegistrationForm from "../components/RegistrationForm";
import "./Register.css";

/**
 * Register page
 *
 * Layout responsibility only — the two-column split between
 * the left illustration panel and the right form panel.
 * All form logic lives in RegistrationForm.
 */
const Register = () => {
  return (
    <main className="register-page">
      {/* Left — illustration panel */}
      <section className="register-page__left" aria-hidden="true">
        <img
          src={illustrationSrc}
          alt=""
          className="register-page__illustration"
        />
        <p className="register-page__tagline">
          Discover new things on Superapp
        </p>
      </section>

      {/* Right — form panel */}
      <section className="register-page__right" aria-label="Registration">
        <div className="register-page__content">
          <h1 className="register-page__title">Super app</h1>
          <p className="register-page__subtitle">Create your new account</p>
          <RegistrationForm />
        </div>
      </section>
    </main>
  );
};

export default Register;