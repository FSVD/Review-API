const users = [{
  id: 1,
  username: 'FSVD',
  firstname: 'Fabio',
  lastname: 'Schettino',
  password: '1234',
  email: 'fabio.schettino@icloud.com',
  city: 'Palma de Mallorca',
  newsletteragree: 'yes',
  userstatus: 'active'
}, {
  id: 2,
  username: 'FEHI',
  firstname: 'Fernando',
  lastname: 'Himenez',
  password: '5678',
  email: 'fernando.himenez@icloud.com',
  city: 'Palma de Mallorca',
  newsletteragree: 'yes',
  userstatus: 'active'
}, {
  id: 3,
  username: 'ROCA',
  firstname: 'Rodrigo',
  lastname: 'Cano',
  password: '9010',
  email: 'rodrigo.cano@icloud.com',
  city: 'Palma de Mallorca',
  newsletteragree: 'yes',
  userstatus: 'active'
}];

const subjects = [{
  id: 1,
  categoryid: '1',
  googleplacesreference: 'fsdfsafasdf-sfasrwerfasd-sdf'
}, {
  id: 2,
  categoryid: '2',
  googleplacesreference: 'fsdfsafasdf-sfasrwerfasd-sdf'
}, {
  id: 3,
  categoryid: '3',
  googleplacesreference: 'fsdfsafasdf-sfasrwerfasd-sdf'
}];

const categories = [{
  id: 1,
  name: 'category 1'
}, {
  id: 2,
  name: 'category 2'
}, {
  id: 3,
  name: 'category 3'
}];

export const resolvers = {
  Query: {
    getUsers: () => {
      return users;
    },
    getSubjects: () => {
      return subjects;
    },
    getCategories: () => {
      return categories;
    }
  },
};