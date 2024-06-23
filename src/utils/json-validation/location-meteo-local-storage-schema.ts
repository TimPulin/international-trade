export const locationMeteoLocalStorageSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      uniqueId: {
        type: 'number',
      },
      locationId: {
        type: 'string',
      },
      locationName: {
        type: 'string',
      },
      isFavorite: {
        type: 'boolean',
      },
    },
  },
};
