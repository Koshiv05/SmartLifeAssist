export type Task = {
  id: string;
  title: string;
  description: string;
  dueTime: string;
  reminderType?: 'time' | 'location' | '';
};