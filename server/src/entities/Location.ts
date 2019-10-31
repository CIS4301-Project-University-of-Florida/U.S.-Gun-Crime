interface Location {
  LATITUDE: number;
  LONGITUDE: number;
  CITY_OR_COUNTY: string;
  STATE: string;
  STATE_HOUSE_DISTRICT: number | null;
  STATE_SENATE_DISTRICT: number | null;
  CONGRESSIONAL_DISTRICT: number | null;
}

export default Location;
