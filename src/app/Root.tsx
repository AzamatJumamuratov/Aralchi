// src/Root.tsx

import { createBrowserRouter, RouterProvider } from "react-router"; // react-router-dom
import { useState, useEffect } from "react";
import HomePage from "@/pages/HomePage";
import Layout from "./Layout";
import LeaderBoards from "@/pages/LeaderBoards";
import WelcomeSurvey from "@/pages/WelcomeSurvey"; // 👈 Убедитесь, что этот компонент создан

const Root = () => {
  // 1. Добавляем состояние и эффект для проверки localStorage
  const [isFirstVisit, setIsFirstVisit] = useState<boolean | null>(null);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisitedBefore");
    if (hasVisited) {
      setIsFirstVisit(false);
    } else {
      setIsFirstVisit(true);
    }
  }, []);

  // 2. Добавляем обработчик завершения опросника
  const handleSurveyComplete = () => {
    localStorage.setItem("hasVisitedBefore", "true");
    setIsFirstVisit(false);
  };

  // Определение роутера остается без изменений
  const router = createBrowserRouter([
    {
      path: "/",
      Component: Layout,
      children: [
        {
          index: true,
          Component: HomePage,
        },
        {
          path: "leaderBoards",
          Component: LeaderBoards,
        },
      ],
    },
  ]);

  // 3. Добавляем условный рендеринг
  // Пока идет проверка, показываем заглушку
  if (isFirstVisit === null) {
    return <div>Загрузка...</div>; // Или ваш компонент-спиннер
  }

  // Если это первый визит — показываем опросник
  if (isFirstVisit) {
    return <WelcomeSurvey onComplete={handleSurveyComplete} />;
  }

  // Если не первый — показываем приложение с роутером
  return <RouterProvider router={router} />;
};

export default Root;
