import { mockRepository } from "../../data/repositories/MockRepository";

export const setup = () => {
	beforeAll(async () => {
		await mockRepository.create();
	});

	afterAll(async () => {
		await mockRepository.delete();
	});
};