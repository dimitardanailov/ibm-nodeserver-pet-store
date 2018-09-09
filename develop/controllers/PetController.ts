// Routing Controllers Annotations
import { JsonController, Get, Controller, Param } from "routing-controllers";

@JsonController()
// Create a controller prefix for each end point
@Controller("/pets")
export class PetController {

	@Get('/')
	getAll() {
		return {};
	}

	@Get("/:id")
	getOne(@Param("id") id: number) {
		return "This action returns pet #" + id;
	}
}
