export interface IDBAdapter<Type> {
	insert(data: Type): Promise<Type>;
	getOne(data: object): Promise<Type>;
	getAll(where?: object): Promise<Type[]>;
	update(where: object, data: object): Promise<Type>;
	delete(where: object): Promise<Type>;
	deleteMany(where?: object): Promise<Type>;
}