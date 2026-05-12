import * as Battery from 'expo-battery';

export async function getBatteryInfo() {
  const batteryLevel = await Battery.getBatteryLevelAsync();
  const batteryState = await Battery.getBatteryStateAsync();

  return {
    percentage: Math.round(batteryLevel * 100),
    isCharging:
      batteryState === Battery.BatteryState.CHARGING ||
      batteryState === Battery.BatteryState.FULL,
  };
}