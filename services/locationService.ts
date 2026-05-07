import * as Location from 'expo-location';

export type CurrentLocation = {
  latitude: number;
  longitude: number;
};

export async function getCurrentLocation(): Promise<CurrentLocation> {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    throw new Error('Location permission was denied.');
  }

  const location = await Location.getCurrentPositionAsync({});

  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
}