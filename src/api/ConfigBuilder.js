const searchableFields = {
  people: ['name'],
  films: ['title'],
  starships: ['name', 'model'],
  vehicles: ['name', 'model'],
  species: ['name'],
  planets: ['name'],
};
// all visibleFields also are sortable and searcheable
const visibleFields = {
  people: ['name', 'birth_year', 'eye_color', 'gender', 'hair_color', 'height', 'mass', 'skin_color'],
  films: ['title', 'episode_id', 'opening_crawl', 'director', 'producer', 'release_date'],
  starships: ['name', 'model', 'starship_class', 'manufacturer', 'cost_in_credits', 'length', 'crew', 'passengers', 'hyperdrive_rating', 'MGLT', 'cargo_capacity', 'consumables'],
  vehicles: ['name', 'model', 'vehicle_class', 'manufacturer', 'length', 'cost_in_credits', 'crew', 'passengers', 'max_atmosphering_speed', 'cargo_capacity', 'consumables'],
  species: ['name', 'classification', 'designation', 'average_height', 'average_lifespan', 'eye_colors', 'hair_colors', 'skin_colors', 'language'],
  planets: ['name', 'diameter', 'rotation_period', 'orbital_period', 'gravity', 'population', 'climate', 'terrain', 'surface_water'],
};

export const getConfig = (resource) => {
  const result = {
    img: {
      title: 'image',
    },
    link: `${resource}/:id`,
  };
  visibleFields[resource].forEach((field) => {
    result[field] = {
      title: field.replace('_', ' '),
      isSortable: true,
      isSearchable: searchableFields[resource].includes(field),
    };
  });
  return result;
};

export const getColWithLinks = resource => (resource === 'films' ? 'title' : 'name');
