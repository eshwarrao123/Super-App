import { useStore } from "../store/useStore";
import CATEGORIES from "../data/categories";
import avatarImg from "../assets/page3boy.png";

const ProfileCard = () => {
  const user = useStore((state) => state.user);
  const selectedCategories = useStore((state) => state.categories);

  // Map selected category IDs back to their labels
  const selectedLabels = CATEGORIES.filter((cat) =>
    selectedCategories.includes(cat.id)
  ).map((cat) => cat.label);

  return (
    <div className="profile-card">
      <div className="profile-card__avatar-col">
        <div className="profile-card__avatar-wrap">
          <img
            src={avatarImg}
            alt="User avatar"
            className="profile-card__avatar"
          />
        </div>
      </div>

      <div className="profile-card__info">
        <p className="profile-card__name">{user.name || "Your Name"}</p>
        <p className="profile-card__email">{user.email || "your@email.com"}</p>
        <p className="profile-card__username">
          {user.username || "username"}
        </p>

        <div className="profile-card__chips">
          {selectedLabels.length > 0 ? (
            selectedLabels.map((label) => (
              <span key={label} className="profile-card__chip">
                {label}
              </span>
            ))
          ) : (
            <span className="profile-card__chip">No categories selected</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
