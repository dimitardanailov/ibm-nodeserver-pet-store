import { Service } from "typedi";
import { Query } from "mongoose";
import { Pet } from "../models/Pet";

@Service()
export class PetRepository {

	async getRecords(): Promise<Pet> {
		/**
		 * I'd like to get only fifty records and each record
		 * should have name and age.
		 * 
		 * lean() is much faster rather than find() because returned objects are plain Javascript objects.
		 * More about: https://hashnode.com/post/why-are-mongoose-mongodb-odm-lean-queries-faster-than-normal-queries-cillvawhq0062kj53asxoyn7j
		 * 
		 * The final piece is: We wrap query on Promise.
		 */
		const query: Query<Pet> = Pet.find(
			{},
			{ name: 1, age: 1, _id: 0 },
			{ limit: 50 }
		).lean();

		return new Promise<Pet>((resolve, reject) => {
			query.exec((error, pets) => {
				if (error) reject(error);

				resolve(pets);
			});
		});
	}

	save(Pet: Pet): Promise<Pet> {
		return Promise.resolve(Pet.save());
	}
}
