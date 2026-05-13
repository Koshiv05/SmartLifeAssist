import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

const BACKGROUND_TASK_NAME = 'smartlife-background-task';

TaskManager.defineTask(BACKGROUND_TASK_NAME, async () => {
  try {
    console.log('Background task executed');

    return BackgroundFetch.BackgroundFetchResult.NewData;
  } catch (error) {
    console.log('Background task error:', error);

    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

export async function registerBackgroundTask() {
  try {
    const status = await BackgroundFetch.getStatusAsync();

    if (
      status === BackgroundFetch.BackgroundFetchStatus.Restricted ||
      status === BackgroundFetch.BackgroundFetchStatus.Denied
    ) {
      return false;
    }

    const isRegistered =
      await TaskManager.isTaskRegisteredAsync(
        BACKGROUND_TASK_NAME
      );

    if (!isRegistered) {
      await BackgroundFetch.registerTaskAsync(
        BACKGROUND_TASK_NAME,
        {
          minimumInterval: 60,
          stopOnTerminate: false,
          startOnBoot: true,
        }
      );
    }

    return true;
  } catch (error) {
    console.log('Register task error:', error);

    return false;
  }
}