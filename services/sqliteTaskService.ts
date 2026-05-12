import * as SQLite from 'expo-sqlite';
import { Task } from '../types/task';

const db = SQLite.openDatabaseSync('smartlifeassist.db');

export function initializeTaskDatabase() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      dueDate TEXT,
      dueTime TEXT,
      reminderType TEXT
    );
  `);
}

export function saveTasksToSQLite(tasks: Task[]) {
  initializeTaskDatabase();

  db.withTransactionSync(() => {
    tasks.forEach((task) => {
      db.runSync(
        `
        INSERT OR REPLACE INTO tasks
        (id, title, description, dueDate, dueTime, reminderType)
        VALUES (?, ?, ?, ?, ?, ?);
        `,
        [
          task.id,
          task.title,
          task.description,
          task.dueDate,
          task.dueTime,
          task.reminderType || '',
        ]
      );
    });
  });
}

export function loadTasksFromSQLite(): Task[] {
  initializeTaskDatabase();

  const rows = db.getAllSync<Task>('SELECT * FROM tasks;');

  return rows;
}

export function deleteTaskFromSQLite(taskId: string) {
  initializeTaskDatabase();

  db.runSync('DELETE FROM tasks WHERE id = ?;', [taskId]);
}