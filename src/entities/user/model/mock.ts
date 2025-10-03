// src/entities/user/model/mock.ts
import { type User } from "./types";

export const mockUsers: User[] = [
  {
    id: 1,
    name: "Ali",
    category: "Друзья",
    score: 120,
    // Используем минималистичный стиль "miniavs" от DiceBear
    avatar: "https://api.dicebear.com/8.x/miniavs/svg?seed=Ali",
  },
  {
    id: 2,
    name: "Aisha",
    category: "Близкие",
    score: 95,
    avatar: "https://api.dicebear.com/8.x/miniavs/svg?seed=Aisha",
  },
  {
    id: 3,
    name: "Bek",
    category: "Вредные привычки",
    score: 80,
    avatar: "https://api.dicebear.com/8.x/miniavs/svg?seed=Bek",
  },
  {
    id: 4,
    name: "Sofia",
    category: "Алкоголь",
    score: 60,
    avatar: "https://api.dicebear.com/8.x/miniavs/svg?seed=Sofia",
  },
  {
    id: 5,
    name: "Anastacia",
    category: "Сигареты",
    score: 60,
    avatar: "https://api.dicebear.com/8.x/miniavs/svg?seed=Felix",
  },
];
