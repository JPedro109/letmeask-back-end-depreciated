import { IDBAdapter } from "./IDBAdapter";
import { User } from "../models/User";
import { Room } from "../models/Room";
import { question } from "@prisma/client";
import { Response } from "../models/Response";

export class DBAdapterInMemory implements IDBAdapter {
    
	database: { "user": Array<User>, "room": Array<Room>, "question": Array<question>, response: Array<Response> } 
		= { "user": [], "room": [], question: [], response: [] };
	table: string;
    
	private setEntityExists(table: string) {
		if(table) {
			this.table = table;
		}
	}

	setEntity(table: string): IDBAdapter {
		this.table = table;
		return this;
	}

	async connect(): Promise<void> { 
		Promise.resolve;
	}

	async closeConnection(): Promise<void> {
		Promise.resolve;
	}

	insert<Type>(data: Type, table?: string): Promise<Type> {
		this.setEntityExists(table);

		this.database[this.table].push(data);
		return Promise.resolve(data);
	}

	getOne<Type>(where: object, operator?: "AND" | "OR", table?: string): Promise<Type> {
		this.setEntityExists(table);

		const data = [];
		
		this.database[this.table].forEach((element) => {
			if(operator === "OR") {
				for(const key in where) {
					if(element[key] === where[key]) {
						if(!data.includes(element)) data.push(element);
					}
				}
			}

			if(operator === "AND") {
				let equal = true;
				for(const key in where) {
					if(element[key] !== where[key]) equal = false;
				}

				if(equal) data.push(element);
			}

			if(!operator) {
				for(const key in where) {
					if(element[key] === where[key]) {
						if(!data.includes(element)) data.push(element);
					}
				}
			}

		});

		return Promise.resolve(data?.[0]);
	}

	getAll<Type>(where?: object, operator?: "AND" | "OR", table?: string): Promise<Type[]> {
		this.setEntityExists(table);

		if(!where) return this.database[this.table];
		
		const data = [];
		this.database[this.table].forEach((element) => {
			if(operator === "OR") {
				for(const key in where) {
					if(element[key] === where[key]) {
						if(!data.includes(element)) data.push(element);
					}
				}
			}

			if(operator === "AND") {
				let equal = true;
				for(const key in where) {
					if(element[key] !== where[key]) equal = false;
				}

				if(equal) data.push(element);
			}

			if(!operator) {
				for(const key in where) {
					if(element[key] === where[key]) {
						if(!data.includes(element)) data.push(element);
					}
				}
			}
		});

		return Promise.resolve(data);
	}

	update<Type>(where: object, data: object, table?: string): Promise<Type> {
		this.setEntityExists(table);

		let count = null;
		this.database[this.table].forEach((element, i) => {
			let equal = true;
			for(const key in where) {
				if(element[key] !== where[key]) equal = false;
			}

			if(equal) count = i;
		});

		const keysOfObject = Object.keys(this.database[this.table][count]);

		keysOfObject.forEach((element) => {
			if(data[element] !== undefined) this.database[this.table][count][element] = data[element];
		});

		return Promise.resolve(this.database[this.table][count]);
	}
    
	delete<Type>(where: object, table?: string): Promise<Type> {
		this.setEntityExists(table);

		let count = null;
		this.database[this.table].forEach((element, i) => {
			let equal = true;
			for(const key in where) {
				if(element[key] !== where[key]) equal = false;
			}

			if(equal) count = i;
		});

		const data = this.database[this.table][count];

		this.database = this.database[this.table].splice(count, 1);

		return Promise.resolve(data);
	}

	deleteMany<Type>(table?: string): Promise<Type[]> {
		this.setEntityExists(table);
		
		this.database[this.table] = [];
		return Promise.resolve(this.database[this.table]);
	}
}