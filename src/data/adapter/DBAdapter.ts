import { PrismaClient } from "@prisma/client";
import { IDBAdapter } from "./IDBAdapter";

export class DBAdapter<Type> implements IDBAdapter<Type> {

	prisma: PrismaClient;
	table: string;

	constructor(table: string) {
		this.prisma = new PrismaClient();
		this.table = table;
	}

	async insert(data: Type): Promise<Type> {
		return await this.prisma[this.table].create({ data });
	}

	async getOne(where: object, operator?: "AND" | "OR"): Promise<Type> {

		if (Object.keys(where).length > 1) {

			if (!operator) throw new Error("Você precisa colocar o operador da operação");

			let whereModified = {};

			for (const key in where) {
				whereModified = {
					...whereModified,
					[key]: { equals: where[`${key}`] }
				};
			}

			if (operator === "AND") {

				const object = await this.prisma[this.table].findMany({
					where: {
						AND: whereModified
					}
				});

				return object?.[0];
			}

			if (operator === "OR") {
				const object = await this.prisma[this.table].findMany({
					where: {
						OR: whereModified
					}
				});

				return object?.[0];
			}

		}

		const object = await this.prisma[this.table].findMany({ where: { ...where } });

		return object?.[0];
	}

	async getAll(where?: object, operator?: "AND" | "OR"): Promise<Type[]> {

		if (Object.keys(where).length > 1) {

			if (!operator) throw new Error("Você precisa colocar o operador da operação");

			let whereModified = {};

			for (const key in where) {
				whereModified = {
					...whereModified,
					[key]: { equals: where[`${key}`] }
				};
			}

			if (operator === "AND") {

				const object = await this.prisma[this.table].findMany({
					where: {
						AND: whereModified
					}
				});

				return object;
			}

			if (operator === "OR") {
				const object = await this.prisma[this.table].findMany({
					where: {
						OR: whereModified
					}
				});

				return object;
			}

		}

		const object = await this.prisma[this.table].findMany({ where: { ...where || {} } });

		return object;

	}

	async update(where: object, data: object): Promise<Type> {
		return await this.prisma[this.table].update({ where, data });
	}

	async delete(where: object): Promise<Type> {
		return await this.prisma[this.table].delete({ where });
	}

	async deleteMany(where?: object): Promise<Type> {
		return await this.prisma[this.table].delete({ where: where || {} });
	}
}