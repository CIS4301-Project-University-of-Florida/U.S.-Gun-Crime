/**
 * Prefixes the given table name with the prefix of the CISE Oracle owner's username.
 *
 * @param name The name of the table.
 */
export const table = (
  name:
    | 'Incident'
    | 'IncidentCharacteristic'
    | 'Location'
    | 'Gun'
    | 'Participant'
) => {
  return `${process.env.OWNER}.${name}`;
};
