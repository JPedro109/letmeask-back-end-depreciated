import { PrismaClient } from "@prisma/client";
import { IDBAdapter } from "./IDBAdapter";

export class DBAdapter implements IDBAdapter {
    
	prisma: PrismaClient;
	table: string;

	constructor() {
		this.prisma = new PrismaClient();
	}

	private setEntityExists(table: string): void {
		if(table) this.table = table;
	}

	setEntity(table: string): IDBAdapter {
		this.table = table;
		return this;
	}

	async connect(): Promise<void> {
		await this.prisma.$connect();
	}

	async closeConnection(): Promise<void> {
		await this.prisma.$disconnect();
	}

	async insert<Type>(data: Type, table?: string): Promise<Type> {
		this.setEntityExists(table);

		return await this.prisma[this.table].create({ data });
	}

	async getOne<Type>(where: object, operator?: "AND" | "OR", table?: string): Promise<Type> {
		this.setEntityExists(table);

		if (where && Object.keys(where).length > 1) {

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

	async getAll<Type>(where?: object, operator?: "AND" | "OR", table?: string): Promise<Type[]> {
		this.setEntityExists(table);

		if (where && Object.keys(where).length > 1) {

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

	async update<Type>(where: object, data: object, table?: string): Promise<Type> {
		this.setEntityExists(table);

		return await this.prisma[this.table].update({ where, data });
	}

	async delete<Type>(where: object, table?: string): Promise<Type> {
		this.setEntityExists(table);

		return await this.prisma[this.table].delete({ where });
	}

	async deleteMany<Type>(table?: string): Promise<Type[]> {
		this.setEntityExists(table);

		await this.prisma[this.table].deleteMany({});
		return await this.getAll();
	}
}