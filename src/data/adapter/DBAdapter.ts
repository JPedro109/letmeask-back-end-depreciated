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

	async getOne(data: object): Promise<Type> {
		return await this.prisma[this.table].findUnique({ where: data });
	}

	async getAll(where?: object): Promise<Type[]> {
		return await this.prisma[this.table].findMany({ where: where || {} });
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