import { Check } from "lucide-react";

export interface TaskProps {
  id: number;
  title: string;
  completed: boolean;
  disabled?: boolean;
  onToggle?: (id: number) => void;
}

const Task = ({ id, title, completed, disabled, onToggle }: TaskProps) => {
  return (
    <div
      onClick={() => !disabled && onToggle?.(id)}
      className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
        disabled
          ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed opacity-70"
          : completed
          ? "bg-green-50 border-green-300 hover:bg-green-100"
          : "bg-gray-50 border-gray-200 hover:bg-gray-100"
      }`}
    >
      <span
        className={`flex-1 pr-3 text-base break-words transition-colors ${
          completed && !disabled
            ? "line-through text-gray-500"
            : disabled
            ? "text-gray-400"
            : "text-gray-800"
        }`}
      >
        {title}{" "}
      </span>
      <div
        className={`flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full border transition-all ${
          completed && !disabled
            ? "bg-green-400 border-green-500"
            : disabled
            ? "bg-gray-300 border-gray-300"
            : "border-gray-400"
        }`}
      >
        {completed && <Check className="w-4 h-4 text-white" />}{" "}
      </div>{" "}
    </div>
  );
};

export default Task;
