import { useState } from "react";

import { mockUsers } from "@/entities/user/model/mock";
import { type User } from "@/entities/user/model/types";
import UserCard from "@/entities/user/ui/UserCard";

interface LeaderBoardsProps {
  users?: User[]; // делаем необязательным
}

const LeaderBoards = ({ users = mockUsers }: LeaderBoardsProps) => {
  const [activeCategory, setActiveCategory] = useState("Все");

  const categories = ["Все", ...new Set(users.map((u) => u.category))];

  const filteredUsers =
    activeCategory === "Все"
      ? users
      : users.filter((u) => u.category === activeCategory);

  const sortedUsers = [...filteredUsers].sort((a, b) => b.score - a.score);

  if (!users.length) {
    return (
      <div className="p-6 text-center text-gray-500">
        Пока нет участников рейтинга{" "}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🏆 Рейтинг участников</h2>
      <div className="flex gap-2 mb-6 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-lg border transition-all ${
              activeCategory === cat
                ? "bg-blue-500 text-white border-blue-600"
                : "bg-gray-100 border-gray-300 hover:bg-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {sortedUsers.map((user, index) => (
          <UserCard key={index} rating={index + 1} user={user} />
        ))}
      </div>
    </div>
  );
};

export default LeaderBoards;
