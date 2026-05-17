import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';

const BACKGROUND_TASK_NAME = 'smartlife-background-task';

TaskManager.defineTask(BACKGROUND_TASK_NAME, async () => {
  try {
    console.log('Background task executed');

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Background Task Running',
        body: 'SmartLife Assist background task executed successfully.',
      },
      trigger: null,
    });

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
      return {
        success: false,
        message: 'Background fetch permission denied.',
      };
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

    return {
      success: true,
      message: 'Background task registered successfully.',
    };
  } catch (error) {
    console.log('Register task error:', error);

    return {
      success: false,
      message: 'Could not register background task.',
    };
  }
}

export async function checkTaskStatus() {
  return await TaskManager.isTaskRegisteredAsync(
    BACKGROUND_TASK_NAME
  );
}