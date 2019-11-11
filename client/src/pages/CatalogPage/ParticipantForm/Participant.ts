interface Participant {
  gender: string;
  age: { equality: string; count: number };
  type: string;
  status: string;
  relationship: string;
}

export default Participant;
