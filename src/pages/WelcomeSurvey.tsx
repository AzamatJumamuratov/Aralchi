import { useState } from "react";

// --- Структура данных для наших категорий ---
const surveyData = [
  {
    id: "healthy-habits",
    title: "Здоровый образ жизни",
    subcategories: [
      { id: "walking", label: "Ходьба" },
      { id: "running", label: "Бег" },
      { id: "fitness", label: "Фитнес" },
      { id: "nutrition", label: "Правильное питание" },
      { id: "hydration", label: "Водный баланс" },
      { id: "sleep", label: "Режим сна" },
    ],
  },
  {
    id: "bad-habits",
    title: "Вредные привычки",
    subcategories: [
      { id: "smoking", label: "Курение" },
      { id: "alcohol", label: "Алкоголь" },
      { id: "fast-food", label: "Фастфуд" },
    ],
  },
];

// --- Интерфейс для компонента ---
interface WelcomeSurveyProps {
  onComplete: () => void;
}

const WelcomeSurvey = ({ onComplete }: WelcomeSurveyProps) => {
  // --- Состояние для хранения выбранных подкатегорий ---
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(
    {}
  );

  // --- Функция для обработки клика по чекбоксу ---
  const handleCheckboxChange = (id: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // --- Функция для кнопки "Готово" ---
  const handleComplete = () => {
    // Фильтруем только те ID, которые выбраны (true)
    const finalSelection = Object.keys(selectedItems).filter(
      (key) => selectedItems[key]
    );

    // Здесь может быть логика сохранения ответов
    console.log("Опросник завершен! Выбранные пункты:", finalSelection);

    // Вызываем функцию, переданную от родителя
    onComplete();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-emerald-50 p-4 sm:p-6">
      <div className="w-full max-w-lg bg-white p-6 sm:p-8 rounded-xl shadow-lg text-left">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2 text-emerald-800">
            Добро пожаловать!
          </h1>
          <p className="text-gray-600 mb-8">
            Отметьте то, что вам интересно отслеживать.
          </p>
        </div>

        {/* --- Рендерим категории и их чекбоксы --- */}
        <div className="space-y-6 mb-8">
          {surveyData.map((category) => (
            <div key={category.id}>
              <h2 className="text-xl font-semibold text-gray-700 mb-3 border-b pb-2">
                {category.title}
              </h2>
              <div className="space-y-3">
                {category.subcategories.map((item) => (
                  <label
                    key={item.id}
                    className="flex items-center space-x-3 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition"
                  >
                    <input
                      type="checkbox"
                      checked={!!selectedItems[item.id]}
                      onChange={() => handleCheckboxChange(item.id)}
                      className="h-5 w-5 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    />
                    <span className="text-gray-800">{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* --- Кнопка "Готово" --- */}
        <button
          onClick={handleComplete}
          className="w-full py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition"
        >
          Готово
        </button>
      </div>
    </div>
  );
};

export default WelcomeSurvey;
