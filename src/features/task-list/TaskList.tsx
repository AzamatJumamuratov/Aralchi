// src/features/task-list/TaskList.tsx
import { useState } from "react";
import Task, { type TaskProps } from "@/entities/task/Task";

interface TasksProps {
  tasks: TaskProps[];
  // 1. Добавляем новый необязательный пропс в интерфейс
  onConfirm?: (newlyCompletedCount: number) => void;
}

// 2. Принимаем onConfirm в компонент
const TaskList = ({ tasks, onConfirm }: TasksProps) => {
  const [taskList, setTaskList] = useState<TaskProps[]>(tasks);
  const [draft, setDraft] = useState<Record<number, boolean>>({});

  const toggleTask = (id: number) => {
    setDraft((prev) => ({
      ...prev,
      [id]:
        prev[id] === undefined
          ? !taskList.find((t) => t.id === id)?.completed
          : !prev[id],
    }));
  };

  const confirmTasks = () => {
    // 3. Считаем, сколько задач были НЕ выполнены, а теперь стали выполнены
    let newlyCompletedCount = 0;
    taskList.forEach((task) => {
      // Если задача не была выполнена и в черновике она отмечена как выполненная
      if (!task.completed && draft[task.id] === true) {
        newlyCompletedCount++;
      }
    });

    // 4. Вызываем переданную функцию с этим количеством
    if (newlyCompletedCount > 0) {
      onConfirm?.(newlyCompletedCount);
    }

    // Обновляем состояние списка задач, как и раньше
    setTaskList((prev) =>
      prev.map((task) =>
        draft[task.id] !== undefined
          ? { ...task, completed: draft[task.id] }
          : task
      )
    );
    setDraft({});
  };

  return (
    <div className="space-y-4">
      {taskList.map((task) => {
        const isDrafted = draft[task.id] !== undefined;
        const currentState = isDrafted ? draft[task.id] : task.completed;

        return (
          <Task
            key={task.id}
            id={task.id}
            title={task.title}
            // Логика блокировки теперь зависит от исходного состояния задачи в taskList,
            // а не от временного.
            completed={currentState}
            disabled={taskList.find((t) => t.id === task.id)?.completed}
            onToggle={
              !taskList.find((t) => t.id === task.id)?.completed
                ? toggleTask
                : undefined
            }
          />
        );
      })}

      <button
        // Блокируем кнопку, если нет изменений в черновике
        disabled={Object.keys(draft).length === 0}
        onClick={confirmTasks}
        className="w-full py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        Подтвердить
      </button>
    </div>
  );
};

export default TaskList;
