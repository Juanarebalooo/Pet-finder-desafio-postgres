import { Pets } from "../models/pets";

export async function createPets(petsData: any) {
  const newPet = await Pets.create(petsData);
  return newPet;
}
