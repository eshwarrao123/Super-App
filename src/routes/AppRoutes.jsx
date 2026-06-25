import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import Register from "../pages/Register";
import Categories from "../pages/Categories";
import Dashboard from "../pages/Dashboard";
import Movies from "../pages/Movies";

/**
 * AppRoutes
 *
 * Route map:
 *   /            → Register          (public)
 *   /categories  → Categories        (requires: isRegistered)
 *   /dashboard   → Dashboard         (requires: hasCategories)
 *   /movies      → Movies            (requires: hasCategories)
 *   *            → redirect to "/"   (catch-all)
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Register />} />

      {/* Requires completed registration */}
      <Route
        path="/categories"
        element={
          <ProtectedRoute require="isRegistered">
            <Categories />
          </ProtectedRoute>
        }
      />

      {/* Requires completed registration AND category selection */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute require="hasCategories">
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/movies"
        element={
          <ProtectedRoute require="hasCategories">
            <Movies />
          </ProtectedRoute>
        }
      />

      {/* Catch-all — redirect unknown paths to registration */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
