// Routing Controllers Annotations
import { JsonController, Get, Controller, Param, Post } from "routing-controllers";
import { PetRepository } from "../repositories/PetRepository";
import { IPet } from "../interfaces/IPet";
import { Pet } from "../models/Pet";

@JsonController()
// Create a controller prefix for each end point
@Controller("/pets")
export class PetController {

	constructor(private repository: PetRepository) {
	}

	@Get('/')
	async getAll() {
		const pets = await this.repository.getRecords();

		return pets;
	}

	@Get("/:id")
	getOne(@Param("id") id: number) {
		return "This action returns pet #" + id;
	}

	@Post('/create')
	async createRecord(): Promise<IPet> {
		// Create a simple puppy
		const pet: Pet = new Pet();
		pet.name = "John";
		pet.age = 5;

		const promise = this.repository.save(pet);

		return await promise.then(dbQuery => {
			return dbQuery.toJSON();
		});
	}
}
