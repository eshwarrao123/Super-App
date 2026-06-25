import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
import CategoryCard from "../components/CategoryCard";
import CATEGORIES from "../data/categories";
import "./Categories.css";

const MIN_SELECTIONS = 3;

const Categories = () => {
  const navigate = useNavigate();
  const selectedCategories = useStore((state) => state.categories);
  const setCategories = useStore((state) => state.setCategories);

  const isSelected = (id) => selectedCategories.includes(id);

  const handleToggle = (id) => {
    if (isSelected(id)) {
      setCategories(selectedCategories.filter((c) => c !== id));
    } else {
      setCategories([...selectedCategories, id]);
    }
  };

  const handleRemoveChip = (id) => {
    setCategories(selectedCategories.filter((c) => c !== id));
  };

  const canContinue = selectedCategories.length >= MIN_SELECTIONS;

  const handleContinue = () => {
    if (canContinue) navigate("/dashboard");
  };

  return (
    <main className="cat-page">
      {/* ── Left panel ─────────────────────────────────────────── */}
      <aside className="cat-page__left">
        <p className="cat-page__logo">Super app</p>

        <h1 className="cat-page__heading">
          Choose your<br />
          entertainment<br />
          category
        </h1>

        {/* Selected chips */}
        <div className="cat-page__chips" aria-live="polite" aria-label="Selected categories">
          {selectedCategories.map((id) => {
            const cat = CATEGORIES.find((c) => c.id === id);
            return (
              <span key={id} className="cat-chip">
                {cat?.label}
                <button
                  className="cat-chip__remove"
                  onClick={() => handleRemoveChip(id)}
                  aria-label={`Remove ${cat?.label}`}
                >
                  ×
                </button>
              </span>
            );
          })}
        </div>

        {/* Validation */}
        {!canContinue && selectedCategories.length > 0 && (
          <p className="cat-page__validation" role="alert">
            <span className="cat-page__validation-icon" aria-hidden="true">⚠</span>
            Minimum {MIN_SELECTIONS} category required
          </p>
        )}
        {selectedCategories.length === 0 && (
          <p className="cat-page__hint">
            Select at least {MIN_SELECTIONS} categories to continue
          </p>
        )}
      </aside>

      {/* ── Right panel ────────────────────────────────────────── */}
      <section className="cat-page__right" aria-label="Category grid">
        <div
          className="cat-grid"
          role="group"
          aria-label="Select entertainment categories"
        >
          {CATEGORIES.map((cat) => (
            <CategoryCard
              key={cat.id}
              label={cat.label}
              image={cat.image}
              color={cat.color}
              selected={isSelected(cat.id)}
              onToggle={() => handleToggle(cat.id)}
            />
          ))}
        </div>

        {/* Continue button */}
        <div className="cat-page__footer">
          <button
            className={`cat-page__continue${canContinue ? "" : " cat-page__continue--disabled"}`}
            onClick={handleContinue}
            disabled={!canContinue}
            aria-disabled={!canContinue}
          >
            Next Page
          </button>
        </div>
      </section>
    </main>
  );
};

export default Categories;
