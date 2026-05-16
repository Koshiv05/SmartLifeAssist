export type Task = {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  dueTime: string;
  reminderType?: 'time' | 'location' | '';
  createdAtMs?: number;
  updatedAtMs?: number;
};