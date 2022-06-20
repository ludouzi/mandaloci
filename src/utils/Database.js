import {getConnection, getManager, Like, LessThanOrEqual} from 'typeorm';
import dayjs from 'dayjs';
import {validate} from 'class-validator';
import Actor from '../entities/Actor';
import Character from '../entities/Character';
import Location from '../entities/Location';
import Prop from '../entities/Prop';

const validateEntity = async entity => {
  const errors = await validate(entity, {skipMissingProperties: true});
  if (errors.length > 0) {
    console.log('Validation failed. Errors: ', errors);
    return false;
  } else {
    return true;
  }
};

//Actors

export const getActors = async learned => {
  if (learned) {
    return await getManager().find(Actor, {
      where: {isLearned: learned},
    });
  } else {
    return getConnection().manager.find(Actor);
  }
};

export const setActor = async (id, newValue) => {
  let manager = getManager();
  let actor = await manager.findOne(Actor, id);
  actor.value = newValue;
  if (await validateEntity(actor)) {
    await manager.save(actor);
  }
};

export const getSearchActors = async text => {
  let manager = getConnection().manager;
  let actors = await manager.find(Actor, {
    where: [
      {initial: Like(`%${text}%`), isLearned: true},
      {value: Like(`%${text}%`), isLearned: true},
    ],
  });
  return actors;
};

export const setActorLearned = async charId => {
  const dt = dayjs().toISOString();
  let manager = getConnection().manager;
  let actor = await manager.findOne(Actor, {where: {id: charId}});
  actor.isLearned = true;
  actor.dueDate = dt;
  if (await validateEntity(actor)) {
    await manager.save(actor);
  }
};

//Locations

export const getLocations = async learned => {
  if (learned) {
    return await getConnection().manager.find(Location, {
      where: {isLearned: learned},
    });
  } else {
    return getConnection().manager.find(Location);
  }
};

export const setLocation = async (id, newValue) => {
  let manager = getConnection().manager;
  let location = await getConnection().manager.findOne(Location, id);
  location.value = newValue;
  if (await validateEntity(location)) {
    await manager.save(location);
  }
};

export const getSearchLocations = async text => {
  let manager = getConnection().manager;
  let locations = await manager.find(Location, {
    where: [
      {final: Like(`%${text}%`), isLearned: true},
      {value: Like(`%${text}%`), isLearned: true},
    ],
  });
  return locations;
};

export const setLocationLearned = async charId => {
  const dt = dayjs().toISOString();
  let manager = getConnection().manager;
  let location = await manager.findOne(Location, {where: {id: charId}});
  location.isLearned = true;
  location.dueDate = dt;
  if (await validateEntity(location)) {
    await manager.save(location);
  }
};

//Props

export const getProps = async learned => {
  if (learned) {
    return await getConnection().manager.find(Prop, {
      where: {isLearned: learned},
    });
  } else {
    return getConnection().manager.find(Prop);
  }
};

export const setProp = async (id, newValue) => {
  let manager = getConnection().manager;
  let prop = await manager.findOne(Prop, id);
  prop.value = newValue;
  if (await validateEntity(prop)) {
    await manager.save(prop);
  }
};

export const getSearchProps = async text => {
  let manager = getConnection().manager;
  let props = await manager.find(Prop, {
    where: [
      {comp: Like(`%${text}%`), isLearned: true},
      {value: Like(`%${text}%`), isLearned: true},
    ],
  });
  return props;
};

export const setPropLearned = async charId => {
  const dt = dayjs().toISOString();
  let manager = getConnection().manager;
  let prop = await manager.findOne(Prop, {where: {id: charId}});
  prop.isLearned = true;
  prop.dueDate = dt;
  if (await validateEntity(prop)) {
    await manager.save(prop);
  }
};

//Characters

export const getChars = async learned => {
  if (learned) {
    return await getConnection().manager.find(Character, {
      where: {isLearned: learned},
    });
  } else {
    return getConnection().manager.find(Character);
  }
};

export const getSearchChars = async text => {
  let manager = getConnection().manager;
  let chars = await manager.find(Character, {
    where: [
      {hanzi: Like(`%${text}%`), isLearned: true},
      {value: Like(`%${text}%`), isLearned: true},
    ],
  });
  return chars;
};

export const setCharLearned = async charId => {
  const dt = dayjs().toISOString();
  let manager = getConnection().manager;
  let char = await manager.findOne(Character, {where: {id: charId}});
  char.isLearned = true;
  char.dueDate = dt;
  if (await validateEntity(char)) {
    await manager.save(char);
  }
};

//Cards

export const getCharacterCards = async () => {
  const dt = dayjs().toISOString();
  return await getConnection().manager.find(Character, {
    where: {dueDate: LessThanOrEqual(dt)},
  });
};

export const setCharacterCard = async (id, time) => {
  const due = dayjs().add(time, 'minutes');
  let manager = getConnection().manager;
  const char = await manager.findOne(Character, {
    where: {id: id},
  });
  char.dueDate = due.toISOString();
  if (await validateEntity(char)) {
    await manager.save(char);
  }
};

export const getActorCards = async () => {
  const dt = dayjs().toISOString();
  return await getConnection().manager.find(Actor, {
    where: {dueDate: LessThanOrEqual(dt)},
  });
};

export const setActorCard = async (id, time) => {
  const due = dayjs().add(time, 'minutes');
  let manager = getConnection().manager;
  const actor = await manager.findOne(Actor, {
    where: {id: id},
  });
  actor.dueDate = due.toISOString();
  if (await validateEntity(actor)) {
    await manager.save(actor);
  }
};

export const getLocationCards = async () => {
  const dt = dayjs().toISOString();
  return getConnection().manager.find(Location, {
    where: {dueDate: LessThanOrEqual(dt)},
  });
};

export const setLocationCard = async (id, time) => {
  const due = dayjs().add(time, 'minutes');
  let manager = getConnection().manager;
  const location = await manager.findOne(Location, {
    where: {id: id},
  });
  location.dueDate = due.toISOString();
  if (await validateEntity(location)) {
    await manager.save(location);
  }
};

export const getPropCards = async () => {
  const dt = dayjs().toISOString();
  return getConnection().manager.find(Prop, {
    where: {dueDate: LessThanOrEqual(dt)},
  });
};

export const setPropCard = async (id, time) => {
  const due = dayjs().add(time, 'minutes');
  let manager = getConnection().manager;
  const prop = await manager.findOne(Prop, {
    where: {id: id},
  });
  prop.dueDate = due.toISOString();
  if (await validateEntity(prop)) {
    await manager.save(prop);
  }
};
