interface Participant {
  ID: number;
  NAME: string | null;
  AGE: number | null;
  GENDER: 'M' | 'F' | null;
  TYPE: string | null;
  RELATIONSHIP: string | null;
  STATUS: string | null;
}

export default Participant;
