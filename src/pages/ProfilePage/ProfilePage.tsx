// src/pages/ProfilePage.tsx

import { useState } from "react";
import { ShieldCheck, LogOut, Bell, Moon, Sun } from "lucide-react";

// --- ДАННЫЕ ПОЛЬЗОВАТЕЛЯ (временно здесь, потом будут приходить из API) ---
const mockUser = {
  name: "Ali Valiev",
  email: "ali.v@example.com",
  joinDate: "Сентябрь 2025",
  // Установим null, чтобы сработала логика автоматической генерации аватара
  avatarUrl: null,
  stats: {
    tasksCompleted: 142,
    currentStreak: 12, // 12 дней подряд
    points: 1350,
  },
  settings: {
    emailNotifications: true,
    darkMode: false,
  },
};

const ProfilePage = () => {
  const [user, setUser] = useState(mockUser);
  const [settings, setSettings] = useState(user.settings);

  // --- ЛОГИКА АВАТАРА ---
  // Создаем ссылку на аватар-заглушку, используя имя пользователя
  // Это гарантирует, что у одного и того же пользователя всегда будет один и тот же аватар
  const fallbackAvatarUrl = `https://api.dicebear.com/8.x/miniavs/svg?seed=${user.name.replace(
    " ",
    ""
  )}`;
  const avatar = user.avatarUrl || fallbackAvatarUrl;

  const handleSettingChange = (setting: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [setting]: !prev[setting] }));
    // Здесь будет логика отправки изменений на сервер
  };

  return (
    <main className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Профиль</h1>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* --- ОСНОВНАЯ ИНФОРМАЦИЯ --- */}
        <div className="bg-white p-6 rounded-xl shadow-md text-center">
          <img
            src={avatar}
            alt="User Avatar"
            className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-emerald-200 bg-gray-100"
          />
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-500">{user.email}</p>
          <p className="text-sm text-gray-400 mt-2">
            На проекте с {user.joinDate}
          </p>
          <button className="mt-4 px-4 py-2 bg-emerald-50 text-emerald-700 font-semibold rounded-lg text-sm hover:bg-emerald-100 transition">
            Редактировать профиль
          </button>
        </div>

        {/* --- СВОДКА СТАТИСТИКИ --- */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white p-4 rounded-xl shadow-md">
            <p className="text-2xl font-bold text-emerald-600">
              {user.stats.tasksCompleted}
            </p>
            <p className="text-gray-500 text-sm">Задач выполнено</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md">
            <p className="text-2xl font-bold text-emerald-600">
              {user.stats.currentStreak} дней
            </p>
            <p className="text-gray-500 text-sm">Текущая серия</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md">
            <p className="text-2xl font-bold text-emerald-600">
              {user.stats.points}
            </p>
            <p className="text-gray-500 text-sm">Всего очков</p>
          </div>
        </div>

        {/* --- НАСТРОЙКИ --- */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Настройки</h3>
          <ul className="space-y-4">
            <li className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Bell className="text-gray-500" />
                <span>Email-уведомления</span>
              </div>
              <button
                onClick={() => handleSettingChange("emailNotifications")}
                className={`w-12 h-6 rounded-full flex items-center transition ${
                  settings.emailNotifications ? "bg-emerald-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block w-5 h-5 bg-white rounded-full transform transition ${
                    settings.emailNotifications
                      ? "translate-x-6"
                      : "translate-x-1"
                  }`}
                />
              </button>
            </li>
            <li className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                {settings.darkMode ? (
                  <Moon className="text-gray-500" />
                ) : (
                  <Sun className="text-gray-500" />
                )}
                <span>Тёмная тема</span>
              </div>
              <button
                onClick={() => handleSettingChange("darkMode")}
                className={`w-12 h-6 rounded-full flex items-center transition ${
                  settings.darkMode ? "bg-emerald-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block w-5 h-5 bg-white rounded-full transform transition ${
                    settings.darkMode ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </li>
            <li className="flex justify-between items-center pt-2 border-t mt-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-gray-500" />
                <span>Сменить пароль</span>
              </div>
              <button className="text-sm text-emerald-600 font-semibold">
                Изменить
              </button>
            </li>
          </ul>
        </div>

        {/* --- УПРАВЛЕНИЕ АККАУНТОМ --- */}
        <div className="flex justify-center pt-4">
          <button className="flex items-center gap-2 px-4 py-2 text-red-600 font-semibold rounded-lg hover:bg-red-50 transition">
            <LogOut size={18} />
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
