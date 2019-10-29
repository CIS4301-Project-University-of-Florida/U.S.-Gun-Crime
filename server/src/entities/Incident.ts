interface Incident {
  ID: string;
  I_DATE: Date;
  N_KILLED: number;
  N_INJURED: number;
  N_GUNS_INVOLVED: number | null;
  NOTES: string | null;
  LATITUDE: number;
  LONGITUDE: number;
  SOURCE_URL: string | null;
}

export default Incident;
