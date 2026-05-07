import * as Location from 'expo-location';

export type CurrentLocation = {
  latitude: number;
  longitude: number;
  address: string;
};

export async function getCurrentLocation(): Promise<CurrentLocation> {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    throw new Error('Location permission was denied.');
  }

  const location = await Location.getCurrentPositionAsync({});

  const reverseGeocode = await Location.reverseGeocodeAsync({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  });

  const place = reverseGeocode[0];

  const address = [
    place.name,
    place.street,
    place.city,
    place.region,
    place.country,
  ]
    .filter(Boolean)
    .join(', ');

  return {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    address,
  };
}