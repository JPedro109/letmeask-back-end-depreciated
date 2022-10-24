import { mockRepositoryInMemory } from "./Mock";

export const setup = () => {
	beforeAll(async () => {
		await mockRepositoryInMemory.create();
	});
	
	afterAll(async () => {
		await mockRepositoryInMemory.delete();
	});
};