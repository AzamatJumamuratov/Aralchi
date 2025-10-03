// src/pages/StatisticsPage.tsx

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";

// Регистрация необходимых компонентов для Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

// --- ДАННЫЕ (временно здесь, потом будут приходить из API) ---

// 1. Данные для гистограммы "Активность за неделю" (сколько задач выполнено в день)
const weeklyActivityData = {
  labels: ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
  datasets: [
    {
      label: "Выполнено задач",
      data: [3, 5, 2, 4, 6, 3, 7],
      backgroundColor: "rgba(16, 185, 129, 0.6)", // Зелёный цвет
      borderColor: "rgba(5, 150, 105, 1)",
      borderWidth: 1,
    },
  ],
};

// 2. Данные для круговой диаграммы "Распределение задач"
const taskDistributionData = {
  labels: ["Ходьба", "Водный баланс", "Режим сна", "Фитнес", "Курение"],
  datasets: [
    {
      label: "Распределение выполненных задач",
      data: [12, 19, 5, 8, 3],
      backgroundColor: [
        "rgba(16, 185, 129, 0.7)",
        "rgba(6, 182, 212, 0.7)",
        "rgba(129, 140, 248, 0.7)",
        "rgba(244, 114, 182, 0.7)",
        "rgba(249, 115, 22, 0.7)",
      ],
      borderColor: [
        "rgba(16, 185, 129, 1)",
        "rgba(6, 182, 212, 1)",
        "rgba(129, 140, 248, 1)",
        "rgba(244, 114, 182, 1)",
        "rgba(249, 115, 22, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

// 3. Данные для линейного графика "Общий прогресс" (например, набранные очки за 4 недели)
const overallProgressData = {
  labels: ["Неделя 1", "Неделя 2", "Неделя 3", "Неделя 4"],
  datasets: [
    {
      label: "Набрано очков",
      data: [120, 150, 140, 180],
      fill: true,
      backgroundColor: "rgba(16, 185, 129, 0.2)",
      borderColor: "rgba(5, 150, 105, 1)",
      tension: 0.3, // сглаживание линии
    },
  ],
};

// --- КОМПОНЕНТ СТРАНИЦЫ ---

const StatisticsPage = () => {
  return (
    <main className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Ваша статистика</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Блок 1: Активность за неделю */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <Bar
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: {
                  display: true,
                  text: "Активность за последнюю неделю",
                },
              },
            }}
            data={weeklyActivityData}
          />
        </div>

        {/* Блок 2: Распределение задач */}
        <div className="bg-white p-6 rounded-xl shadow-md flex justify-center items-center">
          <div className="w-full max-w-xs">
            <Doughnut
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  title: {
                    display: true,
                    text: "Распределение выполненных задач",
                  },
                },
              }}
              data={taskDistributionData}
            />
          </div>
        </div>

        {/* Блок 3: Общий прогресс */}
        <div className="bg-white p-6 rounded-xl shadow-md lg:col-span-2">
          <Line
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                title: { display: true, text: "Общий прогресс по очкам" },
              },
            }}
            data={overallProgressData}
          />
        </div>
      </div>
    </main>
  );
};

export default StatisticsPage;
