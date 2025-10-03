// src/pages/HomePage.tsx
import WaterCircle, { type WaterCircleRef } from "@/components/WaterCircle";
import TaskList from "@/features/task-list/TaskList";
import { useRef } from "react";

const HomePage = () => {
  const waterCircleRef = useRef<WaterCircleRef>(null);

  const tasks = [
    { id: 1, title: "Прогулка 30 минут", completed: false },
    { id: 2, title: "Выпить воду", completed: true },
    { id: 3, title: "Правильное питание", completed: false },
  ];

  // 1. Создаём функцию, которая будет вызываться из TaskList
  const handleTasksConfirm = (newlyCompletedCount: number) => {
    if (newlyCompletedCount > 0) {
      // За каждую новую выполненную задачу добавляем, например, 20 единиц воды
      const waterToAdd = newlyCompletedCount * 20;
      console.log(
        `Подтверждено ${newlyCompletedCount} новых задач. Добавляем ${waterToAdd} воды.`
      );
      waterCircleRef.current?.addWater(waterToAdd);
    }
  };

  return (
    <main className="flex flex-col items-center w-full min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <WaterCircle ref={waterCircleRef} />

      <div className="w-full bg-white shadow-lg rounded-xl p-5">
        <h2 className="text-xl font-bold mb-5 text-gray-800 border-b pb-2">
          Задачи на сегодня
        </h2>
        {/* 2. Передаём созданную функцию в TaskList через пропс onConfirm */}
        <TaskList tasks={tasks} onConfirm={handleTasksConfirm} />
      </div>
    </main>
  );
};

export default HomePage;
