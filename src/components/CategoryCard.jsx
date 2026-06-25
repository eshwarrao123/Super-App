/**
 * CategoryCard
 *
 * Displays a single category with its background color, image,
 * label, selected border, and checkmark.
 *
 * Props:
 *   label     {string}   — displayed text
 *   image     {string}   — imported image URL
 *   color     {string}   — card background color
 *   selected  {boolean}  — whether this card is currently chosen
 *   onToggle  {function} — called when card is clicked or Enter/Space pressed
 */
const CategoryCard = ({ label, image, color, selected, onToggle }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onToggle();
    }
  };

  return (
    <div
      className={`cat-card${selected ? " cat-card--selected" : ""}`}
      style={{ backgroundColor: color }}
      onClick={onToggle}
      onKeyDown={handleKeyDown}
      role="checkbox"
      aria-checked={selected}
      aria-label={`${label} category${selected ? ", selected" : ""}`}
      tabIndex={0}
    >
      {/* Selected checkmark badge */}
      {selected && (
        <span className="cat-card__check" aria-hidden="true">✓</span>
      )}

      {/* Label */}
      <span className="cat-card__label">{label}</span>

      {/* Thumbnail image */}
      <div className="cat-card__img-wrap">
        <img
          src={image}
          alt={label}
          className="cat-card__img"
          draggable={false}
        />
      </div>
    </div>
  );
};

export default CategoryCard;
