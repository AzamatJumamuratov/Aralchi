import { type User } from "../model/types";

interface userCardProps {
  user: User;
  rating: number;
}

const UserCard = ({ user, rating }: userCardProps) => {
  return (
    <div
      key={user.id}
      className="flex items-center justify-between p-4 rounded-lg border bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <span className="text-lg font-bold text-gray-600 w-6">{rating}</span>
        <img
          src={user.avatar}
          alt={user.name}
          className="w-10 h-10 rounded-full object-cover border"
        />
        <div>
          <p className="font-semibold text-gray-800">{user.name}</p>
          <p className="text-sm text-gray-500">{user.category}</p>
        </div>
      </div>
      <span className="text-lg font-bold text-blue-600">
        {user.score} баллов
      </span>
    </div>
  );
};

export default UserCard;
