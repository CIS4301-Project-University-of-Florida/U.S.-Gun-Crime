/**
 * Prefixes the given table name with the prefix of the CISE Oracle owner's username.
 *
 * @param name The name of the table.
 */
const table = (
  name:
    | 'Incident'
    | 'IncidentCharacteristic'
    | 'Location'
    | 'Gun'
    | 'Participant'
    | 'StatePopulation'
) => {
  return `${process.env.OWNER}.${name}`;
};

export const Incident = table('Incident');
export const IncidentCharacteristic = table('IncidentCharacteristic');
export const Location = table('Location');
export const Gun = table('Gun');
export const Participant = table('Participant');
export const StatePopulation = table('StatePopulation');
