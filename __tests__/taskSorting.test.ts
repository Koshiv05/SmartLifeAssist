type TestTask = {
  id: string;
  title: string;
  createdAtMs: number;
};

function sortTasksNewestFirst(tasks: TestTask[]) {
  return [...tasks].sort((a, b) => b.createdAtMs - a.createdAtMs);
}

describe('Task Sorting Integration', () => {
  test('Newest task should appear first', () => {
    const tasks = [
      { id: '1', title: 'Old Task', createdAtMs: 1000 },
      { id: '2', title: 'New Task', createdAtMs: 3000 },
      { id: '3', title: 'Middle Task', createdAtMs: 2000 },
    ];

    const sortedTasks = sortTasksNewestFirst(tasks);

    expect(sortedTasks[0].title).toBe('New Task');
  });

  test('Task count should stay same after sorting', () => {
    const tasks = [
      { id: '1', title: 'Task One', createdAtMs: 1000 },
      { id: '2', title: 'Task Two', createdAtMs: 2000 },
    ];

    const sortedTasks = sortTasksNewestFirst(tasks);

    expect(sortedTasks.length).toBe(2);
  });

  test('Original task list should not be modified', () => {
    const tasks = [
      { id: '1', title: 'Old Task', createdAtMs: 1000 },
      { id: '2', title: 'New Task', createdAtMs: 3000 },
    ];

    sortTasksNewestFirst(tasks);

    expect(tasks[0].title).toBe('Old Task');
  });
});