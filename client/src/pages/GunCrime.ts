// Structure of the data returned by the deepdive tool
export interface GunCrime {
  CITY_OR_COUNTY: string;
  INCIDENT_CHARACTERISTIC: string;
  INCIDENT_DATE: string;
  INCIDENT_ID: number;
  LATITUDE: number;
  LONGITUDE: number;
  NOTES: string;
  N_GUNS_INVOLVED: number;
  N_INJURED: number;
  N_KILLED: number;
  N_PARTICIPANTS: number;
  SOURCE_URL: string;
  STATE: string;
  STATE_HOUSE_DISTRICT: number;
  STATE_SENATE_DISTRICT: number;
}
