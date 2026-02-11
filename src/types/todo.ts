export type UserId = 'TED' | 'KU';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  userId: UserId;
  createdAt?: number;
  plannedCompletionDate?: number;
}

export type FilterType = 'all' | 'active' | 'completed';
export type UserFilterType = 'all' | 'TED' | 'KU';