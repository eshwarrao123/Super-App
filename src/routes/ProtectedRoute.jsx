import { Navigate } from "react-router-dom";
import { useStore } from "../store/useStore";

/**
 * ProtectedRoute
 *
 * Wraps a route and enforces the registration flow:
 *
 *   Step 1 — "isRegistered": user object has a non-empty name (set after Register)
 *   Step 2 — "hasCategories": store has at least one selected category (set after Categories)
 *
 * Usage:
 *   <ProtectedRoute require="isRegistered">   → redirect to "/" if not registered
 *   <ProtectedRoute require="hasCategories">  → redirect to "/categories" if no categories
 */
const ProtectedRoute = ({ children, require: requirement }) => {
  const user = useStore((state) => state.user);
  const categories = useStore((state) => state.categories);

  const isRegistered = Boolean(user?.name?.trim());
  const hasCategories = isRegistered && categories.length >= 3;

  if (requirement === "isRegistered" && !isRegistered) {
    return <Navigate to="/" replace />;
  }

  if (requirement === "hasCategories" && !hasCategories) {
    if (!isRegistered) return <Navigate to="/" replace />;
    return <Navigate to="/categories" replace />;
  }

  return children;
};

export default ProtectedRoute;
