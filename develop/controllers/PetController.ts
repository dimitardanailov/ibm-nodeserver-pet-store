// Routing Controllers Annotations
import { JsonController, Get, Controller, Param, Post } from "routing-controllers";
import { PetRepository } from "../repositories/PetRepository";
import { IPet } from "../interfaces/IPet";
import { Pet } from "../models/Pet";
import { Readable } from "stream";

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

	@Get('/hello-world-streams')
	async streams() {
		// Get Mongodb cursor
		const cursor = this.repository.getCursorToAllRecords();

		// Create a new memory steam
		const _petstoreStream = new Readable({
			read() {}
		});

		// Create a new JSON array
		_petstoreStream.push('[');

		const promise = new Promise((resolve, reject) => {

			let firstRecord = true; 
			cursor.on('data', doc => {
				// Add a new record 
				if (!firstRecord) {
					_petstoreStream.push(`,${JSON.stringify(doc)}`);
				}
				else {
					_petstoreStream.push(JSON.stringify(doc));
				}
				firstRecord = false;
			});

			cursor.on('close', () => {
				// Close JSON array
				_petstoreStream.push(']');
				
				// Our memory stream ready to be closed
				// .push(null) gives signal - No more data
				_petstoreStream.push(null);

				resolve();
			});

			cursor.on('error', error => {
				reject(error);
			});
		});

		// The 'end' event is emitted when there is no more data to be consumed from the stream.
		_petstoreStream.on('end', () => {
			console.log('\x1b[33m%s\x1b[0m', 'Memory stream was created successfully.');
		});
		
		// To consume this simple readable stream, 
		// we can simply pipe it into the writable stream process.stdout
		_petstoreStream.pipe(process.stdout);

		return await promise.then(() => {
			return 'Stream was closed';
		}).catch(_error => {
			return 'Ops, something is wrong';
		});
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
