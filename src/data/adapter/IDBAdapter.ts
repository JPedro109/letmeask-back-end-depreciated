export interface IDBAdapter<Type> {
	insert(data: Type): Promise<Type>;
	getOne(where: object, operator?: "AND" | "OR"): Promise<Type>;
	getAll(where?: object, operator?: "AND" | "OR"): Promise<Type[]>;
	update(where: object, data: object): Promise<Type>;
	delete(where: object): Promise<Type>;
	deleteMany(where?: object): Promise<Type>;
}