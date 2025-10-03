import { NavLink } from "react-router";

const Header = () => {
  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Лого */}{" "}
        <div className="text-2xl font-bold text-brand-dark cursor-pointer">
          Aralchi{" "}
        </div>
        {/* Навигация */}
        <nav className="flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `font-medium transition-colors ${
                isActive
                  ? "text-brand border-b-2 border-brand-light pb-1"
                  : "text-gray-600 hover:text-green-500"
              }`
            }
          >
            Главная
          </NavLink>

          <NavLink
            to="/leaderboards"
            className={({ isActive }) =>
              `font-medium transition-colors ${
                isActive
                  ? "text-green-600 border-b-2 border-green-600 pb-1"
                  : "text-gray-600 hover:text-green-500"
              }`
            }
          >
            LeaderBoards
          </NavLink>

          <NavLink
            to="/statistics"
            className={({ isActive }) =>
              `font-medium transition-colors ${
                isActive
                  ? "text-green-600 border-b-2 border-green-600 pb-1"
                  : "text-gray-600 hover:text-green-500"
              }`
            }
          >
            Статистика
          </NavLink>
          <NavLink
            to="/consultations"
            className={({ isActive }) =>
              `font-medium transition-colors ${
                isActive
                  ? "text-green-600 border-b-2 border-green-600 pb-1"
                  : "text-gray-600 hover:text-green-500"
              }`
            }
          >
            Консультация
          </NavLink>

          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `font-medium transition-colors ${
                isActive
                  ? "text-green-600 border-b-2 border-green-600 pb-1"
                  : "text-gray-600 hover:text-green-500"
              }`
            }
          >
            Профиль
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;
