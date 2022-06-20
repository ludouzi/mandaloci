import {createConnection} from 'typeorm';
import Actor from './entities/Actor';
import Prop from './entities/Prop';
import Location from './entities/Location';
import Character from './entities/Character';

createConnection({
  type: 'react-native',
  database: 'database.db',
  extra: {
    createFromLocation: '~/database/database.db',
  },
  location: 'default',
  logging: ['error', 'warn'],
  synchronize: false,
  entities: [Actor, Location, Prop, Character],
})
  .then(() => {
    console.log('Connected to the database');
  })
  .catch(() => console.log('Unable to connect to the database'));
