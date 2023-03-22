import {Like, LessThanOrEqual, getRepository} from 'typeorm';
import {validate} from 'class-validator';
import dayjs from 'dayjs';
import {Actor} from '../entity/actor';
import {Character} from '../entity/character';
import {Location} from '../entity/location';
import {Prop} from '../entity/prop';

const validateEntity = async (entity: Actor | Character | Location | Prop) => {
  const errors = await validate(entity, {skipMissingProperties: true});
  if (errors.length > 0) {
    console.log('Validation failed. Errors: ', errors);
    return false;
  } else {
    return true;
  }
};

//Actors

export const getActors = async (learned: boolean) => {
  const actorRepo = getRepository(Actor);
  if (learned) {
    return await actorRepo.find({
      where: {isLearned: learned},
    });
  } else {
    return actorRepo.find();
  }
};

export const setActor = async (id: number, newValue: string) => {
  const actorRepo = getRepository(Actor);
  let actor = await actorRepo.findOne(id);
  if (actor != null) {
    actor.value = newValue;
    if (await validateEntity(actor)) {
      await actorRepo.save(actor);
    }
  }
};

export const getSearchActors = async (text: string) => {
  const actorRepo = getRepository(Actor);
  const actors = await actorRepo.find({
    where: [
      {initial: Like(`%${text}%`), isLearned: true},
      {value: Like(`%${text}%`), isLearned: true},
    ],
  });
  return actors;
};

export const setActorLearned = async (charId: string) => {
  const dt = dayjs().toISOString();
  const actorRepo = getRepository(Actor);
  let actor = await actorRepo.findOne({where: {id: charId}});
  if (actor != null) {
    actor.isLearned = true;
    actor.dueDate = dt;
    if (await validateEntity(actor)) {
      await actorRepo.save(actor);
    }
  }
};

//Locations

export const getLocations = async (learned: boolean) => {
  const locationRepo = getRepository(Location);
  if (learned) {
    return await locationRepo.find({
      where: {isLearned: learned},
    });
  } else {
    return locationRepo.find();
  }
};

export const setLocation = async (id: number, newValue: string) => {
  const locationRepo = getRepository(Location);
  let location = await locationRepo.findOne(id);
  if (location != null) {
    location.value = newValue;
    if (await validateEntity(location)) {
      await locationRepo.save(location);
    }
  }
};

export const getSearchLocations = async (text: string) => {
  const locationRepo = getRepository(Location);
  let locations = await locationRepo.find({
    where: [
      {final: Like(`%${text}%`), isLearned: true},
      {value: Like(`%${text}%`), isLearned: true},
    ],
  });
  return locations;
};

export const setLocationLearned = async (charId: string) => {
  const dt = dayjs().toISOString();
  const locationRepo = getRepository(Location);
  let location = await locationRepo.findOne({where: {id: charId}});
  if (location != null) {
    location.isLearned = true;
    location.dueDate = dt;
    if (await validateEntity(location)) {
      await locationRepo.save(location);
    }
  }
};

//Props

export const getProps = async (learned: boolean) => {
  const propRepo = getRepository(Prop);
  if (learned) {
    return await propRepo.find({
      where: {isLearned: learned},
    });
  } else {
    return propRepo.find();
  }
};

export const setProp = async (id: number, newValue: string) => {
  const propRepo = getRepository(Prop);
  let prop = await propRepo.findOne(id);
  if (prop != null) {
    prop.value = newValue;
    if (await validateEntity(prop)) {
      await propRepo.save(prop);
    }
  }
};

export const getSearchProps = async (text: string) => {
  const propRepo = getRepository(Prop);
  let props = await propRepo.find({
    where: [
      {comp: Like(`%${text}%`), isLearned: true},
      {value: Like(`%${text}%`), isLearned: true},
    ],
  });
  return props;
};

export const setPropLearned = async (charId: string) => {
  const dt = dayjs().toISOString();
  const propRepo = getRepository(Prop);
  let prop = await propRepo.findOne({where: {id: charId}});
  if (prop != null) {
    prop.isLearned = true;
    prop.dueDate = dt;
    if (await validateEntity(prop)) {
      await propRepo.save(prop);
    }
  }
};

//Characters

export const getChars = async (learned: boolean) => {
  const charRepo = getRepository(Character);
  if (learned) {
    return await charRepo.find({
      where: {isLearned: learned},
    });
  } else {
    return await charRepo.find();
  }
};

export const getSearchChars = async (text: string) => {
  const charRepo = getRepository(Character);
  let chars = await charRepo.find({
    where: [
      {hanzi: Like(`%${text}%`), isLearned: true},
      {value: Like(`%${text}%`), isLearned: true},
    ],
  });
  return chars;
};

export const setCharLearned = async (charId: string) => {
  const dt = dayjs().toISOString();
  const charRepo = getRepository(Character);
  const char = await charRepo.findOne({where: {id: charId}});
  if (char) {
    char.isLearned = true;
    char.dueDate = dt;
    if (await validateEntity(char)) {
      await charRepo.save(char);
    }
  }
};

//Cards

export const getCharacterCards = async () => {
  const dt = dayjs().toISOString();
  const charRepo = getRepository(Character);
  return await charRepo.find({
    where: {dueDate: LessThanOrEqual(dt)},
  });
};

export const setCharacterCard = async (id: number, time: number) => {
  const due = dayjs().add(time, 'minutes');
  const charRepo = getRepository(Character);
  const char = await charRepo.findOne({
    where: {id: id},
  });
  if (char) {
    char.dueDate = due.toISOString();
    if (await validateEntity(char)) {
      await charRepo.save(char);
    }
  }
};

export const getActorCards = async () => {
  const dt = dayjs().toISOString();
  const actorRepo = getRepository(Actor);
  return await actorRepo.find({
    where: {dueDate: LessThanOrEqual(dt)},
  });
};

export const setActorCard = async (id: number, time: number) => {
  const due = dayjs().add(time, 'minutes');
  const actorRepo = getRepository(Actor);
  const actor = await actorRepo.findOne({
    where: {id: id},
  });
  if (actor) {
    actor.dueDate = due.toISOString();
    if (await validateEntity(actor)) {
      await actorRepo.save(actor);
    }
  }
};

export const getLocationCards = async () => {
  const dt = dayjs().toISOString();
  const locationRepo = getRepository(Location);
  return locationRepo.find({
    where: {dueDate: LessThanOrEqual(dt)},
  });
};

export const setLocationCard = async (id: number, time: number) => {
  const due = dayjs().add(time, 'minutes');
  const locationRepo = getRepository(Location);
  const location = await locationRepo.findOne({
    where: {id: id},
  });
  if (location) {
    location.dueDate = due.toISOString();
    if (await validateEntity(location)) {
      await locationRepo.save(location);
    }
  }
};

export const getPropCards = async () => {
  const dt = dayjs().toISOString();
  const propRepo = getRepository(Prop);
  return propRepo.find({
    where: {dueDate: LessThanOrEqual(dt)},
  });
};

export const setPropCard = async (id: number, time: number) => {
  const due = dayjs().add(time, 'minutes');
  const propRepo = getRepository(Prop);
  const prop = await propRepo.findOne({
    where: {id: id},
  });
  if (prop != null) {
    prop.dueDate = due.toISOString();
    if (await validateEntity(prop)) {
      await propRepo.save(prop);
    }
  }
};
